import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from "react-nativescript-navigation";

type SimpleStackParamList = {
    first: {},
    second: {},
};


type FirstScreenProps = {
    route: RouteProp<SimpleStackParamList, "first">,
    navigation: NativeStackNavigationProp<SimpleStackParamList, "first">,
}

export function First({ navigation }: FirstScreenProps) {
    function onButtonTap() {
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
            <label fontSize={24} text={"You're viewing the first route!"} />
            <button onTap={onButtonTap} fontSize={24} text={"Go to next route"} />
        </flexboxLayout>
    );
}

type SecondScreenProps = {
    route: RouteProp<SimpleStackParamList, "second">,
    navigation: NativeStackNavigationProp<SimpleStackParamList, "second">,
}

export function Second({ navigation }: SecondScreenProps) {

    function onButtonTap() {
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
            <label fontSize={24} text={"You're viewing the second route!"} />
            <button onTap={onButtonTap} fontSize={24} text={"Go back"} />
        </flexboxLayout>
    );
}