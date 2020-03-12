import React, { useState, useEffect } from "react";
import { TouchableOpacity as Touchable } from "react-native";

import { Feather } from "@expo/vector-icons";

import { classes as cls, getColor, View } from "../../tw";
import Stack from "../layout/Stack";

import { Text } from "../typography";

const iconStyle = disabled => cls`m1 ${{ opacity: disabled ? 0.5 : 1 }}`;

const Unchecked = ({ color, disabled }) => (
  <Feather name="circle" color={color} style={iconStyle(disabled)} size={22} />
);
const Checked = ({ color, disabled }) => (
  <Feather name="check-circle" color={color} style={iconStyle(disabled)} size={22} />
);

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
  checked,
  disabled,
  value,
  label,
  labelPosition,
  error,
  onCheckChange
}) {
  if (!value) {
    throw new Error("RadioButton button must have a value");
  }

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

function RadioGroup({ value, onValueChange, children }) {
  let [currentValue, setCurrentValue] = useState(value);
  console.log("RadioGroup -> currentValue", currentValue);

  useEffect(() => {
    if (currentValue !== value) {
      setCurrentValue(value);
    }
  }, [currentValue, value, setCurrentValue]);

  console.log("chilren", children);

  return (
    <View>
      {children.map((Child, idx) => {
        console.log(Child);
        console.log(
          "RadioGroup -> Child.props.value === currentValue",
          Child.props.value,
          currentValue,
          Child.props.value === currentValue
        );

        return (
          <Child.type
            {...Child.props}
            key={`${value}_${idx}`}
            checked={Child.props.value === currentValue}
            onCheckChange={() => {
              console.log("RadioGroup -> Child.props", Child.props);
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
