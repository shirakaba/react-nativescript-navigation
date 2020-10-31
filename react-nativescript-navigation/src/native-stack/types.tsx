/**
 * A reimplementation of React Native Screens for React NativeScript.
 * @see https://github.com/software-mansion/react-native-screens/blob/73959abc975b5718e683d39f1452ec0bb4d5f475/native-stack/types.tsx
 */

import * as React from 'react';
// import { StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { FrameAttributes, NativeScriptProps, RNSStyle } from "react-nativescript";
import { NavigationButtonAttributes } from "react-nativescript";
import { ImageSource, Color, Frame } from "@nativescript/core";
import { ScreenProps } from '../react-nativescript-screens/screens';
import {
  DefaultNavigatorOptions,
  Descriptor,
  NavigationHelpers,
  NavigationProp,
  ParamListBase,
  StackNavigationState,
  StackRouterOptions,
} from '@react-navigation/core';

type StyleProp<T> = T;
type TextStyle = RNSStyle;
type ViewStyle = RNSStyle;
type NativeSyntheticEvent<T> = any;
type NativeTouchEvent = any;
type ImageSourcePropType = ImageSource;

export type FrameNavigationEventMap = {
  /**
   * Event which fires when the screen appears.
   */
  didAppear: { data: undefined };
  /**
   * Event which fires when the current screen is dismissed by hardware back (on Android) or dismiss gesture (swipe back or down).
   */
  didDisappear: { data: undefined };
};

export type FrameNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = NavigationProp<
  ParamList,
  RouteName,
  StackNavigationState<ParamListBase>,
  FrameNavigationOptions,
  FrameNavigationEventMap
> & {
  /**
   * Push a new screen onto the stack.
   *
   * @param name Name of the route for the tab.
   * @param [params] Params object for the route.
   */
  push<RouteName extends keyof ParamList>(
    ...args: ParamList[RouteName] extends undefined | any
      ? [RouteName] | [RouteName, ParamList[RouteName]]
      : [RouteName, ParamList[RouteName]]
  ): void;

  /**
   * Pop a screen from the stack.
   */
  pop(count?: number): void;

  /**
   * Pop to the first route in the stack, dismissing all other screens.
   */
  popToTop(): void;
};

export type FrameNavigationHelpers = NavigationHelpers<
  ParamListBase,
  FrameNavigationEventMap
>;

/**
 * Supported screen options, which determine the behaviour of the Page and ActionBar components.
 * Set these to common values via the StackNavigator.Navigator `screenOptions` prop;
 * ... or to screen-specific values via each StackNavigator.Screen `options` prop.
 * 
 * @example <TabNavigator.Navigator initialRouteName="home" screenOptions={{ title: "Landing Page" }}>
 * @example <TabNavigator.Screen options={{ title: "Landing Page" }} name="home" component={Home} />
 */
export type FrameNavigationOptions = {
  /**
   * String that can be displayed in the header as a fallback for `headerTitle`.
   */
  title?: string;
  /**
   * String to display in the header as title. Defaults to scene `title`.
   */
  headerTitle?: string;
  /**
   * Image to display in the header as the back button.
   * Defaults to back icon image for the platform (a chevron on iOS and an arrow on Android).
   */
  // backButtonImage?: ImageSourcePropType;
  backButtonImage?: NavigationButtonAttributes["icon"];
  /**
   * Title to display in the back button.
   * Only supported on iOS.
   *
   * @platform ios
   */
  headerBackTitle?: string;
  /**
   * Whether the back button title should be visible or not. Defaults to `true`.
   * Only supported on iOS.
   *
   * @platform ios
   */
  headerBackTitleVisible?: boolean;
  /**
   * Whether to show the header.
   */
  headerShown?: boolean;
  // /**
  //  * Whether to show the back button with custom left side of the header.
  //  */
  // backButtonInCustomView?: boolean;
  /**
   * Boolean indicating whether the navigation bar is translucent.
   * Only supported on iOS.
   *
   * @platform ios
   * @RNS For this to take effect, headerHideShadow must also be true.
   */
  headerTranslucent?: boolean;
  // /**
  //  * Boolean to set native property to prefer large title header (like in iOS setting).
  //  * For large title to collapse on scroll, the content of the screen should be wrapped in a scrollable view such as `ScrollView` or `FlatList`.
  //  * If the scrollable area doesn't fill the screen, the large title won't collapse on scroll.
  //  * Only supported on iOS.
  //  *
  //  * @platform ios
  //  */
  // headerLargeTitle?: boolean;
  /**
   * Function which returns a React Element to display on the right side of the header.
   * @RNS Recommended that you set this nodeRole={"actionView"} on this.
   */
  headerRight?: (props: { tintColor?: string|Color }) => React.ReactNode;
  /**
   * Function which returns a React Element to display on the left side of the header.
   * @RNS Recommended that you set this nodeRole={"actionView"} on this.
   */
  headerLeft?: (props: { tintColor?: string|Color }) => React.ReactNode;
  /**
   * Function which returns a React Element to display in the center of the header.
   */
  headerCenter?: (props: { tintColor?: string|Color }) => React.ReactNode;
  /**
   * Tint color for the header. Changes the color of back button and title.
   */
  headerTintColor?: string|Color;
  // /**
  //  * Boolean indicating whether to hide the back button in header.
  //  * Only supported on Android.
  //  *
  //  * @platform android
  //  */
  // headerHideBackButton?: boolean;
  /**
   * Boolean indicating whether to hide the elevation shadow or the bottom border on the header.
   * @RNS For this to take effect, headerTranslucent must also be false.
   */
  headerHideShadow?: boolean;
  // /**
  //  * Boolean that allows for disabling drop shadow under navigation header when the edge of any scrollable content reaches the matching edge of the navigation bar.
  //  */
  // headerLargeTitleHideShadow?: boolean;
  /**
   * Style object for header title. Supported properties:
   * - backgroundColor
   */
  headerStyle?: {
    backgroundColor?: string|Color;
    color?: string|Color;
  };
  // /**
  //  * Controls the style of the navigation header when the edge of any scrollable content reaches the matching edge of the navigation bar. Supported properties:
  //  * - backgroundColor
  //  *
  //  * @platform ios
  //  */
  // headerLargeStyle?: {
  //   backgroundColor?: string;
  // };
  /**
   * Style object for header title. Supported properties:
   * - fontFamily
   * - fontSize
   * - color
   */
  // headerTitleStyle?: {
  //   fontFamily?: string;
  //   fontSize?: number;
  //   color?: string;
  // };
  // /**
  //  * Style object for header large title. Supported properties:
  //  * - fontFamily
  //  * - fontSize
  //  *
  //  * Only supported on iOS.
  //  *
  //  * @platform ios
  //  */
  // headerLargeTitleStyle?: {
  //   fontFamily?: string;
  //   fontSize?: number;
  //   color?: string;
  // };
  // /**
  //  * Style object for header back title. Supported properties:
  //  * - fontFamily
  //  * - fontSize
  //  *
  //  * Only supported on iOS.
  //  *
  //  * @platform ios
  //  */
  // headerBackTitleStyle?: {
  //   fontFamily?: string;
  //   fontSize?: number;
  // };
  /**
   * Style object for the scene content.
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Whether you can use gestures to dismiss this screen. Defaults to `true`.
   * Only supported on iOS.
   *
   * @platform ios
   */
  gestureEnabled?: boolean;
  /**
   * How should the screen be presented.
   * The following values are currently supported:
   * - "push" – the new screen will be pushed onto a stack which on iOS means that the default animation will be slide from the side, the animation on Android may vary depending on the OS version and theme.
   * - "modal" – the new screen will be presented modally. In addition this allow for a nested stack to be rendered inside such screens
   * - "transparentModal" – the new screen will be presented modally but in addition the second to last screen will remain attached to the stack container such that if the top screen is non opaque the content below can still be seen. If "modal" is used instead the below screen will get unmounted as soon as the transition ends.
   */
  stackPresentation?: ScreenProps['stackPresentation'];
  /**
   * How the screen should appear/disappear when pushed or popped at the top of the stack.
   * The following values are currently supported:
   * - "default" – uses a platform default animation
   * - "fade" – fades screen in or out
   * - "flip" – flips the screen, requires stackPresentation: "modal" (iOS only)
   * - "none" – the screen appears/dissapears without an animation
   */
  stackAnimation?: ScreenProps['stackAnimation'];
};

/**
 * The navigation config, which determines the behaviour of the Frame component.
 * Set these by passing the props directly to TabNavigator.Navigator.
 * 
 * @example <TabNavigator.Navigator initialRouteName="home" exampleOption={"Just an example."}>
 */
export type FrameNavigationConfig = Partial<
  Omit<
    NativeScriptProps<FrameAttributes, Frame>,
    "actionBarVisibility" |
    "android" |
    "backStack" |
    "currentEntry" | 
    "currentPage" |
    "defaultPage" | 
    "ios" |
    "onActionBarVisibilityChange" |
    "onDefaultPageChange"
  >
> & {
  // Custom props that aren't simply spread onto the frame element as-is

  /**
   * Doesn't do anything; is just included to demonstrate how to configure the Navigator.
   */
  exampleOption?: string;
};
export type FrameProps = FrameNavigationConfig & {
  state: StackNavigationState<ParamListBase>;
  navigation: FrameNavigationHelpers;
  descriptors: FrameDescriptorMap;
};

export type FrameNavigatorProps = DefaultNavigatorOptions<
  FrameNavigationOptions
> &
  StackRouterOptions &
  FrameNavigationConfig;

export type FrameDescriptor = Descriptor<
  ParamListBase,
  string,
  StackNavigationState<ParamListBase>,
  FrameNavigationOptions
>;

export type FrameDescriptorMap = {
  [key: string]: FrameDescriptor;
};