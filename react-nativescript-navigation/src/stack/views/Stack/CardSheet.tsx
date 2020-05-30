import * as React from 'react';
import { FlexboxLayout } from "@nativescript/core";
import { ViewBaseAttributes } from "react-nativescript/dist/shared/NativeScriptJSXTypings";
import { FlexboxLayoutAttributes } from 'react-nativescript/dist/lib/react-nativescript-jsx';

type RNSStyle = ViewBaseAttributes["style"];
type StyleProp<T> = T;

type Props = FlexboxLayoutAttributes & {
  enabled: boolean;
  layout: { width: number; height: number };
  children: React.ReactNode;
  style?: RNSStyle;
};

// This component will render a page which overflows the screen
// if the container fills the body by comparing the size
// This lets the document.body handle scrolling of the content
// It's necessary for mobile browsers to be able to hide address bar on scroll
export default React.forwardRef<FlexboxLayout, Props>(function CardSheet(
  { enabled, layout, style = {}, ...rest },
  ref
) {
  // const [fill, setFill] = React.useState(false);

  // React.useEffect(() => {
  //   if (typeof document === 'undefined' || !document.body) {
  //     // Only run when DOM is available
  //     return;
  //   }

  //   const width = document.body.clientWidth;
  //   const height = document.body.clientHeight;

  //   setFill(width === layout.width && height === layout.height);
  // }, [layout.height, layout.width]);

  return (
    <flexboxLayout
      {...rest}
      ref={ref}
      style={{
        // ...(enabled && fill ? styles.page : styles.card),
        ...styles.card,
        ...style
      }}
    />
  );
});

const styles = {
  page: {
    minHeight: '100%',
  },
  card: {
    flexGrow: 1,
    overflow: 'hidden',
  },
};