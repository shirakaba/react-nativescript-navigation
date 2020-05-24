import * as React from 'react';
import {} from "react-nativescript"; // Import just to get the TypeScript global types filled

import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  TabActions,
} from '@react-navigation/core';

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