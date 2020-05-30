import { hot } from 'react-hot-loader/root';
import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { default as stackNavigatorFactory } from "react-nativescript-navigation/dist/stack/stackNavigatorFactory";
import { default as tabNavigatorFactory } from "react-nativescript-navigation/dist/tabNavigatorFactory";

const TabNavigator = tabNavigatorFactory();
const StackNavigator = stackNavigatorFactory();

// WARNING: React Hot Loader is incompatible with React Navigation, as it wraps our Screens in a ProxyFacade!

// const AppContainer = () => (
//     <BaseNavigationContainer>
//         <TabNavigator.Navigator initialRouteName="first">
//             <TabNavigator.Screen name="first" component={First}/>
//             <TabNavigator.Screen name="second" component={Second}/>
//         </TabNavigator.Navigator>
//     </BaseNavigationContainer>
// );

const AppContainer = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="first"
            screenOptions={{
                headerShown: true,
                // headerMode: "float" as const
            }}
        >
            <StackNavigator.Screen name="first" component={First}/>
            <StackNavigator.Screen name="second" component={Second}/>
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);

function First({}){
    console.log(`[First] render`);
    return (
        <flexboxLayout
            style={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "yellow",
            }}
        >
            <label fontSize={24} text={"You're viewing the first route!"}/>
        </flexboxLayout>
    );
}

function Second({}){
    console.log(`[Second] render`);
    return (
        <flexboxLayout
            style={{
                flexGrow: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "gold",
            }}
        >
            <label fontSize={24} text={"You're viewing the second route!"}/>
        </flexboxLayout>
    );
}

export default hot(AppContainer);