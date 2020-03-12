import React from "react";
import { View as RNView, TouchableOpacity as Touchable } from "react-native";

import { classes as cls, mergeClasses, Text } from "../../tw";

const DEFAULT_CLASSES = {
  text: cls`text-blue-600 p-t2 p-b4 hover:underline`,
  text: cls`text-blue-600 p-t2 p-b4 hover:underline`,
  disabled: cls`opacity-50`
};

export default function Link({ classes, disabled, onPress, children }) {
  const styles = mergeClasses(DEFAULT_CLASSES, classes);

  return (
    <Touchable onPress={onPress}>
      <RNView>
        <Text style={cls`${styles.text} ${disabled && styles.diabled}`}>
          {children}
        </Text>
      </RNView>
    </Touchable>
  );
}

Link.defaultProps = {
  classes: [],
  disabled: false,
  children: ""
};
