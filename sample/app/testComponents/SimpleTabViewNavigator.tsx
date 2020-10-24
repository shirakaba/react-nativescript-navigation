import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { tabViewNavigatorFactory } from "react-nativescript-navigation";
import { First, Second } from "./SharedScreens";
import { isIOS } from "@nativescript/core";

const TabNavigator = tabViewNavigatorFactory();

export const simpleTabViewNavigatorTest = () => (
    <BaseNavigationContainer>
        <TabNavigator.Navigator
            initialRouteName="first"
        >
            <TabNavigator.Screen options={{ iconSource: isIOS ? "res://tabIcons/help" : "res://help" }} name="first" component={First} />
            <TabNavigator.Screen options={{ iconSource: isIOS ? "res://tabIcons/list" : "res://list" }} name="second" component={Second} />
        </TabNavigator.Navigator>
    </BaseNavigationContainer>
);