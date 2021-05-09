import * as React from "react";
import { simpleTabViewNavigatorTest } from "./SimpleTabViewNavigator";
import { simpleStackNavigatorTest } from "./SimpleStackNavigator";
import { authFlowStackNavigatorTest } from "./AuthFlowStackNavigator";

// const AppContainer = simpleTabViewNavigatorTest;
// const AppContainer = simpleStackNavigatorTest;
const AppContainer = authFlowStackNavigatorTest;
export default AppContainer;