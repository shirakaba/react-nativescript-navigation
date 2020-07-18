# `react-nativescript-navigation`

React NativeScript Navigation is the official navigation library for React NativeScript.

For implementing the native stack view, we re-implement the same APIs that `react-native-screens` implement for React Native, but for NativeScript (and have thus renamed it `react-nativescript-screens` to reduce bewilderment).

For implementing the native tabs, I've simply followed the React Navigation docs; no Screens library was needed.

This is a provisional implementation; aspects beyond the core functionality of a stack that pushes and pops screens (such as the customisation of its appearance) may not be fully working yet.

## Installation

```sh
npm install --save react-nativescript-navigation @react-navigation/native
```

You do **not** need to install any of `react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view` as mentioned in the "Getting Started" section of React Navigation. Those are only for React Native projects. `react-nativescript-navigation` brings all the dependencies it needs.

## Documentation

* React Navigation: https://reactnavigation.org/docs/getting-started
* React NativeScript: https://react-nativescript.netlify.com/
* Navigation in React NativeScript: https://react-nativescript.netlify.app/docs/core-concepts/navigation

For the full list of configurable options, see the typings:

* [for tabNavigator](https://github.com/shirakaba/react-nativescript-navigation/blob/245aa1405cabd9a36735397f24969c986c94aca2/react-nativescript-navigation/src/native-tabs/tabNavigatorFactory.tsx#L26-L28)
* [for StackNavigator](https://github.com/shirakaba/react-nativescript-navigation/blob/master/react-nativescript-navigation/src/native-stack/types.tsx)

## Example usage

```tsx
import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory, tabNavigatorFactory } from "react-nativescript-navigation";

const TabNavigator = tabNavigatorFactory();
const StackNavigator = stackNavigatorFactory();

/* Tabs Navigator. */
const TabsAppContainer = () => (
    <BaseNavigationContainer>
        <TabNavigator.Navigator initialRouteName="first">
            <TabNavigator.Screen name="first" component={First}/>
            <TabNavigator.Screen name="second" component={Second}/>
        </TabNavigator.Navigator>
    </BaseNavigationContainer>
);

/* Stack Navigator. */
const StackAppContainer = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="first"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen name="first" component={First}/>
            <StackNavigator.Screen name="second" component={Second}/>
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);

function First({ navigation }){
    function onButtonTap(){
        navigation.navigate('second');
    }

    return (
        <flexboxLayout
            style={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "yellow",
            }}
        >
            <label fontSize={24} text={"You're viewing the first route!"}/>
            <button onTap={onButtonTap} fontSize={24} text={"Go to next route"}/>
        </flexboxLayout>
    );
}

function Second({ navigation }){
    function onButtonTap(){
        navigation.goBack();
    }

    return (
        <flexboxLayout
            style={{
                flexGrow: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "gold",
            }}
        >
            <label fontSize={24} text={"You're viewing the second route!"}/>
            <button onTap={onButtonTap} fontSize={24} text={"Go back"}/>
        </flexboxLayout>
    );
}

// export default TabsAppContainer;
export default StackAppContainer;
```

## Limitations

React NativeScript Navigation's TabNavigator and StackNavigator have fewer configurable options than React Navigation's ones – this is because the React NativeScript Navigation navigators are fully native, and so are ultimately limited by the styling options that are possible natively (and the way that NativeScript Core wraps them).

This library is also a work in progress and I simply don't have time to implement everything all on my own. If you need more configurability, please consider making a Pull Request.

To see the full list of configurable options, see the typings:

* [for tabNavigator](https://github.com/shirakaba/react-nativescript-navigation/blob/245aa1405cabd9a36735397f24969c986c94aca2/react-nativescript-navigation/src/native-tabs/tabNavigatorFactory.tsx#L26-L28)
* [for StackNavigator](https://github.com/shirakaba/react-nativescript-navigation/blob/master/react-nativescript-navigation/src/native-stack/types.tsx)

Disclaimer: the library is young, so there is a very good chance that I've incorrectly implemented some of the configuration options listed in the typings. For the happy path, I recommend starting out simple and being flexible in your design if the navigators just don't appear to be able to support it.
