import * as React from 'react';
// import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import {
  NavigationContext,
  NavigationRouteContext,
  Route,
  ParamListBase,
} from '@react-navigation/native';
// import { EdgeInsets } from 'react-native-safe-area-context';
type EdgeInsets = { left: number, top: number, bottom: number, right: number };

// import Header from './Header';
// import {
//   forSlideLeft,
//   forSlideUp,
//   forNoAnimation,
//   forSlideRight,
// } from '../../TransitionConfigs/HeaderStyleInterpolators';
import {
  Layout,
  Scene,
  // StackHeaderStyleInterpolator,
  StackNavigationProp,
  // GestureDirection,
} from '../../types';
import { ActionBarAttributes } from 'react-nativescript/dist/lib/react-nativescript-jsx';
import { ViewBaseAttributes } from "react-nativescript/dist/shared/NativeScriptJSXTypings";

type RNSStyle = ViewBaseAttributes["style"];
type StyleProp<T> = T;

export type Props = {
  mode: 'float' | 'screen';
  layout: Layout;
  insets: EdgeInsets;
  previousScene: (Scene<Route<string>> | undefined);
  scene: (Scene<Route<string>> | undefined);
  nextScene: (Scene<Route<string>> | undefined);
  isLastScene: boolean;

  // sceneIndex: number;
  // scenes: (Scene<Route<string>> | undefined)[];

  getPreviousRoute: (props: {
    route: Route<string>;
  }) => Route<string> | undefined;
  getFocusedRoute: () => Route<string>;
  onContentHeightChange?: (props: {
    route: Route<string>;
    height: number;
  }) => void;
  // styleInterpolator: StackHeaderStyleInterpolator;
  // gestureDirection: GestureDirection;
  style?: StyleProp<RNSStyle>;
};

export default function HeaderContainer({
  mode,
  previousScene,
  scene,
  nextScene,
  isLastScene,
  layout,
  insets,
  getFocusedRoute,
  getPreviousRoute,
  onContentHeightChange,
  // gestureDirection,
  // styleInterpolator,
  style,
}: Props) {
  const focusedRoute = getFocusedRoute();
  const isFocused = focusedRoute.key === scene.route.key;

  const { options } = scene.descriptor;

  // If the screen is next to a headerless screen, we need to make the header appear static
  // This makes the header look like it's moving with the screen
  const isHeaderStatic =
    (previousScene &&
      previousScene.descriptor.options.headerShown === false &&
      // We still need to animate when coming back from next scene
      // A hacky way to check this is if the next scene exists
      !nextScene) ||
    (nextScene && nextScene.descriptor.options.headerShown === false);

  const props = {
    mode,
    layout,
    insets,
    scene,
    previous: previousScene,
    navigation: scene.descriptor.navigation as StackNavigationProp<
      ParamListBase
    >,
    // styleInterpolator:
    //   mode === 'float'
    //     ? isHeaderStatic
    //       ? gestureDirection === 'vertical' ||
    //         gestureDirection === 'vertical-inverted'
    //         ? forSlideUp
    //         : gestureDirection === 'horizontal-inverted'
    //         ? forSlideRight
    //         : forSlideLeft
    //       : styleInterpolator
    //     : forNoAnimation,
  };

  return (
    <actionBar style={style}>
      {
        ((mode === 'screen' && !isLastScene) || !scene) ?
          null :
          (
            <NavigationContext.Provider
              key={scene.route.key}
              value={scene.descriptor.navigation}
            >
              <NavigationRouteContext.Provider value={scene.route}>
                <View
                  onLayout={
                    onContentHeightChange
                      ? (e) =>
                          onContentHeightChange({
                            route: scene.route,
                            height: e.nativeEvent.layout.height,
                          })
                      : undefined
                  }
                  pointerEvents={isFocused ? 'box-none' : 'none'}
                  accessibilityElementsHidden={!isFocused}
                  importantForAccessibility={
                    isFocused ? 'auto' : 'no-hide-descendants'
                  }
                  style={
                    // Avoid positioning the focused header absolutely
                    // Otherwise accessibility tools don't seem to be able to find it
                    (mode === 'float' && !isFocused) || options.headerTransparent
                      ? styles.header
                      : null
                  }
                >
                  {options.headerShown !== false ? (
                    options.header !== undefined ? (
                      options.header(props)
                    ) : (
                      <Header {...props} />
                    )
                  ) : null}
                </View>
              </NavigationRouteContext.Provider>
            </NavigationContext.Provider>
          )
      }
    </actionBar>
  );
}

const styles = {
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
};