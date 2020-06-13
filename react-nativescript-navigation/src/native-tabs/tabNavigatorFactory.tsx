/**
 * Created by following the React Navigation docs.
 * @see https://reactnavigation.org/docs/custom-navigators/
 */
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

  // console.log(`[TabNavigator] render`);

  return (
    <tabs
      style={{ width: "100%", height: "100%", }}
      selectedIndex={state.index}
      // onSelectedIndexChange={(args) => {
      //   console.log(`[Tabs.onSelectedIndexChange] ${args.oldValue} -> ${args.value}`);
      // }}
      /**
       * Firing the navigation event upon onSelectedIndexChanged handles both the case of
       * tapping the target TabStripItem and swiping between TabContentItems.
       * 
       * There is also onSelectedIndexChange (the Property change event) which fires afterward.
       * I think either work fine; would have to closely inspect the implementation to say more.
       */
      onSelectedIndexChanged={(args) => {
        // console.log(`[Tabs.onSelectedIndexChanged] ${args.oldIndex} -> ${args.newIndex}`);

        const route = state.routes[args.newIndex];

        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        // console.log(`[Tabs.onSelectedIndexChanged] emitted event`, event);

        // Can't figure out typings, but defaultPrevented is clearly a populated boolean.
        if (!(event as any).defaultPrevented) {
          navigation.dispatch({
            ...TabActions.jumpTo(route.name),
            target: state.key,
          });
        }
      }}
    >
      <tabStrip nodeRole="tabStrip">
        {state.routes.map(route => (
          <tabStripItem
            key={route.key}
            nodeRole="items"
          >
            <label
              nodeRole="label"
              style={{}}
            >
              {descriptors[route.key].options.title || route.name}
            </label>
            {/* We'll be able to fill this later by exposing options. */}
            <image
              nodeRole="image"
              style={{}}
            />
          </tabStripItem>
        ))}
      </tabStrip>

      {state.routes.map(route => (
        <tabContentItem key={route.key} nodeRole="items">
          {descriptors[route.key].render()}
        </tabContentItem>
      ))}
    </tabs>
  );
}

export default createNavigatorFactory<
  TabNavigationState,
  typeof TabNavigator,
  EventMapBase,
  React.ComponentType<any>
>(TabNavigator);