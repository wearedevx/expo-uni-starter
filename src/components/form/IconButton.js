import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity as Touchable } from "react-native";

import { classes as cls, View } from "tw";

IconButton.defaultProps = {
  icon: "md-help",
  style: [],
  color: "black",
  size: 22,
  disabled: false,
  circled: false
};

const CIRCLED_STYLE = cls`bg-white shadow-md rounded-full justify-center items-center m-l1`;
const DEFAULT_STYLE = cls`w-12 h-12 justify-center items-center m-l1`;

/**
 * Button with only an icon in it. Useful for `Card.TopActions`
 *
 * @param {Object} props
 * @param {string} props.icon
 * @param {number} [props.size=22]
 * @param {Function} [props.onPress]
 * @param {string} [props.color="black"]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.circled] Wraps the icon in a circle with white background and drop shadow
 *
 * @return {React.ReactNode}
 */
export default function IconButton({
  icon,
  style,
  color,
  size,
  onPress,
  disabled,
  circled
}) {
  return (
    <Touchable onPress={!disabled && onPress}>
      <View
        style={cls`
        ${circled ? CIRCLED_STYLE : DEFAULT_STYLE}
        ${{
          width: (size * 5) / 3,
          height: (size * 5) / 3
        }}
        ${style}
        ${{
          opacity: disabled ? 0.5 : 1
        }}`}
      >
        <Ionicons
          name={icon}
          size={size}
          color={color}
          style={{
            width: size,
            height: size,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        />
      </View>
    </Touchable>
  );
}
