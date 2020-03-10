import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

import { classes as cls, View, Text } from "../tw";

import Input from "./Input";
import Button from "./Button";
import Link from "./Link";
import FlashBox from "./FlashBox";

export function PasswordForgotBase({
  classes,
  onSubmit,
  submissionError,
  clearSubmissionError,
  submissionLoading
}) {
  classes = classes || {};
  classes.container = classes.container || [];
  classes.control = classes.control || [];
  classes.label = classes.label || [];
  classes.input = classes.input || [];
  classes.helper = classes.helper || [];
  classes.forgottenText = classes.forgottenText || [];

  const route = useRoute();
  const params = route.params || {
    username: ""
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    clearError
  } = useForm({
    defaultValues: {
      username: params.username || ""
    }
  });
  const { username: usernameValue } = getValues();

  const onUsernameSubmit = useCallback(
    data => {
      onSubmit(data);
    },
    [handleSubmit]
  );

  useEffect(() => {
    register("username", {
      required: `Un nom d'utilisateur est requis`
    });
  }, [register]);

  const submit = useMemo(() => handleSubmit(onUsernameSubmit), [
    handleSubmit,
    onUsernameSubmit
  ]);

  const navigation = useNavigation();

  useEffect(() => {
    const listener = navigation.addListener("focus", () => {
      setValue("username", params.username || "");
      clearError();
      clearSubmissionError();
    });

    return () => navigation.removeListener("focus", listener);
  }, [navigation, route]);

  useEffect(() => {
    const listener = navigation.addListener("blur", () => {
      setValue("username", params.username || "");
      clearError();
      clearSubmissionError();
    });

    return () => navigation.removeListener("blur", listener);
  }, [navigation, route]);

  return (
    <View style={[...cls`justify-center items-center`, ...classes.container]}>
      <View style={cls`w-full`}>
        {submissionError && (
          <FlashBox.Error>
            Vérifiez votre nom d'utilisateur ou votre mot de passe
          </FlashBox.Error>
        )}
        <Input
          autoFocus
          classes={classes}
          label="Nom d'utilisateur"
          placeholder="Nom d'utilisateur"
          value={usernameValue}
          onValueChange={value => {
            clearError();
            clearSubmissionError();
            setValue("username", value);
          }}
          onSubmitEditing={onUsernameSubmit}
          error={errors && errors.username && errors.username.message}
        />
        <View style={cls`w-full`}>
          <Button
            onPress={!submissionLoading && submit}
            disabled={submissionLoading}
            loading={submissionLoading}
          >
            Envoyer
          </Button>
        </View>
      </View>

      <View style={cls`w-full m-y2`}>
        <Button outlined onPress={() => navigation.navigate("signin")}>
          Annuler
        </Button>
      </View>
    </View>
  );
}
