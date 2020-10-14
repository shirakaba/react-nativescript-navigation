import * as React from "react";
import { useState } from "react"; 
import { BaseNavigationContainer } from '@react-navigation/core';
// import { default as stackNavigatorFactory } from "react-nativescript-navigation/dist/stack/stackNavigatorFactory";
import { stackNavigatorFactory, tabNavigatorFactory } from "react-nativescript-navigation";

const TabNavigator = tabNavigatorFactory();
const StackNavigator = stackNavigatorFactory();

// WARNING: React Hot Loader is incompatible with React Navigation, as it wraps our Screens in a ProxyFacade!

const tabNavigatorTest = () => (
    <BaseNavigationContainer>
        <TabNavigator.Navigator initialRouteName="first">
            <TabNavigator.Screen name="first" component={First}/>
            <TabNavigator.Screen name="second" component={Second}/>
        </TabNavigator.Navigator>
    </BaseNavigationContainer>
);

const stackNavigatorTest = () => (
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
    userToken: string|null,
};

/**
 * @see https://reactnavigation.org/docs/auth-flow/
 */
const authFlowTest = () => {
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
                                    <StackNavigator.Screen options={{ headerShown: false }} name="login" component={Login} />
                                </>
                            ) :
                            (
                                <>
                                    <StackNavigator.Screen name="home" component={Home} />
                                </>
                            )
                    }
                </StackNavigator.Navigator>
            </BaseNavigationContainer>
        </AuthContext.Provider>
    );
}

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

function Login({ navigation }) {
    const { signIn } = React.useContext(AuthContext);

    function onButtonTap() {
        signIn({ username: "dummy", password: "whatever" });
        // navigation.navigate('home');
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
            <label fontSize={24} text={"Login screen"} />
            <button onTap={onButtonTap} fontSize={24} text={"Log in"} />
        </flexboxLayout>
    );
}

function Home({ navigation }) {
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
            <label fontSize={24} text={"You're logged in!"} />
            <button onTap={onButtonTap} fontSize={24} text={"Log out"} />
        </flexboxLayout>
    );
}

// const AppContainer = tabNavigatorTest;
// const AppContainer = stackNavigatorTest;
const AppContainer = authFlowTest;
export default AppContainer;