import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { classes as cls, color, mergeClasses, View, Text } from "tw";

const DEFAULT_CLASSES = {
  container: cls`w-full rounded p2 m-y2 flex-row justify-right`,
  text: cls``,
  error: {
    background: cls`bg-red-200`,
    text: cls`text-red-500`
  },
  warning: {
    background: cls`bg-orange-200`,
    text: cls`text-orange-500`
  },
  info: {
    background: cls`bg-blue-200`,
    text: cls`text-blue-500`
  },
  success: {
    background: cls`bg-green-200`,
    text: cls`text-green-500`
  }
};

const TYPE = {
  error: {
    icon: "md-alert",
    color: color.red500
  },
  warning: {
    icon: "md-warning",
    color: color.orange500
  },
  info: {
    icon: "md-information-circle",
    color: color.blue500
  },
  success: {
    icon: "md-checkmark-circle",
    color: color.green500
  }
};

/**
 * Displays a contained message, informing the user about the result of a form submission.
 * You can use the `FlashBox.Error`, `FlashBox.Warning`, `FlashBox.Success`, `FlashBox.Info` as shorthands for various types.
 *
 * @param {Object} props
 * @param {string} props.children       FlashBox message
 * @param {string} [props.type="error"]
 */
export default function FlashBox({ classes, type, children }) {
  const styles = mergeClasses(DEFAULT_CLASSES, classes);

  const { icon, color } = TYPE[type];

  return (
    <View style={cls`${styles.container} ${DEFAULT_CLASSES[type].background}`}>
      <Ionicons name={icon} color={color} size={16} style={cls`m-r2`} />
      <View style={cls`flex-1`}>
        <Text style={cls`${styles.text} ${DEFAULT_CLASSES[type].text}`}>
          {children}
        </Text>
      </View>
    </View>
  );
}

FlashBox.Error = props => <FlashBox type="error" {...props} />;
FlashBox.Warning = props => <FlashBox type="warning" {...props} />;
FlashBox.Info = props => <FlashBox type="info" {...props} />;
FlashBox.Success = props => <FlashBox type="success" {...props} />;

FlashBox.defaultProps = {
  type: "error",
  message: "message"
};
