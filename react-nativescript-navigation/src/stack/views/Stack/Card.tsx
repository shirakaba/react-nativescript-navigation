import * as React from 'react';
// import {
//   Animated,
//   View,
//   StyleSheet,
//   ViewProps,
//   StyleProp,
//   ViewStyle,
//   Platform,
//   InteractionManager,
// } from 'react-native';
// import { EdgeInsets } from 'react-native-safe-area-context';
type EdgeInsets = { left: number, top: number, bottom: number, right: number };
// import Color from 'color';

import CardSheet from './CardSheet';
// import {
//   PanGestureHandler,
//   GestureState,
//   PanGestureHandlerGestureEvent,
// } from '../GestureHandler';
// import CardAnimationContext from '../../utils/CardAnimationContext';
// import getDistanceForDirection from '../../utils/getDistanceForDirection';
// import getInvertedMultiplier from '../../utils/getInvertedMultiplier';
import memoize from '../../../utils/memoize';
import {
  TransitionSpec,
  StackCardStyleInterpolator,
  GestureDirection,
  Layout,
} from '../../types';
import { FlexboxLayout, isIOS, Color } from "@nativescript/core";
import { ViewBaseAttributes } from "react-nativescript/dist/shared/NativeScriptJSXTypings";
import { ViewAttributes } from 'react-nativescript/dist/lib/react-nativescript-jsx';

type RNSStyle = ViewBaseAttributes["style"];
type StyleProp<T> = T;

type Props = typeof Card.defaultProps & ViewAttributes & {
  index: number;
  closing: boolean;
//   next?: Animated.AnimatedInterpolation;
//   current: Animated.AnimatedInterpolation;
//   gesture: Animated.Value;
  layout: Layout;
  insets: EdgeInsets;
  pageOverflowEnabled: boolean;
  gestureDirection: GestureDirection;
  onOpen: () => void;
  onClose: () => void;
  onTransitionStart?: (props: { closing: boolean }) => void;
  onGestureBegin?: () => void;
  onGestureCanceled?: () => void;
  onGestureEnd?: () => void;
  children: React.ReactNode;
  overlay: (props: {
    style: StyleProp<RNSStyle>;
  }) => React.ReactNode;
  overlayEnabled: boolean;
  shadowEnabled: boolean;
  gestureEnabled: boolean;
  gestureResponseDistance?: {
    vertical?: number;
    horizontal?: number;
  };
  gestureVelocityImpact: number;
  transitionSpec: {
    open: TransitionSpec;
    close: TransitionSpec;
  };
  styleInterpolator: StackCardStyleInterpolator;
  containerStyle?: StyleProp<RNSStyle>;
  contentStyle?: StyleProp<RNSStyle>;
};

const GESTURE_VELOCITY_IMPACT = 0.3;

// const TRUE = 1;
// const FALSE = 0;

/**
 * The distance of touch start from the edge of the screen where the gesture will be recognized
 */
// const GESTURE_RESPONSE_DISTANCE_HORIZONTAL = 50;
// const GESTURE_RESPONSE_DISTANCE_VERTICAL = 135;

// const useNativeDriver = Platform.OS !== 'web';


export default class Card extends React.Component<Props> {
  static defaultProps = {
    overlayEnabled: !isIOS,
    shadowEnabled: true,
    gestureEnabled: true,
    gestureVelocityImpact: GESTURE_VELOCITY_IMPACT,
    overlay: ({
      style,
    }: {
      style: StyleProp<any>; // TypeScript doesn't like inferring RNSStyle here.
    }) =>
      style ? (
        <flexboxLayout style={{ ...styles.overlay, ...style }} />
      ) : null,
  };

  componentDidMount() {
    // this.animate({ closing: this.props.closing });
  }

  componentDidUpdate(prevProps: Props) {
    const { layout, gestureDirection, closing } = this.props;
    const { width, height } = layout;

    if (width !== prevProps.layout.width) {
      this.layout.width = width;
    }

    if (height !== prevProps.layout.height) {
      this.layout.height = height;
    }

    // if (gestureDirection !== prevProps.gestureDirection) {
    //   this.inverted.setValue(getInvertedMultiplier(gestureDirection));
    // }

    // if (
    //   this.getAnimateToValue(this.props) !== this.getAnimateToValue(prevProps)
    // ) {
    //   // We need to trigger the animation when route was closed
    //   // Thr route might have been closed by a `POP` action or by a gesture
    //   // When route was closed due to a gesture, the animation would've happened already
    //   // It's still important to trigger the animation so that `onClose` is called
    //   // If `onClose` is not called, cleanup step won't be performed for gestures
    //   this.animate({ closing });
    // }
  }

  componentWillUnmount() {
    // this.handleEndInteraction();
  }

  // private isClosing = new Animated.Value(FALSE);

  // private inverted = new Animated.Value(
  //   getInvertedMultiplier(this.props.gestureDirection)
  // );

  private layout = {
    width: this.props.layout.width,
    height: this.props.layout.height,
  };

  // private isSwiping = new Animated.Value(FALSE);

  // private interactionHandle: number | undefined;

  // private pendingGestureCallback: number | undefined;

  // private animate = ({
  //   closing,
  //   velocity,
  // }: {
  //   closing: boolean;
  //   velocity?: number;
  // }) => {
  //   const {
  //     gesture,
  //     transitionSpec,
  //     onOpen,
  //     onClose,
  //     onTransitionStart,
  //   } = this.props;

  //   const toValue = this.getAnimateToValue({
  //     ...this.props,
  //     closing,
  //   });

  //   const spec = closing ? transitionSpec.close : transitionSpec.open;

  //   const animation =
  //     spec.animation === 'spring' ? Animated.spring : Animated.timing;

  //   this.setPointerEventsEnabled(!closing);
  //   this.handleStartInteraction();

  //   clearTimeout(this.pendingGestureCallback);

  //   onTransitionStart?.({ closing });
  //   animation(gesture, {
  //     ...spec.config,
  //     velocity,
  //     toValue,
  //     useNativeDriver,
  //     isInteraction: false,
  //   }).start(({ finished }) => {
  //     this.handleEndInteraction();

  //     clearTimeout(this.pendingGestureCallback);

  //     if (finished) {
  //       if (closing) {
  //         onClose();
  //       } else {
  //         onOpen();
  //       }
  //     }
  //   });
  // };

  // private getAnimateToValue = ({
  //   closing,
  //   layout,
  //   gestureDirection,
  // }: {
  //   closing?: boolean;
  //   layout: Layout;
  //   gestureDirection: GestureDirection;
  // }) => {
  //   if (!closing) {
  //     return 0;
  //   }

  //   return getDistanceForDirection(layout, gestureDirection);
  // };

  // private setPointerEventsEnabled = (enabled: boolean) => {
  //   const pointerEvents = enabled ? 'box-none' : 'none';

  //   this.contentRef.current?.setNativeProps({ pointerEvents });
  // };

  // private handleStartInteraction = () => {
  //   if (this.interactionHandle === undefined) {
  //     this.interactionHandle = InteractionManager.createInteractionHandle();
  //   }
  // };

  // private handleEndInteraction = () => {
  //   if (this.interactionHandle !== undefined) {
  //     InteractionManager.clearInteractionHandle(this.interactionHandle);
  //     this.interactionHandle = undefined;
  //   }
  // };

  // private handleGestureStateChange = ({
  //   nativeEvent,
  // }: PanGestureHandlerGestureEvent) => {
  //   const {
  //     layout,
  //     onClose,
  //     onGestureBegin,
  //     onGestureCanceled,
  //     onGestureEnd,
  //     gestureDirection,
  //     gestureVelocityImpact,
  //   } = this.props;

  //   switch (nativeEvent.state) {
  //     case GestureState.BEGAN:
  //       this.isSwiping.setValue(TRUE);
  //       this.handleStartInteraction();
  //       onGestureBegin?.();
  //       break;
  //     case GestureState.CANCELLED: {
  //       this.isSwiping.setValue(FALSE);
  //       this.handleEndInteraction();

  //       const velocity =
  //         gestureDirection === 'vertical' ||
  //         gestureDirection === 'vertical-inverted'
  //           ? nativeEvent.velocityY
  //           : nativeEvent.velocityX;

  //       this.animate({ closing: this.props.closing, velocity });

  //       onGestureCanceled?.();
  //       break;
  //     }
  //     case GestureState.END: {
  //       this.isSwiping.setValue(FALSE);

  //       let distance;
  //       let translation;
  //       let velocity;

  //       if (
  //         gestureDirection === 'vertical' ||
  //         gestureDirection === 'vertical-inverted'
  //       ) {
  //         distance = layout.height;
  //         translation = nativeEvent.translationY;
  //         velocity = nativeEvent.velocityY;
  //       } else {
  //         distance = layout.width;
  //         translation = nativeEvent.translationX;
  //         velocity = nativeEvent.velocityX;
  //       }

  //       const closing =
  //         (translation + velocity * gestureVelocityImpact) *
  //           getInvertedMultiplier(gestureDirection) >
  //         distance / 2
  //           ? velocity !== 0 || translation !== 0
  //           : this.props.closing;

  //       this.animate({ closing, velocity });

  //       if (closing) {
  //         // We call onClose with a delay to make sure that the animation has already started
  //         // This will make sure that the state update caused by this doesn't affect start of animation
  //         this.pendingGestureCallback = (setTimeout(
  //           onClose,
  //           32
  //         ) as any) as number;
  //       }

  //       onGestureEnd?.();
  //       break;
  //     }
  //   }
  // };

  // Memoize this to avoid extra work on re-render
  private getInterpolatedStyle = memoize(
    (
      styleInterpolator: StackCardStyleInterpolator,
      index: number,
      // current: Animated.AnimatedInterpolation,
      // next: Animated.AnimatedInterpolation | undefined,
      layout: Layout,
      insetTop: number,
      insetRight: number,
      insetBottom: number,
      insetLeft: number
    ) =>
      styleInterpolator({
        index,
        // current: { progress: current },
        // next: next && { progress: next },
        current: { progress: 0 },
        next: { progress: 0 },
        // closing: this.isClosing,
        // swiping: this.isSwiping,
        // inverted: this.inverted,
        closing: false,
        swiping: false,
        inverted: 1, // the same value a vertical swipe gives
        layouts: {
          screen: layout,
        },
        insets: {
          top: insetTop,
          right: insetRight,
          bottom: insetBottom,
          left: insetLeft,
        },
      })
  );

  // // Keep track of the animation context when deps changes.
  // private getCardAnimationContext = memoize(
  //   (
  //     index: number,
  //     current: Animated.AnimatedInterpolation,
  //     next: Animated.AnimatedInterpolation | undefined,
  //     layout: Layout,
  //     insetTop: number,
  //     insetRight: number,
  //     insetBottom: number,
  //     insetLeft: number
  //   ) => ({
  //     index,
  //     current: { progress: current },
  //     next: next && { progress: next },
  //     closing: this.isClosing,
  //     swiping: this.isSwiping,
  //     inverted: this.inverted,
  //     layouts: {
  //       screen: layout,
  //     },
  //     insets: {
  //       top: insetTop,
  //       right: insetRight,
  //       bottom: insetBottom,
  //       left: insetLeft,
  //     },
  //   })
  // );

  // private gestureActivationCriteria() {
  //   const { layout, gestureDirection, gestureResponseDistance } = this.props;

  //   const distance =
  //     gestureDirection === 'vertical' ||
  //     gestureDirection === 'vertical-inverted'
  //       ? gestureResponseDistance?.vertical !== undefined
  //         ? gestureResponseDistance.vertical
  //         : GESTURE_RESPONSE_DISTANCE_VERTICAL
  //       : gestureResponseDistance?.horizontal !== undefined
  //       ? gestureResponseDistance.horizontal
  //       : GESTURE_RESPONSE_DISTANCE_HORIZONTAL;

  //   if (gestureDirection === 'vertical') {
  //     return {
  //       maxDeltaX: 15,
  //       minOffsetY: 5,
  //       hitSlop: { bottom: -layout.height + distance },
  //     };
  //   } else if (gestureDirection === 'vertical-inverted') {
  //     return {
  //       maxDeltaX: 15,
  //       minOffsetY: -5,
  //       hitSlop: { top: -layout.height + distance },
  //     };
  //   } else {
  //     const hitSlop = -layout.width + distance;
  //     const invertedMultiplier = getInvertedMultiplier(gestureDirection);

  //     if (invertedMultiplier === 1) {
  //       return {
  //         minOffsetX: 5,
  //         maxDeltaY: 20,
  //         hitSlop: { right: hitSlop },
  //       };
  //     } else {
  //       return {
  //         minOffsetX: -5,
  //         maxDeltaY: 20,
  //         hitSlop: { left: hitSlop },
  //       };
  //     }
  //   }
  // }

  private contentRef = React.createRef<FlexboxLayout>();

  render() {
    const {
      styleInterpolator,
      index,
      // current,
      // gesture,
      // next,
      layout,
      insets,
      overlay,
      overlayEnabled,
      shadowEnabled,
      gestureEnabled,
      gestureDirection,
      pageOverflowEnabled,
      children,
      containerStyle: customContainerStyle,
      contentStyle,
      ...rest
    } = this.props;

    const interpolatedStyle = this.getInterpolatedStyle(
      styleInterpolator,
      index,
      // current,
      // next,
      layout,
      insets.top,
      insets.right,
      insets.bottom,
      insets.left
    );

    // const animationContext = this.getCardAnimationContext(
    //   index,
    //   current,
    //   next,
    //   layout,
    //   insets.top,
    //   insets.right,
    //   insets.bottom,
    //   insets.left
    // );

    const {
      containerStyle,
      cardStyle,
      overlayStyle,
      shadowStyle,
    } = interpolatedStyle;

    // const handleGestureEvent = gestureEnabled
    //   ? Animated.event(
    //       [
    //         {
    //           nativeEvent:
    //             gestureDirection === 'vertical' ||
    //             gestureDirection === 'vertical-inverted'
    //               ? { translationY: gesture }
    //               : { translationX: gesture },
    //         },
    //       ],
    //       { useNativeDriver }
    //     )
    //   : undefined;

    
    // const { backgroundColor } = contentStyle || {};

    // const isTransparent: boolean = typeof backgroundColor === "undefined" ?
    //   false :
    //   (
    //     typeof backgroundColor === "string" ? 
    //       new Color(backgroundColor).a === 0 :
    //       (backgroundColor as Color).a === 0
    //   );

    return (
      // <CardAnimationContext.Provider value={animationContext}>
        <absoluteLayout style={styles.fill} {...rest}>
          {overlayEnabled ? (
            <stackLayout style={styles.fill}>
              {overlay({ style: overlayStyle })}
            </stackLayout>
          ) : null}
          <flexboxLayout
            style={{
              ...styles.container,
              ...containerStyle,
              ...customContainerStyle
            }}
            // pointerEvents="box-none"
          >
            {/* <PanGestureHandler
              enabled={layout.width !== 0 && gestureEnabled}
              onGestureEvent={handleGestureEvent}
              onHandlerStateChange={this.handleGestureStateChange}
              {...this.gestureActivationCriteria()}
            > */}
              {/* <Animated.View style={[styles.container, cardStyle]}>
                {shadowEnabled && shadowStyle && !isTransparent ? (
                  <Animated.View
                    style={[
                      styles.shadow,
                      gestureDirection === 'horizontal'
                        ? [styles.shadowHorizontal, styles.shadowLeft]
                        : gestureDirection === 'horizontal-inverted'
                        ? [styles.shadowHorizontal, styles.shadowRight]
                        : gestureDirection === 'vertical'
                        ? [styles.shadowVertical, styles.shadowTop]
                        : [styles.shadowVertical, styles.shadowBottom],
                      { backgroundColor },
                      shadowStyle,
                    ]}
                    pointerEvents="none"
                  />
                ) : null} */}
                <CardSheet
                  ref={this.contentRef}
                  enabled={pageOverflowEnabled}
                  layout={layout}
                  style={contentStyle}
                >
                  {children}
                </CardSheet>
              {/* </Animated.View> */}
            {/* </PanGestureHandler> */}
          </flexboxLayout>
        </absoluteLayout>
      // </CardAnimationContext.Provider>
    );
  }
}

const styles = {
  fill: {
    width: "100%",
    height: "100%",
  },
  container: {
    flexGrow: 1,
  },
  overlay: {
    flexGrow: 1,
    backgroundColor: '#000',
  },
  shadow: {
    position: 'absolute',
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  shadowHorizontal: {
    top: 0,
    bottom: 0,
    width: 3,
    shadowOffset: { width: -1, height: 1 },
  },
  shadowLeft: {
    left: 0,
  },
  shadowRight: {
    right: 0,
  },
  shadowVertical: {
    left: 0,
    right: 0,
    height: 3,
    shadowOffset: { width: 1, height: -1 },
  },
  shadowTop: {
    top: 0,
  },
  shadowBottom: {
    bottom: 0,
  },
};