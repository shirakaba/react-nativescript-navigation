import type { ImageSource, TabView } from '@nativescript/core';
import type {
  ParamListBase,
  Descriptor,
  NavigationHelpers,
  NavigationProp,
  TabNavigationState,
  TabActionHelpers,
  RouteProp,
} from '@react-navigation/core';
import type { NativeScriptProps, TabViewAttributes } from 'react-nativescript';

/**
 * @see https://github.com/react-navigation/react-navigation/blob/f51086edea42f2382dac8c6914aac8574132114b/packages/material-top-tabView/src/types.tsx
 */
export type TabViewNavigationEventMap = {
    // tabPress: { isAlreadyFocused: boolean };
    tabPress: { data: undefined; canPreventDefault: true };
};

export type TabViewNavigationHelpers = NavigationHelpers<
  ParamListBase,
  TabViewNavigationEventMap
> &
  TabActionHelpers<ParamListBase>;

export type TabViewNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = NavigationProp<
  ParamList,
  RouteName,
  TabNavigationState<ParamList>,
  TabViewNavigationOptions,
  TabViewNavigationEventMap
> &
  TabActionHelpers<ParamList>;

export type TabViewScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = {
  navigation: TabViewNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};

/**
 * Supported screen options, which determine the behaviour of each TabStripItem and its corresponding TabContentItem.
 * Set these to common values via the TabsNavigator.Navigator `screenOptions` prop;
 * ... or to screen-specific values via each TabsNavigator.Screen `options` prop.
 * 
 * @example <TabNavigator.Navigator initialRouteName="home" screenOptions={{ iconSource: "res://tab_icon_home" }}>
 * @example <TabNavigator.Screen options={{ iconSource: "res://tab_icon_home" }} name="home" component={Home} />
 */
export type TabViewNavigationOptions = {
    title?: string;
    /**
     * The source of the image to use for the tab's icon.
     * @example "res://home_icon" (where the icon file is called "home_icon.png")
     * @see https://docs.nativescript.org/ui/image-resources
     */
    iconSource?: string;
};

export type TabViewDescriptor = Descriptor<
  ParamListBase,
  string,
  TabNavigationState<ParamListBase>,
  TabViewNavigationOptions
>;

export type TabViewDescriptorMap = {
  [key: string]: TabViewDescriptor;
};

/**
 * The navigation config, which determines the behaviour of the Tabs and TabStrip components.
 * Set these by passing the props directly to TabNavigator.Navigator
 * 
 * @example <TabNavigator.Navigator initialRouteName="home" exampleOption={"Just an example."}>
 */
export type TabViewNavigationConfig = Partial<
  Omit<
    NativeScriptProps<TabViewAttributes, TabView>,
    'selectedIndex' |
    'onSelectedIndexChanged'
  >
> & {
    // Custom props that aren't simply spread onto the tabView element as-is

    /**
     * Doesn't do anything; is just included to demonstrate how to configure the Navigator.
     */
    exampleOption?: string;
};
