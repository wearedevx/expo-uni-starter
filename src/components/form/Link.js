import React from "react";
import { View as RNView, TouchableOpacity as Touchable } from "react-native";

import { classes as cls, mergeClasses, Text } from "tw";

const DEFAULT_CLASSES = {
  text: cls`text-blue-600 p-t2 p-b4 hover:underline`,
  disabled: cls`opacity-50`
};

/**
 * Like a button, without background, no uppercase. On web, underlines on hover.
 * Mostly intended for navigation.
 *
 * @param {Object} props
 * @param {string} props.children       Text content
 * @param {Function} [props.onPress]    Action on click/press
 * @param {{ text?: [], disabled?: []}} [props.classes] style overrides
 *
 * @return {React.ReactNode}
 */
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
