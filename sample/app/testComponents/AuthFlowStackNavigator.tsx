import * as React from "react";
import { useState } from "react";
import { forwardNavOpts } from 'react-nativescript';
import { BaseNavigationContainer, RouteProp } from '@react-navigation/core';
import { stackNavigatorFactory, NativeStackNavigationProp, tabNavigatorFactory } from "react-nativescript-navigation";

const StackNavigator = stackNavigatorFactory();

const AuthContext = React.createContext<{
    signIn: (data: any) => Promise<void>;
    signOut: () => void;
    signUp: (data: any) => Promise<void>;
}>(void 0);

interface Action {
    type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT",
    token?: string,
}
interface AuthState {
    isLoading: boolean,
    isSignout: boolean,
    userToken: string | null,
};

/**
 * @see https://reactnavigation.org/docs/auth-flow/
 */
export const authFlowStackNavigatorTest = () => {
    const [state, dispatch] = React.useReducer<(prevState: AuthState, action: Action) => AuthState>(
        (prevState: AuthState, action: Action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: false, // Nothing to load in this minimal example.
            isSignout: false,
            userToken: null,
        }
    );

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <BaseNavigationContainer>
                <StackNavigator.Navigator
                    initialRouteName="login"
                    screenOptions={{
                        headerShown: true,
                    }}
                >
                    {
                        state.userToken == null ?
                            (
                                <>
                                    <StackNavigator.Screen options={{ headerShown: true }} name="login" component={Login} />
                                    <StackNavigator.Screen options={{ headerShown: true }} name="registration" component={Registration} />
                                </>
                            ) :
                            (
                                <>
                                    <StackNavigator.Screen name="home" component={Home} />
                                    <StackNavigator.Screen name="profile" component={Profile} />
                                </>
                            )
                    }
                </StackNavigator.Navigator>
            </BaseNavigationContainer>
        </AuthContext.Provider>
    );
}

type UnauthorisedStackParamList = {
    login: {};
    registration: {};
};

type AuthorisedStackParamList = {
    home: {},
    profile: {},
};


type LoginScreenProps = {
    route: RouteProp<UnauthorisedStackParamList, "login">,
    navigation: NativeStackNavigationProp<UnauthorisedStackParamList, "login">,
}

function Login({ navigation }: LoginScreenProps) {
    const { signIn } = React.useContext(AuthContext);

    function onSwitchButtonTap(): void {
        navigation.navigate('registration');
    }

    function onLogInButtonTap(): void {
        // forwardNavOpts.push({
        //     clearHistory: true,
        // });
        signIn({ username: "dummy", password: "whatever" });
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
            <label fontSize={24} fontWeight={"bold"} text={"Login Screen"} />
            <button onTap={onSwitchButtonTap} fontSize={24} text={"Switch to registration screen"} />
            <button onTap={onLogInButtonTap} fontSize={24} text={"Log in"} />
        </flexboxLayout>
    );
}


type RegistrationScreenProps = {
    route: RouteProp<UnauthorisedStackParamList, "registration">,
    navigation: NativeStackNavigationProp<UnauthorisedStackParamList, "registration">,
}

function Registration({ navigation }: RegistrationScreenProps) {
    const { signIn } = React.useContext(AuthContext);

    function onSwitchButtonTap(): void {
        navigation.navigate('login');
        // navigation.
    }

    function onRegisterButtonTap(): void {
        // forwardNavOpts.push({
        //     clearHistory: true,
        // });
        signIn({ username: "dummy", password: "whatever" });
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
            <label fontSize={24} fontWeight={"bold"} text={"Registration Screen"} />
            <button onTap={onSwitchButtonTap} fontSize={24} text={"Switch to login screen"} />
            <button onTap={onRegisterButtonTap} fontSize={24} text={"Register"} />
        </flexboxLayout>
    );
}

type HomeScreenProps = {
    route: RouteProp<AuthorisedStackParamList, "home">,
    navigation: NativeStackNavigationProp<AuthorisedStackParamList, "home">,
}

function Home({ navigation }: HomeScreenProps) {
    const { signOut } = React.useContext(AuthContext);

    function onButtonTap() {
        signOut();
        // navigation.navigate('login');
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
            <label fontSize={24} fontWeight={"bold"} text={"Home Screen"} />
            <button onTap={onButtonTap} fontSize={24} text={"Log out"} />
        </flexboxLayout>
    );
}

type ProfileScreenProps = {
    route: RouteProp<AuthorisedStackParamList, "profile">,
    navigation: NativeStackNavigationProp<AuthorisedStackParamList, "profile">,
}

function Profile({ navigation }: ProfileScreenProps) {
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
                backgroundColor: "orange",
            }}
        >
            <label fontSize={24} fontWeight={"bold"} text={"Profile Screen"} />
            <button onTap={onButtonTap} fontSize={24} text={"Go back"} />
        </flexboxLayout>
    );
}
