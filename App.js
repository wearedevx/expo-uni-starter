import React, { useEffect } from "react";

import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
  useNavigationState
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashLoader from "./components/SplashLoader";

import LoginPage from "./screens/LoginPage";
import SignupPage from "./screens/SignupPage";
import PasswordForgotPage from "./screens/PasswordForgotPage";

import { initialize, useAppLoadingState } from "./state";
import { useUser } from "./state/stores/user";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white"
  }
};

//////////////////////////
// Web History
//////////////////////////

// These are app globals to handle web
// history and address bar
let _navigation;
let _goingBack = false;
let _lastRoute;

/**
 * HOC for web address bar and history management.
 *
 * Currently only one level of navigation is supported.
 */
function withHistory(Component) {
  return function(props) {
    const navigation = useNavigation();

    // set global navigation object when it is available
    useEffect(() => {
      _navigation = navigation;
    }, [navigation]);

    // get routing information (route path etc)
    const [currentRoute, routes] = useNavigationState(state => {
      return [state.routes[state.index], state.routes];
    });

    // When react-navigation changes route
    // update the window.history
    useEffect(() => {
      if (
        !_goingBack &&
        _lastRoute !== currentRoute &&
        window &&
        window.history
      ) {
        console.log("currentRoute", currentRoute);
        window.history.pushState(
          currentRoute.params,
          currentRoute.name,
          currentRoute.name
        );
      } else {
        _goingBack = false;
      }

      _lastRoute = currentRoute;
    }, [currentRoute, _lastRoute]);

    // When the user clicks back or forward
    // refelect the change on react-navigation
    useEffect(() => {
      let listener = _event => {
        console.log("withHistory -> _event", _event);
        const name = window.location.pathname.substring(1);

        console.log("withHistory -> _navigation", _navigation, name);
        if (_navigation) {
          _goingBack = true;
          _navigation.navigate({ name, params: _event.state });
        }
      };

      if (window && window.history) {
        window.addEventListener("popstate", listener);
      }

      return () => {
        if (window && window.history) {
          window.removeEventListener("popstate", listener);
        }
      };
    }, [routes]);

    return <Component {...props} />;
  };
}

// Load te proper route from URL in address bar
let initialRouteName = "";

if (window && window.history) {
  initialRouteName = window.location.pathname.substring(1);
}

/////////////////////////////
// Application
/////////////////////////////

const Stack = createStackNavigator();

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

  if (!appState.loaded) return <SplashLoader />;

  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
        <Stack.Screen name="signin" component={withHistory(LoginPage)} />
        <Stack.Screen name="signup" component={withHistory(SignupPage)} />
        <Stack.Screen
          name="forgot-password"
          component={withHistory(PasswordForgotPage)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
