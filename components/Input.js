import React from "react";
import { classes as cls, View, Text, TextInput, color } from "../tw";

const DEFAULT_CLASSES = {
  control: cls`m-b4`,
  label: cls`text-gray-700`,
  input: cls`border border-gray-400 rounded p-x1 p-y2 m-y1 focus:border-gray-500`,
  errorInput: cls`border-red-500`,
  helper: cls`text-xs`,
  errorText: cls`text-red-500`,
  forgottenText: cls`text-xs hover:underline w-full text-right`
};

function mergeClasses(classes = {}) {
  return Object.keys(DEFAULT_CLASSES).reduce((acc, key) => {
    acc[key] = cls`${DEFAULT_CLASSES[key]} ${classes[key]}`;

    return acc;
  }, {});
}

export default function Input({
  classes,
  label,
  autoFocus,
  onValueChange,
  onSubmitEditing,
  placeholder,
  error,
  inputRef,
  type,
  after
}) {
  let isSecure = type === "password";
  let styles = mergeClasses(classes);

  return (
    <View style={cls`w-full ${styles.control}`}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        autoFocus={autoFocus}
        ref={inputRef}
        autoCapitalize={"none"}
        textContentType={type}
        secureTextEntry={isSecure}
        style={cls`${styles.input} ${error && styles.errorInput}`}
        onChangeText={onValueChange}
        placeholder={placeholder}
        placeholderTextColor={color.gray400}
        onSubmitEditing={onSubmitEditing}
      />
      {error && (
        <Text style={cls`${styles.helper} ${styles.errorText}`}>{error}</Text>
      )}
      {after}
    </View>
  );
}

const NO_OP = () => {};

Input.defaultProps = {
  classes: {},
  label: undefined,
  autoFocus: false,
  onValueChange: NO_OP,
  onSubmitEditing: NO_OP,
  placeholder: "",
  error: false,
  inputRef: undefined,
  type: "none",
  after: undefined
};
