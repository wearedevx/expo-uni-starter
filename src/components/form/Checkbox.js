import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import { TouchableOpacity as Touchable } from "react-native";

import { classes as cls, mergeClasses, getColor, View } from "tw";
import { Text } from "../typography";
import Stack from "../layout/Stack";

//
const iconStyle = disabled => cls`m1 ${disabled && { opacity: 0.5 }}`;

// Icons
const Checked = ({ color, disabled }) => (
  <Ionicons
    name="md-checkbox"
    color={color}
    style={iconStyle(disabled)}
    size={22}
  />
);
const Unchecked = ({ color, disabled }) => (
  <Ionicons
    name="md-square-outline"
    color={color}
    style={iconStyle(disabled)}
    size={22}
  />
);

/**
 * Checkbox label component
 * @param {Object} props
 * @param {string} props.label Main label text
 * @param {string} props.error Error text
 *
 * @return {React.ReactNode}
 */
function Label({ label, error }) {
  return (
    <Stack vertical style={cls`m-t3`}>
      <Text>{label}</Text>
      <View style={cls`h3`}>
        {error && <Text style={cls`text-xs text-red-500`}>{error}</Text>}
      </View>
    </Stack>
  );
}

/**
 * A checkbox component for use in forms
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {Function} props.onCheckChange
 * @param {boolean} [props.checked=false]
 * @param {boolean} [props.disabled=false]
 * @param {string|null}  [props.error=null]
 * @param {"left"|"right"|"top"|"bottom"} [props.labelPosition="right"]
 *
 * @return {React.ReactNode}
 */
export default function Checkbox({
  color,
  checked,
  disabled,
  label,
  labelPosition,
  onCheckChange,
  error
}) {
  const [displayChecked, setDisplayChecked] = useState(checked);

  useEffect(() => {
    setDisplayChecked(checked);
  }, [checked]);

  return (
    <Touchable
      style={{ opacity: disabled ? 0.5 : 1 }}
      onPress={
        !disabled
          ? () => {
              setDisplayChecked(!displayChecked);
              onCheckChange(!displayChecked);
            }
          : undefined
      }
    >
      <Stack
        horizontal={["right", "left"].includes(labelPosition)}
        vertical={["top", "bottom"].includes(labelPosition)}
        style={cls`items-center`}
      >
        {["top", "left"].includes(labelPosition) && (
          <Label label={label} error={error} />
        )}
        {displayChecked ? (
          <Checked color={getColor(color)} disabled={disabled} />
        ) : (
          <Unchecked color={getColor(color)} disabled={disabled} />
        )}
        {["bottom", "right"].includes(labelPosition) && (
          <Label label={label} error={error} />
        )}
      </Stack>
    </Touchable>
  );
}

Checkbox.defaultProps = {
  color: "blue-600",
  checked: false,
  disabled: false,
  label: "",
  labelPosition: "right",
  onCheckChange: () => {},
  error: null
};
