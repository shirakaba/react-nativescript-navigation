/**
 * A reimplementation of React Native Screens for React NativeScript.
 * @see https://github.com/software-mansion/react-native-screens/blob/73959abc975b5718e683d39f1452ec0bb4d5f475/src/screens.native.js
 */
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { RNSStyle, PageAttributes, FlexboxLayoutAttributes, NavigationButtonAttributes, ActionBarAttributes, ActionItemAttributes, NSVElement, render } from "react-nativescript";
import { NavigatedData, Color, Page, Frame, NavigationTransition, ContainerView, EventData, ContentView } from "@nativescript/core";
import { FrameProps } from 'src/native-stack/types';

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
   *@description A callback that gets called when this screen begins to be dismissed by hardware back (on Android) or dismiss gesture (swipe back or down).
   */
  onWillDisappear?: (args: NavigatedData) => void;
  /**
   *@description A callback that gets called when this screen disappears completely.
   */
  onDidDisappear?: (args: NavigatedData) => void;
  /**
   *@description A callback that gets called when this screen begins to be appear.
   */
  onWillAppear?: (args: NavigatedData) => void;
  /**
   *@description A callback that gets called when this screen appears completely.
   */
  onDidAppear?: (args: NavigatedData) => void;
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

export const NativeScreen: React.FC<ScreenProps> = (props) => {
  const { active, gestureEnabled, style, ...rest } = props;
  const [onScreen, setOnScreen] = React.useState<boolean>(() => props.active === 1)
  const ref = React.useRef<NSVElement<Page>>()
  // 1
  const onNavigatingFrom = (args: NavigatedData) => {
    props.onWillDisappear?.(args); // √
  };

  // 2
  const onNavigatingTo = (args: NavigatedData) => {
    // Checking whether our ref is still populated avoids "Can't perform a React state update on an unmounted component."
    if (ref.current) {
      setOnScreen(true);
    }
    props.onWillAppear?.(args);
  };

  // 3
  const onNavigatedFrom = (args: NavigatedData) => {
    props.onDidDisappear?.(args);
    // Checking whether our ref is still populated avoids "Can't perform a React state update on an unmounted component."
    if (ref.current) {
      setOnScreen(false)
    }
  };

  // 4
  const onNavigatedTo = (args: NavigatedData) => {
    props.onDidAppear?.(args);
  };

  // console.log(`[NativeScreen] ENABLE_SCREENS && !active ${ENABLE_SCREENS && !active}`);

  return (
    <page
      ref={ref}
      enableSwipeBackNavigation={gestureEnabled}
      onNavigatingTo={onNavigatingTo}
      onNavigatedTo={onNavigatedTo}
      onNavigatedFrom={onNavigatedFrom}
      onNavigatingFrom={onNavigatingFrom}
      style={{
        ...style,
        ...(
          ENABLE_SCREENS && !active && !onScreen ?
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

type GoToScreenParams<T> = {
  screen: React.JSXElementConstructor<T>,
  props?: T,
  transition?: NavigationTransition,
  pageProps?: ScreenProps
}
interface NativeScreensContextData {
  $showModal<T>(params: GoToScreenParams<T>): void
  $navigate<T>(params: GoToScreenParams<T>): void
}

const NativeScreensContext = React.createContext({} as NativeScreensContextData)

export const NativeScreensProvider: React.FC<FrameProps> = ({ children, ...rest }) => {
  const navRef = React.useRef<NSVElement<Frame>>()
  function createView<T>(params: GoToScreenParams<T>, callback = (page: Page) => { }, modal?: boolean) {
    const { screen: Screen, props } = params
    if (!navRef.current) return
    const ref = React.createRef<NSVElement<ContentView>>()
    const container = new NSVElement<Page>('page')
    if (modal) container.nativeView.background = 'transparent'
    const key = `${Date.now()}-screen`
    render(
      (
        <NativeScreensProvider {...rest}>
          <NativeScreen {...params.pageProps} active={1} key={key}>
            <Screen {...props ? props : undefined} />
          </NativeScreen>
        </NativeScreensProvider>
      ),
      container, () => callback(container.nativeView), key, true)
  }
  function $showModal<T>(params: GoToScreenParams<T>, fullScreen?: boolean) {
    createView(params, (page) => {
      navRef.current.nativeView.showModal(page, {
        animated: true,
        transparent: true,
        fullscreen: fullScreen,
        context: params.props,
        closeCallback: (_args: any) => {

        }
      });
    })
  }
  function $navigate<T>(params: GoToScreenParams<T>) {
    createView(params, (page) => {
      navRef.current.nativeView.navigate({
        create() {
          return page
        },
        transition: params.transition,
        backstackVisible: true,
        context: params.props,
        animated: true,
      })
    })
  }
  return (
    <NativeScreensContext.Provider value={{
      $navigate,
      $showModal,
    }}>
      <frame {...rest} ref={navRef}>
        {children}
      </frame>
    </NativeScreensContext.Provider>
  )
}

export const useNativeScreensContext = () => React.useContext(NativeScreensContext)