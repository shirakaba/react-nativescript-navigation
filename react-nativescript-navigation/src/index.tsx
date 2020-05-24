import * as React from 'react';
import {} from "react-nativescript"; // Import just to get the TypeScript global types filled
import { ViewBaseAttributes } from "react-nativescript/dist/shared/NativeScriptJSXTypings";
import {
    NavigationHelpersContext,
    createNavigatorFactory,
    useNavigationBuilder,
    DefaultNavigatorOptions,
    TabRouter,
    TabActions,
    TabRouterOptions,
    TabNavigationState,
    EventMapBase,
} from '@react-navigation/core';
import { NavigationState } from '@react-navigation/routers';

// Props accepted by the view
type TabNavigationConfig = {
    tabBarStyle: ViewBaseAttributes["style"];
    contentStyle: ViewBaseAttributes["style"];
};
  
// Supported screen options
type TabNavigationOptions = {
    title?: string;
};

// Map of events and the type of data (in event.data)
type TabNavigationEventMap = {
    tabPress: { isAlreadyFocused: boolean };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<TabNavigationOptions> &
TabRouterOptions &
TabNavigationConfig;

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}: Props) {
  const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  console.log(`GOT ROUTES:`, state.routes);

  return (
    <stackLayout style={{ width: "100%", height: "100%", }}>
      <flexboxLayout style={{ flexGrow: 0, flexDirection: 'row', backgroundColor: "gold", ...tabBarStyle }}>
        {state.routes.map(route => (
          <label
            key={route.key}
            style={{ flexGrow: 1, color: "black", backgroundColor: "purple", width: 200, height: 100, }}
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

      <flexboxLayout style={{ flexDirection: 'column', backgroundColor: "cyan", flexGrow: 1, width: "100%", height: "100%", ...contentStyle }}>
        {descriptors[state.routes[state.index].key].render()}
      </flexboxLayout>

    </stackLayout>
  );
}

export default createNavigatorFactory<
  TabNavigationState,
  typeof TabNavigator,
  EventMapBase,
  React.ComponentType<any>
>(TabNavigator);