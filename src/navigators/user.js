import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { withHistory, initialRouteName } from "history";

const Stack = createStackNavigator();

export default function UserManagementNavigator({
  signin,
  signup,
  passwordRenewal
}) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
      {/*
      Unfortunately, Navigators require to have only Screens as direct children
      Therefore, we need to add withHistory to every component on every lines 
     */}
      <Stack.Screen name="signin" component={withHistory(signin)} />
      <Stack.Screen name="signup" component={withHistory(signup)} />
      <Stack.Screen
        name="forgot-password"
        component={withHistory(passwordRenewal)}
      />
    </Stack.Navigator>
  );
}
