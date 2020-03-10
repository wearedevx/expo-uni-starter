import React, { useRef, useEffect, useCallback, useMemo } from "react";
import {
  View as RNView,
  TouchableOpacity as Touchable,
  ActivityIndicator
} from "react-native";
import { useForm } from "react-hook-form";

import { classes as cls, View, Text } from "../tw";

import Input from "./Input";
import Button from "./Button";
import Link from "./Link";
import FlashBox from "./FlashBox";

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

  const { register, handleSubmit, setValue, errors, clearError } = useForm();

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
      required: `Vous devez entrer un nom d'utilisateur`
    });
    register("password", {
      required: "Vous devez entrer un mot de passe"
    });
  }, [register]);

  const submit = useMemo(() => handleSubmit(onPasswordSubmit), [
    handleSubmit,
    onPasswordSubmit
  ]);

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
        <Button outlined>Créer un compte</Button>
      </View>
    </View>
  );
}
