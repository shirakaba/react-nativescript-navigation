import { hot } from 'react-hot-loader/root';
import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
// import { NavigationContainer } from '@react-navigation/native';
import { default as tabNavigatorFactory } from "react-nativescript-navigation";

const TabNavigator = tabNavigatorFactory();

const AppContainer = () => (
    <BaseNavigationContainer>
        <TabNavigator.Navigator initialRouteName="first">
            <TabNavigator.Screen name="first">
                {renderFirst}
            </TabNavigator.Screen>
            <TabNavigator.Screen name="second">
                {renderSecond}
            </TabNavigator.Screen>
        </TabNavigator.Navigator>
    </BaseNavigationContainer>
);

function First({}){
    return (
        <flexboxLayout flexDirection={"row"} flexGrow={1} backgroundColor={"purple"}>
            <flexboxLayout
                backgroundColor={"green"}
                flexDirection={"column"}
                flexGrow={1}
                paddingTop={7}
                // position={"absolute"}
                alignItems={"center"}
            >
                <label text={"LABEL"}/>
            </flexboxLayout>
            <flexboxLayout
                backgroundColor={"blue"}
                flexDirection={"column"}
            >
                <button text={"BUTTON"} className={""}/>
            </flexboxLayout>
        </flexboxLayout>
    );
}

function Second({}){
    return (
        <flexboxLayout flexDirection={"row"} flexGrow={1} backgroundColor={"purple"}>
            <flexboxLayout
                backgroundColor={"orange"}
                flexDirection={"column"}
                flexGrow={1}
                paddingTop={7}
                // position={"absolute"}
                alignItems={"center"}
            >
                <label text={"Some other label"}/>
            </flexboxLayout>
            <flexboxLayout
                backgroundColor={"yellow"}
                flexDirection={"column"}
            >
                <button text={"Another button"} className={""}/>
            </flexboxLayout>
        </flexboxLayout>
    );
}

function renderFirst(){
    return <First/>;
}

function renderSecond(){
    return <Second/>;
}

export default hot(AppContainer);
// export default AppContainer;