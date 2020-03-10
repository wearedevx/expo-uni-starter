import React, { useEffect } from "react";

import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
  useNavigationState
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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

const Stack = createStackNavigator();

let _navigation;
let _goingBack = false;
let _lastRoute;

function withHistory(Component) {
  return function(props) {
    const navigation = useNavigation();

    useEffect(() => {
      _navigation = navigation;
    }, [navigation]);

    //

    const [currentRoute, routes] = useNavigationState(state => {
      return [state.routes[state.index], state.routes];
    });

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

let initialRouteName = "";

if (window && window.history) {
  initialRouteName = window.location.pathname.substring(1);
}

export default function App() {
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
