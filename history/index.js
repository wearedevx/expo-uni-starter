import React, { useEffect } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";

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
export function withHistory(Component) {
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
        const name = window.location.pathname.substring(1);

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
let _initialRouteName = "";

if (window && window.history) {
  _initialRouteName = window.location.pathname.substring(1);
}

export const initialRouteName = _initialRouteName;
