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
          <Screen
            key={route.key}
            active={active ? 1 : 0}
            style={styles.fill}
            backgroundColor={"red"}
            actionBarHidden={!headerShown}
            gestureEnabled={isAndroid ? false : gestureEnabled}
            stackPresentation={stackPresentation}
            stackAnimation={stackAnimation}
            onAppear={(args: NavigatedData, mode: "willAppear"|"didAppear") => {
              console.log(`[Screen.${route.key} ${args.object}] ${mode} ${mode === "willAppear" ? "" : "emitting 'appear' event."}`);
              if(mode === "willAppear"){
                return;
              }
              
              navigation.emit({
                type: 'appear',
                target: route.key,
              });
            }}
            onDismissed={(args: NavigatedData, mode: "willDismiss"|"didDismiss") => {
              console.log(`[Screen.${route.key} ${args.object}] ${mode} ${mode === "didDismiss" ? "" : "emitting 'dismiss' event."}`);
              if(mode === "didDismiss"){
                return;
              }

              navigation.emit({
                type: 'dismiss',
                target: route.key,
              });

              navigation.dispatch({
                ...StackActions.pop(),
                source: route.key,
                target: state.key,
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