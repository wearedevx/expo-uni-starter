import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { withHistory, initialRouteName } from "history";

import HomePage from "../screens/HomePage";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
      <Stack.Screen name="home" component={withHistory(HomePage)} />
    </Stack.Navigator>
  );
}
