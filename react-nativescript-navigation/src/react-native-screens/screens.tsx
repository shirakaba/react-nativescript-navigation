import * as React from 'react';
import { PropsWithChildren } from 'react';
import { ViewBaseAttributes } from "react-nativescript/dist/shared/NativeScriptJSXTypings";
import { PageAttributes, FlexboxLayoutAttributes, NavigationButtonAttributes, ActionBarAttributes, ActionItemAttributes } from "react-nativescript/dist/lib/react-nativescript-jsx";
import { NavigatedData, Color } from "@nativescript/core";
type RNSStyle = ViewBaseAttributes["style"];
type StyleProp<T> = T;
type TextStyle = RNSStyle;
type ViewStyle = RNSStyle;
type NativeSyntheticEvent<T> = any;
type NativeTouchEvent = any;

let ENABLE_SCREENS: boolean = true;

export function enableScreens(shouldEnableScreens = true): void {
  ENABLE_SCREENS = shouldEnableScreens;
}

export function screensEnabled(): boolean {
  return ENABLE_SCREENS;
}

export type StackPresentationTypes =
| 'push'
| 'modal'
| 'transparentModal'
| 'fullScreenModal'
| 'formSheet';
export type StackAnimationTypes = 'default' | 'fade' | 'flip' | 'none';

export interface ScreenProps extends PageAttributes {
  active?: 0 | 1;
  onComponentRef?: (view: any) => void;
  children?: React.ReactNode;
  /**
   *@description A callback that gets called when the current screen appears.
   */
  onAppear?: (args: NavigatedData, mode: "willAppear"|"didAppear") => void;
  /**
   *@description A callback that gets called when the current screen is dismissed by hardware back (on Android) or dismiss gesture (swipe back or down). The callback takes no arguments.
   */
  onDismissed?: (args: NavigatedData, mode: "willDismiss"|"didDismiss") => void;
  /**
   * @type "push" – the new screen will be pushed onto a stack which on iOS means that the default animation will be slide from the side, the animation on Android may vary depending on the OS version and theme.
   * @type "modal" – the new screen will be presented modally. In addition this allow for a nested stack to be rendered inside such screens
   * @type "transparentModal" – the new screen will be presented modally but in addition the second to last screen will remain attached to the stack container such that if the top screen is non opaque the content below can still be seen. If "modal" is used instead the below screen will get unmounted as soon as the transition ends.
   */
  stackPresentation: StackPresentationTypes;
  /**
   *@description Allows for the customization of how the given screen should appear/dissapear when pushed or popped at the top of the stack. The followin values are currently supported:
   *  @type "default" – uses a platform default animation
   *  @type "fade" – fades screen in or out
   *  @type "flip" – flips the screen, requires stackPresentation: "modal" (iOS only)
   *  @type "none" – the screen appears/dissapears without an animation
   */
  stackAnimation?: StackAnimationTypes;
  /**
   * @description When set to false the back swipe gesture will be disabled when the parent Screen is on top of the stack. The default value is true.
   */
  gestureEnabled?: boolean;
  style?: RNSStyle;
}

export type ScreenContainerProps = FlexboxLayoutAttributes;

export interface ScreenStackProps extends FlexboxLayoutAttributes {
  transitioning?: number;
  progress?: number;
  /**
   * @description A callback that gets called when the current screen finishes its transition.
   */
  onFinishTransitioning?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export interface ScreenStackHeaderConfigProps extends FlexboxLayoutAttributes {
  /**
   *@description String that representing screen title that will get rendered in the middle section of the header. On iOS the title is centered on the header while on Android it is aligned to the left and placed next to back button (if one is present).
   */
  title?: string;
  /**
   *@description When set to true the header will be hidden while the parent Screen is on the top of the stack. The default value is false.
   */
  hidden?: boolean;
  /**
   *@description Controls the color of items rendered on the header. This includes back icon, back text (iOS only) and title text. If you want the title to have different color use titleColor property.
   */
  color?: string;
  /**
   *@description Customize font family to be used for the title.
   */
  titleFontFamily?: string;
  /**
   *@description Customize the size of the font to be used for the title.
   */
  titleFontSize?: number;
  /**
   *@description Allows for setting text color of the title.
   */
  titleColor?: string;
  /**
   *@description Controls the color of the navigation header.
   */
  backgroundColor?: string;
  /**
   * @description Boolean that allows for disabling drop shadow under navigation header. The default value is true.
   */
  hideShadow?: boolean;
  /**
   * @description If set to true the back button will not be rendered as a part of navigation header.
   */
  hideBackButton?: boolean;
  /**
   * @description Whether to show the back button with a custom left side of the header.
   */
  backButtonInCustomView?: boolean;
  /**
   * @host (iOS only)
   * @description When set to true, it makes native navigation bar on iOS semi transparent with blur effect. It is a common way of presenting navigation bar introduced in iOS 11. The default value is false
   */
  translucent?: boolean;
  /**
   * @host (iOS only)
   * @description Allows for controlling the string to be rendered next to back button. By default iOS uses the title of the previous screen.
   */
  backTitle?: string;
  /**
   * @host (iOS only)
   * @description Allows for customizing font family to be used for back button title on iOS.
   */
  backTitleFontFamily?: string;
  /**
   * @host (iOS only)
   * @description Allows for customizing font size to be used for back button title on iOS.
   */
  backTitleFontSize?: number;
  /**
   * @host (iOS only)
   * @description When set to true it makes the title display using the large title effect.
   */
  largeTitle?: boolean;
  /**
   * @host (iOS only)
   * @description Customize font family to be used for the large title.
   */
  largeTitleFontFamily?: string;
  /**
   * @host (iOS only)
   * @description Customize the size of the font to be used for the large title.
   */
  largeTitleFontSize?: number;
  /**
   *@description Controls the color of the navigation header when the edge of any scrollable content reaches the matching edge of the navigation bar.
   */
  largeTitleBackgroundColor?: string;
  /**
   * @description Boolean that allows for disabling drop shadow under navigation header when the edge of any scrollable content reaches the matching edge of the navigation bar.
   */
  largeTitleHideShadow?: boolean;
  /**
   * @host (iOS only)
   * @description Customize the color to be used for the large title. By default uses the titleColor property.
   */
  largeTitleColor?: string;
  /**
   * Pass HeaderLeft, HeaderRight and HeaderTitle
   */
  children?: React.ReactNode;
}


/**
 * @see https://github.com/software-mansion/react-native-screens/blob/master/src/screens.web.js
 * @see https://docs.nativescript.org/ui/components/page#page-events
 */
export class NativeScreen extends React.Component<ScreenProps> {
  /**
   * #1 *
   * Whether this is a forward or backward navigation, it fires on the page that is being dismissed.
   */
  private readonly onNavigatingFrom = (args: NavigatedData) => {
      this.props.onDismissed && this.props.onDismissed(args, "willDismiss");
  };
  
  /**
   * #2
   * Whether this is a forward or backward navigation, it fires on the page that is appearing in place of this one.
   */
  private readonly onNavigatingTo = (args: NavigatedData) => {
    this.props.onDismissed && this.props.onDismissed(args, "didDismiss");
  };
  
  /**
   * #3
   * Whether this is a forward or backward navigation, it fires on the page that is ___.
   */
  private readonly onNavigatedFrom = (args: NavigatedData) => {
    this.props.onAppear && this.props.onAppear(args, "willAppear");
  };
  
  /**
   * #4 *
   * Whether this is a forward or backward navigation, it fires on the page that has appeared.
   */
  private readonly onNavigatedTo = (args: NavigatedData) => {
      this.props.onAppear && this.props.onAppear(args, "didAppear");
  };

  render(){
    const { active, style, ...rest } = this.props;

    // console.log(`[NativeScreen] ENABLE_SCREENS && !active ${ENABLE_SCREENS && !active}`);

    return (
      <page
        onNavigatingTo={this.onNavigatingTo}
        onNavigatedTo={this.onNavigatedTo}
        onNavigatedFrom={this.onNavigatedFrom}
        onNavigatingFrom={this.onNavigatingFrom}
        style={{
          ...style,
          ...(
            ENABLE_SCREENS && !active ? 
              {
                visibility: 'collapse' // Because `display: 'none'` doesn't exist in NativeScript
              } : 
              {}
          ),
        }}
        {...rest}
      />
    );
  }
}

const styles = {
  headerSubview: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // bottom: 0,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
  },
  right: {
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // bottom: 0,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
  },
  headerCenterView: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

interface StackHeaderConfigProps extends PropsWithChildren<ActionBarAttributes> {
  style?: RNSStyle;
}

export const ScreenStackHeaderConfig = (props: StackHeaderConfigProps) => {
  const {
    style = {},
  } = props;

  return (
    <actionBar
      nodeRole={"actionBar"}
      style={style}
      {...props}
    />
  );
};

// It's unclear whether NavigationButtons accept children, but I might as well not block it.
interface ScreenStackHeaderBackButtonImageProps extends PropsWithChildren<NavigationButtonAttributes> {
  // titleFontFamily?: string,
  // titleFontSize?: number,
  // titleColor?: string|Color,
  style?: RNSStyle;
}
export const ScreenStackHeaderBackButtonImage = (props: ScreenStackHeaderBackButtonImageProps) => {
  const {
    style = {},
  } = props;

  return (
    <navigationButton
      nodeRole={"navigationButton"}
      style={style}
      {...props}
    />
  );
}

interface ScreenStackHeaderRightViewProps extends PropsWithChildren<ActionItemAttributes> {
  tintColor?: string|Color,
  style?: RNSStyle;
}
export const ScreenStackHeaderRightView = (props: ScreenStackHeaderRightViewProps) => {
  const {
    tintColor,
    style = {},
    children,
  } = props;

  return (
    <actionItem
      nodeRole={"actionItems"}
      ios={{ position: "right" as const, systemIcon: undefined }}
      android={{ position: "popup" as const, systemIcon: undefined }}
      style={{
        ...style,
        backgroundColor: tintColor,
      }}
      // style={{
      //   ...styles.right,
      //   // ...{ right: insets.right },
      //   // ...rightButtonStyle,
      //   // ...rightContainerStyle,
      // }}
    >
      {/*
        * TODO: decide whether it is the consumer's responsibility to set nodeRole={"actionView"} for this!
        *       For ActionItem, addChildFromBuilder and removeView both act upon actionView, so it's not strict.
        */}
      {children}
    </actionItem>
  );
}

interface ScreenStackHeaderLeftViewProps extends PropsWithChildren<ActionItemAttributes> {
  tintColor?: string|Color,
  style?: RNSStyle;
}
export const ScreenStackHeaderLeftView = (props: ScreenStackHeaderLeftViewProps) => {
  const {
    tintColor,
    style = {},
    children,
  } = props;

  return (
    <actionItem
      nodeRole={"actionItems"}
      ios={{ position: "left" as const, systemIcon: undefined }}
      // Note: Android does not support actionItems on left, to my understanding.
      android={{ position: "popup" as const, systemIcon: undefined }}
      style={{
        ...style,
        backgroundColor: tintColor,
      }}
      // style={{
      //   ...styles.right,
      //   // ...{ right: insets.right },
      //   // ...rightButtonStyle,
      //   // ...rightContainerStyle,
      // }}
    >
      {/*
        * TODO: decide whether it is the consumer's responsibility to set nodeRole={"actionView"} for this!
        *       For ActionItem, addChildFromBuilder and removeView both act upon actionView, so it's not strict.
        */}
      {children}
    </actionItem>
  );
}

interface ScreenStackHeaderCenterViewProps extends PropsWithChildren<FlexboxLayoutAttributes> {
  tintColor?: string|Color,
  style?: RNSStyle;
}
export const ScreenStackHeaderCenterView = (props: ScreenStackHeaderCenterViewProps) => {
  const {
    tintColor,
    style = {},
    children,
  } = props;

  return (
    <flexboxLayout
      nodeRole={"titleView"}
      {...props}
      style={{
        ...styles.headerCenterView,
        ...style,
        backgroundColor: tintColor,
      }}
    >
      {children}
    </flexboxLayout>
  );
}

export const Screen = NativeScreen;

export const ScreenContainer: React.ElementType<JSX.IntrinsicElements["flexboxLayout"]> = "flexboxLayout";

export const NativeScreenContainer: React.ElementType<JSX.IntrinsicElements["flexboxLayout"]> = "flexboxLayout";

// ScreenStack contains any number of Screen components.
export const ScreenStack: React.ElementType<JSX.IntrinsicElements["frame"]> = "frame";
