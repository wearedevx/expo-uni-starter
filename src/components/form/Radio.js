import React, { useState, useEffect } from "react";
import { TouchableOpacity as Touchable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { classes as cls, getColor, View } from "tw";
import Stack from "../layout/Stack";

import { Text } from "../typography";

// Icons
const iconStyle = disabled => cls`m1 ${{ opacity: disabled ? 0.5 : 1 }}`;

const Unchecked = ({ color, disabled }) => (
  <Ionicons
    name="md-radio-button-off"
    color={color}
    style={iconStyle(disabled)}
    size={22}
  />
);
const Checked = ({ color, disabled }) => (
  <Ionicons
    name="md-radio-button-on"
    color={color}
    style={iconStyle(disabled)}
    size={22}
  />
);

// Label

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

// Main Radion Behaviour

RadioButton.defaultProps = {
  color: "blue-600",
  checked: false,
  disabled: false,
  label: "",
  labelPosition: "right",
  error: null,
  onCheckChange: () => {}
};

function RadioButton({
  color,
  value,
  checked,
  disabled,
  label,
  labelPosition,
  error,
  onCheckChange
}) {
  if (!value) throw new Error("RadioButtons must have a value");

  return (
    <Touchable
      style={{ opacity: disabled ? 0.5 : 1 }}
      onPress={
        !disabled &&
        (() => {
          onCheckChange();
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
        {checked ? (
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

// Radio Group

function RadioGroup({ value, onValueChange, children }) {
  let [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (currentValue !== value) {
      setCurrentValue(value);
    }
  }, [currentValue, value, setCurrentValue]);

  return (
    <View>
      {children.map((Child, idx) => {
        return (
          <Child.type
            {...Child.props}
            key={`${value}_${idx}`}
            checked={Child.props.value === currentValue}
            onCheckChange={() => {
              setCurrentValue(Child.props.value);
              onValueChange && onValueChange(Child.props.value);
            }}
          />
        );
      })}
    </View>
  );
}

export default {
  Button: RadioButton,
  Group: RadioGroup
};
