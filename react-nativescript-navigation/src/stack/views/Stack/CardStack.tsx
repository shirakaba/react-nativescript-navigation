import * as React from 'react';
// import {
//   Animated,
//   StyleSheet,
//   LayoutChangeEvent,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import { EdgeInsets } from 'react-native-safe-area-context';
type EdgeInsets = { left: number, top: number, bottom: number, right: number };
import { Route, StackNavigationState } from '@react-navigation/core';

// import { MaybeScreenContainer, MaybeScreen } from '../Screens';
// import { getDefaultHeaderHeight } from '../Header/HeaderSegment';
import { Props as HeaderContainerProps } from '../Header/HeaderContainer';
// import CardContainer from './CardContainer';
// import {
//   DefaultTransition,
//   ModalTransition,
// } from '../../TransitionConfigs/TransitionPresets';
// import { forNoAnimation as forNoAnimationHeader } from '../../TransitionConfigs/HeaderStyleInterpolators';
// import { forNoAnimation as forNoAnimationCard } from '../../TransitionConfigs/CardStyleInterpolators';
// import getDistanceForDirection from '../../utils/getDistanceForDirection';
import {
  Layout,
  StackHeaderMode,
  StackCardMode,
  Scene,
  StackDescriptorMap,
  StackNavigationOptions,
  StackDescriptor,
} from '../../types';
import { Screen, EventData, Frame, isIOS, isAndroid, Device, NavigatedData } from "@nativescript/core";
import CardContainer from './CardContainer';

// type GestureValues = {
//   [key: string]: Animated.Value;
// };

type Props = {
  mode: StackCardMode;
  insets: EdgeInsets;
  state: StackNavigationState;
  descriptors: StackDescriptorMap;
  routes: Route<string>[];
  openingRouteKeys: string[];
  closingRouteKeys: string[];
  onOpenRoute: (props: { route: Route<string> }) => void;
  onCloseRoute: (props: { route: Route<string> }) => void;
  getPreviousRoute: (props: {
    route: Route<string>;
  }) => Route<string> | undefined;
  getGesturesEnabled: (props: { route: Route<string> }) => boolean;
  renderHeader: (props: HeaderContainerProps) => React.ReactNode;
  renderScene: (props: { route: Route<string> }) => React.ReactNode;
  headerMode: StackHeaderMode;
  onTransitionStart: (
    props: { route: Route<string> },
    closing: boolean
  ) => void;
  onTransitionEnd: (props: { route: Route<string> }, closing: boolean) => void;
  onPageChangeStart?: () => void;
  onPageChangeConfirm?: () => void;
  onPageChangeCancel?: () => void;
};

type State = {
  routes: Route<string>[];
  descriptors: StackDescriptorMap;
  scenes: Scene<Route<string>>[];
  // gestures: GestureValues;
  layout: Layout;
  headerHeights: Record<string, number>;
};

const EPSILON = 0.01;

const FALLBACK_DESCRIPTOR = Object.freeze({ options: {} });

/**
 * Originally from HeaderSegment.
 */
const getDefaultHeaderHeight = (
  layout: Layout,
  statusBarHeight: number
): number => {
  const isLandscape = layout.width > layout.height;

  let headerHeight;

  if (isIOS) {
    if (isLandscape && Device.deviceType !== "Tablet") {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (isAndroid) {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return headerHeight + statusBarHeight;
};


const getHeaderHeights = (
  routes: Route<string>[],
  insets: EdgeInsets,
  descriptors: StackDescriptorMap,
  layout: Layout,
  previous: Record<string, number>
) => {
  return routes.reduce<Record<string, number>>((acc, curr) => {
    const { options = {} } = descriptors[curr.key] || {};
    const style: any = options.headerStyle || {};

    const height =
      typeof style.height === 'number' ? style.height : previous[curr.key];

    const safeAreaInsets = {
      ...insets,
      ...options.safeAreaInsets,
    };

    const { headerStatusBarHeight = safeAreaInsets.top } = options;

    acc[curr.key] =
      typeof height === 'number'
        ? height
        : getDefaultHeaderHeight(layout, headerStatusBarHeight);

    return acc;
  }, {});
};

// const getDistanceFromOptions = (
//   mode: StackCardMode,
//   layout: Layout,
//   descriptor?: StackDescriptor
// ) => {
//   const {
//     gestureDirection = mode === 'modal'
//       ? ModalTransition.gestureDirection
//       : DefaultTransition.gestureDirection,
//   } = descriptor?.options || {};

//   return getDistanceForDirection(layout, gestureDirection);
// };

// const getProgressFromGesture = (
//   mode: StackCardMode,
//   gesture: Animated.Value,
//   layout: Layout,
//   descriptor?: StackDescriptor
// ) => {
//   const distance = getDistanceFromOptions(
//     mode,
//     {
//       // Make sure that we have a non-zero distance, otherwise there will be incorrect progress
//       // This causes blank screen on web if it was previously inside container with display: none
//       width: Math.max(1, layout.width),
//       height: Math.max(1, layout.height),
//     },
//     descriptor
//   );

//   if (distance > 0) {
//     return gesture.interpolate({
//       inputRange: [0, distance],
//       outputRange: [1, 0],
//     });
//   }

//   return gesture.interpolate({
//     inputRange: [distance, 0],
//     outputRange: [0, 1],
//   });
// };

const TransitionIOSSpec = {
  animation: 'spring' as const,
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

export default class CardStack extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (
      props.routes === state.routes &&
      props.descriptors === state.descriptors
    ) {
      return null;
    }

    // const gestures = props.routes.reduce<GestureValues>((acc, curr) => {
    //   const descriptor = props.descriptors[curr.key];
    //   const { animationEnabled } = descriptor?.options || {};

    //   acc[curr.key] =
    //     state.gestures[curr.key] ||
    //     new Animated.Value(
    //       props.openingRouteKeys.includes(curr.key) &&
    //       animationEnabled !== false
    //         ? getDistanceFromOptions(props.mode, state.layout, descriptor)
    //         : 0
    //     );

    //   return acc;
    // }, {});

    return {
      routes: props.routes,
      scenes: props.routes.map((route, index, self) => {
        const previousRoute = self[index - 1];
        const nextRoute = self[index + 1];

        const oldScene = state.scenes[index];

        // const currentGesture = gestures[route.key];
        // const previousGesture = previousRoute
        //   ? gestures[previousRoute.key]
        //   : undefined;
        // const nextGesture = nextRoute ? gestures[nextRoute.key] : undefined;

        const descriptor =
          props.descriptors[route.key] ||
          state.descriptors[route.key] ||
          (oldScene ? oldScene.descriptor : FALLBACK_DESCRIPTOR);

        const nextDescriptor =
          props.descriptors[nextRoute?.key] ||
          state.descriptors[nextRoute?.key];

        const previousDescriptor =
          props.descriptors[previousRoute?.key] ||
          state.descriptors[previousRoute?.key];

        const scene = {
          route,
          descriptor,
          // progress: {
          //   current: getProgressFromGesture(
          //     props.mode,
          //     currentGesture,
          //     state.layout,
          //     descriptor
          //   ),
          //   next: nextGesture
          //     ? getProgressFromGesture(
          //         props.mode,
          //         nextGesture,
          //         state.layout,
          //         nextDescriptor
          //       )
          //     : undefined,
          //   previous: previousGesture
          //     ? getProgressFromGesture(
          //         props.mode,
          //         previousGesture,
          //         state.layout,
          //         previousDescriptor
          //       )
          //     : undefined,
          // },
          __memo: [
            route,
            state.layout,
            descriptor,
            nextDescriptor,
            previousDescriptor,
            // currentGesture,
            // nextGesture,
            // previousGesture,
          ],
        };

        if (
          oldScene &&
          scene.__memo.every((it, i) => {
            // @ts-ignore
            return oldScene.__memo[i] === it;
          })
        ) {
          return oldScene;
        }

        return scene;
      }),
      // gestures,
      descriptors: props.descriptors,
      headerHeights: getHeaderHeights(
        props.routes,
        props.insets,
        state.descriptors,
        state.layout,
        state.headerHeights
      ),
    };
  }

  constructor(props: Props) {
    super(props);

    const { widthDIPs: width, heightDIPs: height } = Screen.mainScreen;

    this.state = {
      routes: [],
      scenes: [],
      // gestures: {},
      layout: { height, width },
      descriptors: this.props.descriptors,
      // Used when card's header is null and mode is float to make transition
      // between screens with headers and those without headers smooth.
      // This is not a great heuristic here. We don't know synchronously
      // on mount what the header height is so we have just used the most
      // common cases here.
      headerHeights: {},
    };
  }

  private handleLayout = (e: EventData) => {
    const frame = e.object as Frame;
    // TODO: Check whether this is the correct approach for NativeScript.
    const { height, width } = frame.getActualSize();

    const layout = { width, height };

    this.setState((state, props) => {
      if (height === state.layout.height && width === state.layout.width) {
        return null;
      }

      return {
        layout,
        headerHeights: getHeaderHeights(
          props.routes,
          props.insets,
          state.descriptors,
          layout,
          state.headerHeights
        ),
      };
    });
  };

  private handleHeaderLayout = ({
    route,
    height,
  }: {
    route: Route<string>;
    height: number;
  }) => {
    this.setState(({ headerHeights }) => {
      const previousHeight = headerHeights[route.key];

      if (previousHeight === height) {
        return null;
      }

      return {
        headerHeights: {
          ...headerHeights,
          [route.key]: height,
        },
      };
    });
  };

  private getFocusedRoute = () => {
    const { state } = this.props;

    return state.routes[state.index];
  };

  /**
   * NativeScript does not fired any events on starting or cancelling a Page change - it only fires events
   * once the user has commited to the navigation.
   * 
   * So this is not the most correct place to call these handlers, but still the best available.
   * 
   * These Page navigation event handlers are listed in order of when they'll be called.
   * 
   * @see https://docs.nativescript.org/ui/components/page#page-events
   */
  private onPageNavigatingFrom = (args: NavigatedData, scene: Scene<Route<string>>, cardContainerActive: boolean) => {
    const route = scene.route;
    // In a forward navigation from "first" -> "second", this'll say:
    //   [navigatingFrom] isBackNavigation: false; route: "first"; active: false
    console.log(`[${args.eventName}] isBackNavigation: ${args.isBackNavigation}; route: "${route.name}"; active: ${cardContainerActive}`);
    const closing: boolean = this.props.closingRouteKeys.includes(route.key);
  };

  private onPageNavigatingTo = (args: NavigatedData, scene: Scene<Route<string>>, cardContainerActive: boolean) => {
    const route = scene.route;
    // In a forward navigation from "first" -> "second", this'll say:
    //   [navigatingTo] isBackNavigation: false; route: "second"; active: true
    console.log(`[${args.eventName}] isBackNavigation: ${args.isBackNavigation}; route: "${route.name}"; active: ${cardContainerActive}`);
    const closing: boolean = this.props.closingRouteKeys.includes(route.key);

    /**
     * @see CardContainer.tsx where these handlers were originally found.
     */
    const handleTransitionStart = ({ closing }: { closing: boolean }) => {
      if (cardContainerActive && closing) {
        this.props.onPageChangeConfirm?.();
      } else {
        this.props.onPageChangeCancel?.();
      }
  
      this.props.onTransitionStart?.({ route }, closing);
    };

    // We rename this prop "onTransitionStart" when passsing it into Card.
    handleTransitionStart({ closing });
    // We rename this prop "onGestureBegin" when passsing it into Card.
    this.props.onPageChangeStart?.();
  };


  private onPageNavigatedFrom = (args: NavigatedData, scene: Scene<Route<string>>, cardContainerActive: boolean) => {
    const route = scene.route;
    // In a forward navigation from "first" -> "second", this'll say:
    //   [navigatedFrom] isBackNavigation: false; route: "first"; active: false
    console.log(`[${args.eventName}] isBackNavigation: ${args.isBackNavigation}; route: "${route.name}"; active: ${cardContainerActive}`);
    const closing: boolean = this.props.closingRouteKeys.includes(route.key);
  };

  /*
   * this.props.onPageChangeConfirm will be called upon CardContainer finding that cardContainerActive
   * has changed value.
  */
  
  // There is no concept of cancellation, so no place to put this.props.onPageChangeCancel
  
  private onPageNavigatedTo = (args: NavigatedData, scene: Scene<Route<string>>, cardContainerActive: boolean) => {
    const route = scene.route;
    // In a forward navigation from "first" -> "second", this'll say:
    //   [navigatedTo] isBackNavigation: false; route: "second"; active: true
    console.log(`[${args.eventName}] isBackNavigation: ${args.isBackNavigation}; route: "${route.name}"; active: ${cardContainerActive}`);
    const closing: boolean = this.props.closingRouteKeys.includes(route.key);

    /**
     * @see CardContainer.tsx where these handlers were originally found.
     */
    const handleOpen = () => {
      this.props.onTransitionEnd?.({ route }, false);
      this.props.onOpenRoute({ route });
    };
  
    const handleClose = () => {
      this.props.onTransitionEnd?.({ route }, true);
      this.props.onCloseRoute({ route });
    };

    /**
     * @see Card.tsx in the animate function, where these handlers were originally found.
     */
    if(closing){
      handleClose();
    } else {
      handleOpen();
    }

    // There is no this.props.onPageChangeEnd?(), so it's not missing by accident.
  };

  render() {
    const {
      mode,
      insets,
      descriptors,
      state,
      routes,
      closingRouteKeys,
      onOpenRoute,
      onCloseRoute,
      getPreviousRoute,
      getGesturesEnabled,
      renderHeader,
      renderScene,
      headerMode,
      onTransitionStart,
      onTransitionEnd,
      onPageChangeStart,
      onPageChangeConfirm,
      onPageChangeCancel,
    } = this.props;

    const { scenes, layout, /* gestures, */ headerHeights } = this.state;

    const focusedRoute = state.routes[state.index];
    const focusedDescriptor = descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor ? focusedDescriptor.options : {};

    // let defaultTransitionPreset =
    //   mode === 'modal' ? ModalTransition : DefaultTransition;

    // if (headerMode === 'screen') {
    //   defaultTransitionPreset = {
    //     ...defaultTransitionPreset,
    //     headerStyleInterpolator: forNoAnimationHeader,
    //   };
    // }

    const {
      top = insets.top,
      right = insets.right,
      bottom = insets.bottom,
      left = insets.left,
    } = focusedOptions.safeAreaInsets || {};

    // Screens is buggy on iOS and web, so we only enable it on Android
    // For modals, usually we want the screen underneath to be visible, so also disable it there
    // const isScreensEnabled = Platform.OS !== 'ios' && mode !== 'modal';

    return (
      <frame
        
        style={styles.container}
        // TODO: investigate "always"
        actionBarVisibility={headerMode === "none" ? "never" : "auto"}
        onLayoutChanged={this.handleLayout}
      >
        {routes.map((route, index, self) => {
          const isFocused = focusedRoute.key === route.key;
          // const gesture = gestures[route.key];
          const scene = scenes[index];

          // const isScreenActive = scene.progress.next
          //   ? scene.progress.next.interpolate({
          //       inputRange: [0, 1 - EPSILON, 1],
          //       outputRange: [1, 1, 0],
          //       extrapolate: 'clamp',
          //     })
          //   : 1;

          const {
            headerShown,
            header,
            headerTransparent,

            safeAreaInsets,
            cardShadowEnabled,
            cardOverlayEnabled,
            cardOverlay,
            cardStyle,
            animationEnabled,
            gestureResponseDistance,
            gestureVelocityImpact,
            // gestureDirection = defaultTransitionPreset.gestureDirection,
            // transitionSpec = defaultTransitionPreset.transitionSpec,
            // cardStyleInterpolator = animationEnabled === false
            //   ? forNoAnimationCard
            //   : defaultTransitionPreset.cardStyleInterpolator,
            // headerStyleInterpolator = defaultTransitionPreset.headerStyleInterpolator,
          } = scene.descriptor
            ? scene.descriptor.options
            : ({} as StackNavigationOptions);

          // The transitionConfig is largely going to be ignored, so we any values will do.
          let transitionConfig = {
            gestureDirection: "horizontal" as const,
            // Hard-coded TransitionIOSSpec
            transitionSpec: {
              open: TransitionIOSSpec,
              close: TransitionIOSSpec,
            },
            cardStyleInterpolator: () => ({}),
            headerStyleInterpolator: () => ({}),
          };

          // When a screen is not the last, it should use next screen's transition config
          // Many transitions also animate the previous screen, so using 2 different transitions doesn't look right
          // For example combining a slide and a modal transition would look wrong otherwise
          // With this approach, combining different transition styles in the same navigator mostly looks right
          // This will still be broken when 2 transitions have different idle state (e.g. modal presentation),
          // but majority of the transitions look alright
          // if (index !== self.length - 1) {
          //   const nextScene = scenes[index + 1];

          //   if (nextScene) {
          //     const {
          //       animationEnabled,
          //       gestureDirection = defaultTransitionPreset.gestureDirection,
          //       transitionSpec = defaultTransitionPreset.transitionSpec,
          //       cardStyleInterpolator = animationEnabled === false
          //         ? forNoAnimationCard
          //         : defaultTransitionPreset.cardStyleInterpolator,
          //       headerStyleInterpolator = defaultTransitionPreset.headerStyleInterpolator,
          //     } = nextScene.descriptor
          //       ? nextScene.descriptor.options
          //       : ({} as StackNavigationOptions);

          //     transitionConfig = {
          //       gestureDirection,
          //       transitionSpec,
          //       cardStyleInterpolator,
          //       headerStyleInterpolator,
          //     };
          //   }
          // }

          const {
            top: safeAreaInsetTop = insets.top,
            right: safeAreaInsetRight = insets.right,
            bottom: safeAreaInsetBottom = insets.bottom,
            left: safeAreaInsetLeft = insets.left,
          } = safeAreaInsets || {};

          const previousRoute = getPreviousRoute({ route: scene.route });

          let previousScene = scenes[index - 1];

          if (previousRoute) {
            // The previous scene will be shortly before the current scene in the array
            // So loop back from current index to avoid looping over the full array
            for (let j = index - 1; j >= 0; j--) {
              const s = scenes[j];

              if (s && s.route.key === previousRoute.key) {
                previousScene = s;
                break;
              }
            }
          }

          const nextScene = scenes[index + 1];

          const cardContainerActive: boolean = index === self.length - 1;

          // A screen
          return (
            <page
              key={route.key}
              style={styles.fill}
              actionBarHidden={!headerShown}
              onNavigatingTo={(args: NavigatedData) => this.onPageNavigatingTo(args, scene, cardContainerActive)}
              onNavigatedTo={(args: NavigatedData) => this.onPageNavigatedTo(args, scene, cardContainerActive)}
              onNavigatedFrom={(args: NavigatedData) => this.onPageNavigatedFrom(args, scene, cardContainerActive)}
              onNavigatingFrom={(args: NavigatedData) => this.onPageNavigatingFrom(args, scene, cardContainerActive)}
              
              // enabled={isScreensEnabled}
              // active={isScreenActive}
              // pointerEvents="box-none"
            >
              {renderHeader({
                  mode: "float",
                  layout,
                  insets: { top, right, bottom, left },
                  previousScene,
                  scene,
                  nextScene,
                  isFinalScene: index === scenes.length - 1,
                  // sceneIndex: index,
                  // scenes,
                  getPreviousRoute,
                  getFocusedRoute: this.getFocusedRoute,
                  onContentHeightChange: this.handleHeaderLayout,
                  // gestureDirection:
                  //   focusedOptions.gestureDirection !== undefined
                  //     ? focusedOptions.gestureDirection
                  //     : defaultTransitionPreset.gestureDirection,
                  // styleInterpolator:
                  //   focusedOptions.headerStyleInterpolator !== undefined
                  //     ? focusedOptions.headerStyleInterpolator
                  //     : defaultTransitionPreset.headerStyleInterpolator,
                  style: styles.floating,
                })
              }

              <CardContainer
                index={index}
                active={cardContainerActive}
                focused={isFocused}
                closing={closingRouteKeys.includes(route.key)}
                layout={layout}
                // gesture={gesture}
                scene={scene}
                previousScene={previousScene}
                safeAreaInsetTop={safeAreaInsetTop}
                safeAreaInsetRight={safeAreaInsetRight}
                safeAreaInsetBottom={safeAreaInsetBottom}
                safeAreaInsetLeft={safeAreaInsetLeft}
                cardOverlay={cardOverlay}
                cardOverlayEnabled={cardOverlayEnabled}
                cardShadowEnabled={cardShadowEnabled}
                cardStyle={cardStyle}
                onPageChangeStart={onPageChangeStart}
                onPageChangeConfirm={onPageChangeConfirm}
                onPageChangeCancel={onPageChangeCancel}
                gestureResponseDistance={gestureResponseDistance}
                headerHeight={headerHeights[route.key]}
                onHeaderHeightChange={this.handleHeaderLayout}
                getPreviousRoute={getPreviousRoute}
                getFocusedRoute={this.getFocusedRoute}
                mode={mode}
                headerMode={headerMode}
                headerShown={headerShown}
                headerTransparent={headerTransparent}
                renderHeader={renderHeader}
                renderScene={renderScene}
                // TODO: remove these event handlers from CardContainr if it turns out that only Page needs them.
                onOpenRoute={onOpenRoute}
                onCloseRoute={onCloseRoute}
                onTransitionStart={onTransitionStart}
                onTransitionEnd={onTransitionEnd}
                gestureEnabled={index !== 0 && getGesturesEnabled({ route })}
                gestureVelocityImpact={gestureVelocityImpact}
                {...transitionConfig}
              />
            </page>
          );
        })}
      </frame>
    );
  }
}

const styles = {
  container: {
    // flex: 1,
  },
  floating: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
  },
  fill: {
    width: "100%",
    height: "100%",
  },
};