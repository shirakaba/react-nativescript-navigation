import * as React from 'react';
import {} from "react-nativescript"; // Import just to get the TypeScript global types filled
import type {
  NavigationHelpersContext as NavigationHelpersContextT,
  useNavigationBuilder as useNavigationBuilderT,
  TabRouter as TabRouterT,
  TabActions as TabActionsT,
} from '@react-navigation/native/lib/typescript/src/index';

import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  TabActions,
} from '@react-navigation/native/lib/commonjs';

const cjs = require('@react-navigation/native/lib/commonjs');
const NavigationHelpersContext = cjs.NavigationHelpersContext as typeof NavigationHelpersContextT;
const useNavigationBuilder = cjs.useNavigationBuilder as typeof useNavigationBuilderT;
const TabRouter = cjs.TabRouter as typeof TabRouterT;
const TabActions = cjs.TabActions as typeof TabActionsT;

export function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}) {
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <flexboxLayout style={{ flexDirection: 'row', ...tabBarStyle }}>
        {state.routes.map(route => (
          <label
            key={route.key}
            style={{ flexGrow: 1 }}
            onTap={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              // @ts-ignore The docs said this should exist, so :shrug:
              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key,
                });
              }
            }}
          >
            {descriptors[route.key].options.title || route.name}
          </label>
        ))}
      </flexboxLayout>
      <flexboxLayout style={{ flexGrow: 1, ...contentStyle }}>
        {descriptors[state.routes[state.index].key].render()}
      </flexboxLayout>
    </NavigationHelpersContext.Provider>
  );
}