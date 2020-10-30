/**
 * Created by following the React Navigation docs.
 * @see https://reactnavigation.org/docs/custom-navigators/
 */
import * as React from 'react';
import {
  createNavigatorFactory,
  useNavigationBuilder,
  DefaultNavigatorOptions,
  TabRouter,
  TabActions,
  TabActionHelpers,
  TabRouterOptions,
  TabNavigationState,
  ParamListBase,
} from '@react-navigation/core';
import type { TabViewNavigationOptions, TabViewNavigationConfig, TabViewNavigationEventMap } from './types';


// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<TabViewNavigationOptions> &
TabRouterOptions &
TabViewNavigationConfig;

function TabViewNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  style,
  ...rest
}: Props) {
  const { state, navigation, descriptors } = useNavigationBuilder<
    TabNavigationState<ParamListBase>,
    TabRouterOptions,
    TabActionHelpers<ParamListBase>,
    TabViewNavigationOptions,
    TabViewNavigationEventMap
  >(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  // console.log(`[TabNavigator] render`);

  return (
    <tabView
      {...rest}
      style={{ width: "100%", height: "100%", ...style }}
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

        if (!event.defaultPrevented) {
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
  TabNavigationState<ParamListBase>,
  TabViewNavigationOptions,
  TabViewNavigationEventMap,
  typeof TabViewNavigator
>(TabViewNavigator);