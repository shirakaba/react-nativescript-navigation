import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { First, Second } from "./SharedScreens";

const StackNavigator = stackNavigatorFactory();

export const simpleStackNavigatorTest = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="first"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen name="first" component={First} />
            <StackNavigator.Screen name="second" component={Second} />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);
