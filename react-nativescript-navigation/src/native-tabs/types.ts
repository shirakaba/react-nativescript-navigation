import type { ImageSource, Tabs, TabStrip } from '@nativescript/core';
import type {
  ParamListBase,
  Descriptor,
  NavigationHelpers,
  NavigationProp,
  TabNavigationState,
  TabActionHelpers,
  RouteProp,
} from '@react-navigation/core';
import type { NativeScriptProps, TabsAttributes, TabStripAttributes } from 'react-nativescript';

/**
 * @see https://github.com/react-navigation/react-navigation/blob/f51086edea42f2382dac8c6914aac8574132114b/packages/material-top-tabs/src/types.tsx
 */
export type TabsNavigationEventMap = {
    // tabPress: { isAlreadyFocused: boolean };
    tabPress: { data: undefined; canPreventDefault: true };
};

export type TabsNavigationHelpers = NavigationHelpers<
  ParamListBase,
  TabsNavigationEventMap
> &
  TabActionHelpers<ParamListBase>;

export type TabsNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = NavigationProp<
  ParamList,
  RouteName,
  TabNavigationState<ParamList>,
  TabsNavigationOptions,
  TabsNavigationEventMap
> &
  TabActionHelpers<ParamList>;

export type TabsScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = {
  navigation: TabsNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};

/**
 * Supported screen options, which determine the behaviour of each TabStripItem and its corresponding TabContentItem.
 * Set these to common values via the TabsNavigator.Navigator `screenOptions` prop;
 * ... or to screen-specific values via each TabsNavigator.Screen `options` prop.
 * 
 * @example <TabNavigator.Navigator initialRouteName="home" screenOptions={{ src: "res://tab_icon_home" }}>
 * @example <TabNavigator.Screen options={{ src: "res://tab_icon_home" }} name="home" component={Home} />
 */
export type TabsNavigationOptions = {
    title?: string;
    /**
     * The source of the image to use for the tab's icon.
     * If src is also provided, imageSource will take priority.
     * @see src
     * @see https://docs.nativescript.org/ui/image-resources
     * @see https://docs.nativescript.org/ns-framework-modules/image-source#load-image-using-resource-name
     */
    imageSource?: ImageSource;
    /**
     * The source of the image to use for the tab's icon.
     * If imageSource is also provided, this property will be ignored.
     * @example "res://home_icon" (where the icon file is called "home_icon.png")
     * @see imageSource
     * @see https://docs.nativescript.org/ui/image-resources
     */
    src?: string;
};

export type TabsDescriptor = Descriptor<
  ParamListBase,
  string,
  TabNavigationState<ParamListBase>,
  TabsNavigationOptions
>;

export type TabsDescriptorMap = {
  [key: string]: TabsDescriptor;
};

/**
 * The navigation config, which determines the behaviour of the Tabs and TabStrip components.
 * Set these by passing the props directly to TabNavigator.Navigator
 * 
 * @example <TabNavigator.Navigator initialRouteName="home" tabStripOptions={{ selectedItemColor: 'purple' }}>
 */
export type TabsNavigationConfig = Partial<
  Omit<
    NativeScriptProps<TabsAttributes, Tabs>,
    'selectedIndex' |
    'onSelectedIndexChanged'
  >
> & {
    // Custom props that aren't simply spread onto the tabs element as-is
    tabStripOptions?: TabStripOptions;
};

export type TabStripOptions = Partial<
  Omit<
    NativeScriptProps<TabStripAttributes, TabStrip>,
    'nodeRole'
  >
> & {
    // Custom props that aren't simply spread onto the tabStrip element as-is
};

// We'd use this type if we wanted to allow users to provide a custom render function for the tabStrip element.
export type TabStripProps = TabStripOptions & {
    state: TabNavigationState<ParamListBase>;
    navigation: NavigationHelpers<
      ParamListBase,
      TabsNavigationEventMap
    >;
    descriptors: TabsDescriptorMap;
  };