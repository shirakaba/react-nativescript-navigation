import * as React from "react";
import { simpleTabNavigatorTest } from "./SimpleTabNavigator";
import { simpleStackNavigatorTest } from "./simpleStackNavigator";
import { authFlowStackNavigatorTest } from "./AuthFlowStackNavigator";

// const AppContainer = simpleTabNavigatorTest;
// const AppContainer = simpleStackNavigatorTest;
const AppContainer = authFlowStackNavigatorTest;
export default AppContainer;