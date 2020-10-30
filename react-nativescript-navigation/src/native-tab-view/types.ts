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

// Supported screen options
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

// Props accepted by the view
export type TabViewNavigationConfig = Partial<
  Omit<
    NativeScriptProps<TabViewAttributes, TabView>,
    'selectedIndex' |
    'onSelectedIndexChanged'
  >
> & {
    // Custom props that aren't simply spread onto the tabView element as-is
};
