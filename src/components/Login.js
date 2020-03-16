import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { classes as cls, View, Text } from "tw";

import Input from "./form/Input";
import Button from "./form/Button";
import Link from "./form/Link";
import FlashBox from "./form/FlashBox";

export function LoginBase({
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

  // const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  // const fgtPasswd = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    clearError
  } = useForm();
  const { username: usernameValue, password: passwordValue } = getValues();

  const onUsernameSubmit = useCallback(() => {
    passwordRef.current.focus();
  }, [passwordRef.current]);

  const onPasswordSubmit = useCallback(
    data => {
      onSubmit(data);
    },
    [handleSubmit]
  );

  useEffect(() => {
    register("username", {
      required: `Un nom d'utilisateur est requis`
    });
    register("password", {
      required: "Un mot de passe est requis"
    });
  }, [register]);

  const submit = useMemo(() => handleSubmit(onPasswordSubmit), [
    handleSubmit,
    onPasswordSubmit
  ]);

  const navigation = useNavigation();

  useEffect(() => {
    const listener = navigation.addListener("focus", () => {
      setValue("username", "");
      setValue("password", "");
      clearError();
      clearSubmissionError();
    });

    return () => navigation.removeListener("focus", listener);
  }, [navigation]);

  useEffect(() => {
    const listener = navigation.addListener("blur", () => {
      setValue("username", "");
      setValue("password", "");
      clearError();
      clearSubmissionError();
    });

    return () => navigation.removeListener("blur", listener);
  }, [navigation]);

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
        <Input
          classes={classes}
          label="Mot de passe"
          placeholder="Mot de passe"
          value={passwordValue}
          onValueChange={value => {
            clearError();
            clearSubmissionError();
            setValue("password", value);
          }}
          onSubmitEditing={submit}
          error={errors && errors.username && errors.password.message}
          inputRef={passwordRef}
          type="password"
          after={
            <Link
              onPress={() =>
                navigation.push("forgot-password", {
                  username: usernameValue
                })
              }
              classes={{
                text: cls`text-xs text-right`
              }}
            >
              Mot de passe oublié ?
            </Link>
          }
        />
        <View style={cls`w-full`}>
          <Button
            onPress={!submissionLoading && submit}
            disabled={submissionLoading}
            loading={submissionLoading}
          >
            Se connecter
          </Button>
        </View>
      </View>

      <View style={cls`w-full m-y2`}>
        <Button outlined onPress={() => navigation.navigate("signup")}>
          Créer un compte
        </Button>
      </View>
    </View>
  );
}
