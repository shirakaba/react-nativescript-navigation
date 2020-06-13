# `react-nativescript-navigation`

React NativeScript Navigation is the official navigation library for React NativeScript.

For implementing the native stack view, we re-implement the same APIs that `react-native-screens` implement for React Native, but for NativeScript (and have thus renamed it `react-nativescript-screens` to reduce bewilderment).

For implementing the native tabs, I've simply followed the React Navigation docs; no Screens library was needed.

This is a provisional implementation; aspects beyond the core functionality of a stack that pushes and pops screens (such as the customisation of its appearance) may not be fully working yet.

## Documentation

* React Navigation: https://reactnavigation.org/docs/getting-started
* React NativeScript: https://react-nativescript.netlify.com/

The React NativeScript docs will have a section on navigation at some point.

See also the typings for this package!

## Example usage

```tsx
import { stackNavigatorFactory, tabNavigatorFactory } from "react-nativescript-navigation";

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

