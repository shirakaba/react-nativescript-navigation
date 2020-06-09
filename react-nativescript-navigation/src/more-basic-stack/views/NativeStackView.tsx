import * as React from 'react';
// import { View, StyleSheet, Platform } from 'react-native';
import {
  ScreenStack,
  Screen as ScreenComponent,
  ScreenProps,
} from '../../react-native-screens/screens';
import {
  StackNavigationState,
  StackActions,
  // useTheme,
} from '@react-navigation/core';
import HeaderConfig from './HeaderConfig';
import {
  NativeStackNavigationHelpers,
  NativeStackDescriptorMap,
} from '../types';
import { isAndroid } from "@nativescript/core";
import { NavigatedData } from "@nativescript/core";

const Screen = (ScreenComponent as unknown) as React.ComponentType<ScreenProps>;

type Props = {
  state: StackNavigationState;
  navigation: NativeStackNavigationHelpers;
  descriptors: NativeStackDescriptorMap;
};

export default function NativeStackView({
  state,
  navigation,
  descriptors,
}: Props) {
  // const { colors } = useTheme();

  return (
    // Frame
    <ScreenStack style={styles.container}>
      {state.routes.map((route, index, self) => {
        const { options, render: renderScene } = descriptors[route.key];
        const {
          gestureEnabled,
          stackPresentation = 'push',
          stackAnimation,
          contentStyle,
          headerShown,
        } = options;

        const active: boolean = index === self.length - 1;

        return (
          // Page
          <Screen
            key={route.key}
            active={active ? 1 : 0}
            style={styles.fill}
            backgroundColor={"red"}
            actionBarHidden={!headerShown}
            gestureEnabled={isAndroid ? false : gestureEnabled}
            stackPresentation={stackPresentation}
            stackAnimation={stackAnimation}
            onWillDisappear={(args: NavigatedData) => {
              console.log(`[Screen.${route.key} ${args.object}] 'willDisappear'.`);

            }}
            onDidDisappear={(args: NavigatedData) => {
              console.log(`[Screen.${route.key} ${args.object}] 'didDisappear'.`);

              navigation.emit({
                type: 'didDisappear',
                target: route.key,
              });

              /**
               * When navigation.navigate('second') is called, a route is pushed to state.routes.
               * This causes RNS to call parent.insert(child), which involves frame.navigate({ create(): return page });
               * 
               * When navigation.goBack() is called, a route is popped from state.routes.
               * This causes RNS to call parent.remove(child), which involves frame.goBack();
               * 
               * So, in those two cases, there's no need to dispatch a "POP" action to bring state.routes back in sync
               * with the stack maintained by the Frame. Because the ReactChildren are driving the navigation state.
               * 
               * The worrying cases come from Frame's side:
               * – Android back button (pop)
               * – Right swipe (pop)
               * – Press "back" navigation button (pop)
               * 
               * If this were purely RNS (no React Navigation), we'd need to capture (and more importantly, discern) these
               * events and manually pop the necessary Page(s) off our Frame's array of ReactChildren.
               * 
               * The same goes for React Navigation, with the subtlety that said array (state.routes) is managed internally
               * by React Navigation. To pop from it, we must dispatch a "POP" action.
               * 
               * However, we will also need to rely on some implicit behaviour in the RNS registry. If ever
               * parent.remove(child) is called for a child that is not the currentPage of the frame, we must be careful
               * _not_ to call frame.goBack() (because it has already been done); instead, we must simply no-op.
               * 
               */
              // navigation.dispatch({
              //   ...StackActions.pop(),
              //   source: route.key,
              //   target: state.key,
              // });
            }}
            onWillAppear={(args: NavigatedData) => {
              console.log(`[Screen.${route.key} ${args.object}] 'willAppear'.`);
            }}
            onDidAppear={(args: NavigatedData) => {
              console.log(`[Screen.${route.key} ${args.object}] 'didAppear'.`);
              navigation.emit({
                type: 'didAppear',
                target: route.key,
              });
            }}
            >
            <HeaderConfig {...options} route={route} />
            <flexboxLayout
              nodeRole={"content"}
              style={{
                ...styles.flexContainer,
                // ...{
                //   backgroundColor:
                //     stackPresentation !== 'transparentModal'
                //       ? colors.background
                //       : undefined,
                // },
                ...contentStyle,
              }}>
              {renderScene()}
            </flexboxLayout>
          </Screen>
        );
      })}
    </ScreenStack>
  );
}

const styles = {
  fill: {
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  flexContainer: {
    flexGrow: 1,
    flexDirection: "column", // In line with React Native
    width: "100%",
    height: "100%",
  },
};