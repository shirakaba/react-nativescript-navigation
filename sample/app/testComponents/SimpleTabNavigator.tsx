import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { tabNavigatorFactory } from "react-nativescript-navigation";
import { First, Second } from "./SharedScreens";

const TabNavigator = tabNavigatorFactory();

export const simpleTabNavigatorTest = () => (
    <BaseNavigationContainer>
        <TabNavigator.Navigator initialRouteName="first">
            <TabNavigator.Screen name="first" component={First} />
            <TabNavigator.Screen name="second" component={Second} />
        </TabNavigator.Navigator>
    </BaseNavigationContainer>
);