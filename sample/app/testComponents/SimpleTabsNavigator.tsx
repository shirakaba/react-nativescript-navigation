import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { tabsNavigatorFactory } from "react-nativescript-navigation";
import { First, Second } from "./SharedScreens";
import { isIOS } from "@nativescript/core";

const TabNavigator = tabsNavigatorFactory();

export const simpleTabsNavigatorTest = () => (
    <BaseNavigationContainer>
        <TabNavigator.Navigator initialRouteName="first">
            <TabNavigator.Screen options={{ src: isIOS ? "res://tabIcons/help" : "res://help" }} name="first" component={First} />
            <TabNavigator.Screen options={{ src: isIOS ? "res://tabIcons/list" : "res://list" }} name="second" component={Second} />
        </TabNavigator.Navigator>
    </BaseNavigationContainer>
);