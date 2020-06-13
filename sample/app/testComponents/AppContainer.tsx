import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
// import { default as stackNavigatorFactory } from "react-nativescript-navigation/dist/stack/stackNavigatorFactory";
import { stackNavigatorFactory, tabNavigatorFactory } from "react-nativescript-navigation";

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

export default AppContainer;