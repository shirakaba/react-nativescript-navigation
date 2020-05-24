import { hot } from 'react-hot-loader/root';
import * as React from "react";
import {
    createNavigatorFactory,
} from '@react-navigation/core';
/* I get the same errors mentioning "can't resolve 'react-native'" regardless of how I import it :( */
// const { createNavigatorFactory } = require('@react-navigation/native');
import { TabNavigator } from "react-nativescript-navigation";

const navigatorFactory = createNavigatorFactory(TabNavigator);

const AppContainer = () => (
    <flexboxLayout flexDirection={"row"} height={40} backgroundColor={"purple"}>
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
        {/* <button text={"BUTTON"} className={""}/> */}
    </flexboxLayout>
);


export default hot(AppContainer);
// export default AppContainer;