import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { initialize, useAppLoadingState } from "./state";
import UserManagementNavigator from "./navigators/user";
import { useUser } from "./state/stores/user";

import MainNavigator from "./navigators/main";

import SplashLoader from "./components/SplashLoader";

import LoginPage from "./screens/LoginPage";
import SignupPage from "./screens/SignupPage";
import PasswordForgotPage from "./screens/PasswordForgotPage";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white"
  }
};

/////////////////////////////
// Application
/////////////////////////////

export default function App() {
  // Tells whether persisted data is loaded or not
  const appState = useAppLoadingState(({ loading, loaded }) => ({
    loading,
    loaded
  }));

  // Load persisted data from local/async storage
  useEffect(() => {
    initialize();
  }, []);

  const token = useUser(({ token }) => token);

  if (!appState.loaded) return <SplashLoader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer theme={Theme}>
        {token == null ? (
          <UserManagementNavigator
            signin={LoginPage}
            signup={SignupPage}
            passwordRenewal={PasswordForgotPage}
          />
        ) : (
          <MainNavigator />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}
