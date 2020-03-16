import React, { useMemo, useCallback } from "react";
import {
  View as RNView,
  TouchableOpacity as Touchable,
  ActivityIndicator
} from "react-native";

import { classes as cls, getColor, mergeClasses, View, Text } from "../../tw";

const DEFAULT_CLASSES_PLAIN = {
  container: cls`rounded p-x4 p-y2 border-1 `,
  text: cls``,
  disabled: cls`opacity-50`
};

const DEFAULT_CLASSES_OUTLINED = {
  container: cls` p-x4 p-y2 bg-transparent border rounded border-1`,
  text: cls``,
  disabled: cls`opacity-25`
};

const DEFAULT_CLASSES_INVERT = {
  container: cls` p-x4 p-y2 bg-transparent rounded hover:bg-gray-100`,
  text: cls``,
  disabled: cls`opacity-25`
};

export default function Button({
  classes,
  onPress,
  loading,
  disabled,
  outlined,
  invert,
  uppercase,
  children,
  icon,
  iconPosition,
  color
}) {
  const styles = useMemo(() => {
    let base;

    if (outlined) {
      base = mergeClasses(DEFAULT_CLASSES_OUTLINED, classes);
      const border = `border-${color}`;
      const text = `text-${color}`;

      base.container = cls`${base.container} ${border}`;
      base.text = cls`${base.text} ${text}`;
    } else if (invert) {
      base = mergeClasses(DEFAULT_CLASSES_INVERT, classes);
      const text = `text-${color}`;

      base.container = cls`${base.container}`;
      base.text = cls`${base.text} ${text}`;
    } else {
      base = mergeClasses(DEFAULT_CLASSES_PLAIN, classes);
      const border = `border-${color}`;
      const bg = `bg-${color}`;
      const text = "text-white";

      base.container = cls`${base.container} ${bg} ${border}`;
      base.text = cls`${base.text} ${text}`;
    }

    return base;
  }, [outlined, classes]);

  const doPress = useCallback(() => {
    !disabled && onPress && onPress();
  }, [disabled, onPress]);

  const loaderColor = getColor(outlined ? color : "white");

  return (
    <Touchable onPress={!disabled ? doPress : undefined}>
      <RNView
        // style={cls`bg-blue-600`}
        style={cls`w-auto flex-row justify-center items-center ${
          styles.container
        } ${disabled && styles.disabled}`}
      >
        {(icon || loading) && (
          <View style={cls`m-x2 ${{ width: 22, height: 22 }}`}>
            {iconPosition === "left" && !loading && icon}
            {iconPosition === "left" && loading && (
              <ActivityIndicator color={loaderColor} />
            )}
          </View>
        )}
        {typeof children === "string" ? (
          <Text style={styles.text}>
            {uppercase ? children.toLocaleUpperCase() : children}
          </Text>
        ) : (
          children
        )}
        {(icon || loading) && (
          <View style={cls`m-x2 ${{ width: 22, height: 22 }}`}>
            {iconPosition === "right" && icon}
          </View>
        )}
      </RNView>
    </Touchable>
  );
}

Button.defaultProps = {
  classes: {},
  onPress: () => {},
  disabled: false,
  loading: false,
  outlined: false,
  uppercase: true,
  children: "",
  icon: undefined,
  iconPosition: "left",
  color: "blue-600"
};
