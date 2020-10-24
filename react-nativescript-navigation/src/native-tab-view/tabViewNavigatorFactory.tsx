/**
 * Created by following the React Navigation docs.
 * @see https://reactnavigation.org/docs/custom-navigators/
 */
import * as React from 'react';
import { RNSStyle } from "react-nativescript";
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
    tabBarStyle: RNSStyle;
    contentStyle: RNSStyle;
};
  
// Supported screen options
type TabNavigationOptions = {
    title?: string;
    /**
     * The source of the image to use for the tab's icon.
     * @example "res://home_icon" (where the icon file is called "home_icon.png")
     * @see https://docs.nativescript.org/ui/image-resources
     */
    iconSource?: string;
};

// Map of events and the type of data (in event.data)
type TabNavigationEventMap = {
    tabPress: { isAlreadyFocused: boolean };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<TabNavigationOptions> &
TabRouterOptions &
TabNavigationConfig;

function TabViewNavigator({
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
    <tabView
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
      {state.routes.map(route => {
        const routeOptions = descriptors[route.key].options;

        return (
          <tabViewItem
            key={route.key}
            nodeRole="items"
            title={routeOptions.title || route.name}
            iconSource={routeOptions.iconSource}
          >
            {descriptors[route.key].render()}
          </tabViewItem>
        );
      })}
    </tabView>
  );
}

export default createNavigatorFactory<
  TabNavigationState,
  TabNavigationOptions,
  EventMapBase,
  React.ComponentType<any>
>(TabViewNavigator);