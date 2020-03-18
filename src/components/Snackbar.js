import React, { useState, useEffect, useCallback } from "react";
import {
  Animated,
  TouchableOpacity as Touchable,
  SafeAreaView
} from "react-native";

import { classes as cls, getColor, AnimatedView as View } from "tw";
import { Text } from "./typography";
import Portal from "./portal/Portal";

Snackbar.defaultProps = {
  visible: false,
  onDismiss: () => {},
  text: "",
  actions: [],
  duration: 5000
};

/**
 * A Toast-like, Snackbar component inspired by Google's Material Design.
 * Uses Portal.
 *
 * @param {Object} props
 * @param {boolean} props.visible         set to `true` to show the Snackbar
 * @param {() => void} [props.onDismiss]  Called when the Snackbar is dismissed (when it hides)
 * @param {number} [props.duration=5000]  How long it should remain visible
 * @param {{text: string, color?: string, onPress?: () => void}[]} [props.actions=[]] Actionable buttons on the right of the Snackbar
 *
 * @return {React.ReactNode}
 */
export default function Snackbar({
  visible,
  children,
  onDismiss,
  actions,
  duration
}) {
  const [opacity] = useState(new Animated.Value(visible ? 1 : 0));
  const [isVisible, setIsVisible] = useState(visible);

  const hide = useCallback(() => {
    function _doHide() {
      console.log("hide -> isVisible", isVisible);
      // if (isVisible) {
      Animated.timing(opacity, {
        toValue: 0.0,
        duration: 600,
        useNativeDriver: true
      }).start(() => {
        setIsVisible(false);
        onDismiss();
      });
    }

    _doHide();
    // }
  }, [opacity, isVisible, setIsVisible, onDismiss]);

  const makeVisible = useCallback(() => {
    console.log("makeVisible -> isVisible", isVisible);
    if (!isVisible) {
      Animated.timing(opacity, {
        toValue: 1.0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        setIsVisible(true);
      });

      setTimeout(() => {
        hide();
      }, duration || 5000);
    }
  }, [opacity, isVisible, duration, setIsVisible, hide]);

  useEffect(() => {
    console.log("visible", visible);
    if (visible) {
      makeVisible();
    } else {
      hide();
    }
  }, [visible]);

  return (
    <Portal>
      <View
        style={cls`bg-black p6 ${{ opacity }} shadow-lg`}
        pointerEvents={isVisible ? "auto" : "none"}
      >
        <SafeAreaView style={cls`flex-row w-full `}>
          <Text style={cls`text-white flex-1`}>{children}</Text>
          {actions.map(props => (
            <SnackAction {...props} />
          ))}
        </SafeAreaView>
      </View>
    </Portal>
  );
}

Snackbar.defaultProps = {
  color: getColor("blue-600"),
  onPress: () => {}
};

function SnackAction({ text, color, onPress }) {
  if (!text) {
    throw new Error("SnackBar actions require a text property");
  }

  console.log("SNACK ACTION", text, getColor("blue-600"), onPress);

  return (
    <Touchable onPress={onPress}>
      <Text style={cls`font-bold ${{ color: color || getColor("blue-600") }}`}>
        {text.toUpperCase()}
      </Text>
    </Touchable>
  );
}
