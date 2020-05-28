import { hot } from 'react-hot-loader/root';
import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { default as tabNavigatorFactory } from "react-nativescript-navigation/dist/tabNavigatorFactory";

const TabNavigator = tabNavigatorFactory();

const AppContainer = () => (
    <BaseNavigationContainer>
        <TabNavigator.Navigator initialRouteName="first">
            <TabNavigator.Screen name="first" component={First}/>
            <TabNavigator.Screen name="second" component={Second}/>
        </TabNavigator.Navigator>
    </BaseNavigationContainer>
);

function First({}){
    console.log(`[First] render`);
    return (
        <flexboxLayout
            style={{
                flexGrow: 1,
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