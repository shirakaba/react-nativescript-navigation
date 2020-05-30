import * as React from 'react';
// import { useTheme } from '@react-navigation/native';
import { isIOS, isAndroid } from "@nativescript/core";

/**
 * @see https://github.com/react-navigation/react-navigation/blob/master/packages/stack/src/views/Header/HeaderTitle.tsx
 */
type Props = Omit<React.ComponentProps<"label">, 'key'> & {
  tintColor?: string;
  children?: string;
};

export default function HeaderTitle({ tintColor, style, ...rest }: Props) {
  // const { colors } = useTheme();

  return (
    <label
      nodeRole={"titleView"}
      // accessibilityRole="header"
      // numberOfLines={1}
      {...rest}
      style={{
        ...styles.title,
        // ...{
        //   color: tintColor === undefined ? 
        //     colors.text : 
        //     tintColor
        // },
        ...(
          tintColor === undefined ? {} : { color: tintColor }
        ),
        ...style,
      }}
    />
  );
}

const styles = {
  title: isIOS ? 
    {
      fontSize: 17,
      fontWeight: '600',
    } : isAndroid ?
    {
      fontSize: 20,
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    } : {
      fontSize: 18,
      fontWeight: '500',
    }
};