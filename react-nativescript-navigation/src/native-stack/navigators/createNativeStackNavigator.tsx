/**
 * A reimplementation of React Native Screens for React NativeScript.
 * @see https://github.com/software-mansion/react-native-screens/blob/73959abc975b5718e683d39f1452ec0bb4d5f475/native-stack/navigators/createNativeStackNavigator.tsx
 */
import * as React from 'react';
import {
  createNavigatorFactory,
  useNavigationBuilder,
  EventArg,
  StackRouter,
  StackNavigationState,
  StackRouterOptions,
  StackActions,
} from '@react-navigation/core';

import {
  screensEnabled,
  // eslint-disable-next-line import/no-unresolved
} from '../../react-nativescript-screens/screens';
import NativeStackView from '../views/NativeStackView';
import {
  NativeStackNavigatorProps,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
} from '../types';

function NativeStackNavigator(props: NativeStackNavigatorProps) {
  if (!screensEnabled()) {
    throw new Error(
      'Native stack is only available if React Native Screens is enabled.'
    );
  }

  const { initialRouteName, children, screenOptions, ...rest } = props;
  const { state, descriptors, navigation } = useNavigationBuilder<
    StackNavigationState,
    StackRouterOptions,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap
  >(StackRouter, {
    initialRouteName,
    children,
    screenOptions,
  });

  React.useEffect(
    () =>
      navigation.addListener &&
      navigation.addListener('tabPress', (e) => {
        const isFocused = navigation.isFocused();

        // Run the operation in the next frame so we're sure all listeners have been run
        // This is necessary to know if preventDefault() has been called
        requestAnimationFrame(() => {
          if (
            state.index > 0 &&
            isFocused &&
            !(e as EventArg<'tabPress', true>).defaultPrevented
          ) {
            // When user taps on already focused tab and we're inside the tab,
            // reset the stack to replicate native behaviour
            navigation.dispatch({
              ...StackActions.popToTop(),
              target: state.key,
            });
          }
        });
      }),
    [navigation, state.index, state.key]
  );

  return (
    <NativeStackView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export default createNavigatorFactory<
  StackNavigationState,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  typeof NativeStackNavigator
>(NativeStackNavigator);