import React, { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { initialize, useAppLoadingState } from "state";
import UserManagementNavigator from "src/navigators/user";
import { useUser } from "src/stores/user";

import MainNavigator from "src/navigators/main";

import SplashLoader from "components/SplashLoader";
import Portal from "components/portal/Portal";

import LoginPage from "src/screens/LoginPage";
import SignupPage from "src/screens/SignupPage";
import PasswordForgotPage from "src/screens/PasswordForgotPage";

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
    <Portal.Host>
      <SafeAreaView
        style={{ width: "100%", height: "100%", backgroundColor: "white" }}
      >
        <NavigationContainer theme={Theme}>
          {token == null ? (
            <UserManagementNavigator
              signin={LoginPage}
              signup={SignupPage}
              passwordRenewal={PasswordForgotPage}
            />
          ) : (
            // That's the main Application navigation
            // after the user logged in
            <MainNavigator />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </Portal.Host>
  );
}
