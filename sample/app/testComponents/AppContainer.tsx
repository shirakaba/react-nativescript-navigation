import * as React from "react";
import { simpleTabViewNavigatorTest } from "./SimpleTabViewNavigator";
import { simpleTabsNavigatorTest } from "./SimpleTabsNavigator";
import { simpleStackNavigatorTest } from "./SimpleStackNavigator";
import { authFlowStackNavigatorTest } from "./AuthFlowStackNavigator";

// const AppContainer = simpleTabViewNavigatorTest;
// const AppContainer = simpleTabsNavigatorTest; // BROKEN since NativeScript 7! Help wanted.
// const AppContainer = simpleStackNavigatorTest;
const AppContainer = authFlowStackNavigatorTest;
export default AppContainer;