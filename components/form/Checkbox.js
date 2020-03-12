import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";

import { TouchableOpacity as Touchable } from "react-native";

import { classes as cls, mergeClasses, getColor, View } from "../../tw";
import { Text } from "../typography";
import Stack from "../layout/Stack";

const iconStyle = disabled => cls`m1 ${disabled && { opacity: 0.5 }}`;

const Checked = ({ color, disabled }) => (
  <Feather
    name="check-square"
    color={color}
    style={iconStyle(disabled)}
    size={22}
  />
);
const Unchecked = ({ color, disabled }) => (
  <Feather name="square" color={color} style={iconStyle(disabled)} size={22} />
);
const Intermediate = ({ color, disabled }) => (
  <Feather name="minus-square" color={color} style={iconStyle(disabled)} />
);

Checkbox.defaultProps = {
  color: "blue-600",
  checked: false,
  disabled: false,
  label: "",
  labelPosition: "right",
  onCheck: () => {},
  error: null
};

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

export default function Checkbox({
  color,
  checked,
  disabled,
  label,
  labelPosition,
  onCheck,
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
        !disabled &&
        (() => {
          setDisplayChecked(!displayChecked);
          onCheck(!displayChecked);
        })
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
