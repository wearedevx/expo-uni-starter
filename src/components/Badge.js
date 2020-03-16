import React from "react";
import { TouchableOpacity as Touchable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { classes as cls, mergeClasses, View } from "tw";
import { Text } from "./typography";

const CloseIcon = props => <Ionicons name="md-close" {...props} />;

const DEFAULT_CLASSES = {
  container: cls`rounded-full overflow-hidden p1 flex-row items-center m1`,
  image: cls`rounded-full w5 h5`,
  text: cls`text-xs m-x2 ${{ marginVertical: 2 }}`,
  dismiss: cls`rounded-full w5 h5 justify-center items-center m-l1 ${{
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }}`
};

Badge.defaultProps = {
  classes: [],
  image: undefined,
  color: "gray-200",
  imagePosition: "left",
  onDismiss: undefined,
  children: ""
};

export default function Badge({
  classes,
  image,
  color,
  imagePosition,
  onDismiss,
  children
}) {
  const styles = mergeClasses(DEFAULT_CLASSES, classes);

  const bg = `bg-${color}`;

  return (
    <View style={cls`${styles.container} ${bg}`}>
      {image && imagePosition == "left" && image}
      <Text style={styles.text}>{children}</Text>
      {image && imagePosition == "right" && image}
      {onDismiss && (
        <Touchable onPress={onDismiss}>
          <View style={styles.dismiss}>
            <CloseIcon />
          </View>
        </Touchable>
      )}
    </View>
  );
}

Badge.Error = function BadgeError(props) {
  return <Badge color="red-300" {...props} />;
};

Badge.Warning = function BadgeError(props) {
  return <Badge color="orange-300" {...props} />;
};

Badge.Info = function BadgeError(props) {
  return <Badge color="blue-300" {...props} />;
};

Badge.Success = function BadgeError(props) {
  return <Badge color="green-300" {...props} />;
};
