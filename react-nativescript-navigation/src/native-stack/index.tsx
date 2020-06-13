/**
 * A reimplementation of React Native Screens for React NativeScript.
 * @see https://github.com/software-mansion/react-native-screens/blob/73959abc975b5718e683d39f1452ec0bb4d5f475/native-stack/index.tsx
 */

/**
 * Navigators
 */
export { default as createNativeStackNavigator } from './navigators/createNativeStackNavigator';

/**
 * Views
 */
export { default as NativeStackView } from './views/NativeStackView';

/**
 * Types
 */
export type {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from './types';