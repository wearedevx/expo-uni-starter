import React from "react";
import { Feather } from "@expo/vector-icons";

import { classes as cls, color, mergeClasses, View, Text } from "../../tw";

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
    icon: "alert-circle",
    color: color.red500
  },
  warning: {
    icon: "alert-triangle",
    color: color.orange500
  },
  info: {
    icon: "info",
    color: color.blue500
  },
  success: {
    icon: "check-circle",
    color: color.green500
  }
};

export default function FlashBox({ classes, type, children }) {
  const styles = mergeClasses(DEFAULT_CLASSES, classes);

  const { icon, color } = TYPE[type];

  return (
    <View style={cls`${styles.container} ${DEFAULT_CLASSES[type].background}`}>
      <Feather name={icon} color={color} size={16} style={cls`m-r2`} />
      <View collapsable={false} style={cls`flex-1`}>
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
