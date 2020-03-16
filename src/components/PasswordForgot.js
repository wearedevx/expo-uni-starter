import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Animated } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

import { classes as cls, View, Text, AnimatedView } from "tw";

import Input from "./form/Input";
import Button from "./form/Button";
import Link from "./form/Link";
import FlashBox from "./form/FlashBox";

PasswordForgotBase.defaultProps = {
  classes: {},
  sent: false,
  onSubmit: () => {},
  submissionError: null,
  clearSubmissionError: () => {},
  submissionLoading: false
};

export function PasswordForgotBase({
  classes,
  sent,
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

  const [formOpacity] = useState(new Animated.Value(1));
  const [okMessageOpacity] = useState(new Animated.Value(0));
  const [hideForm, setHideform] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(formOpacity, {
        toValue: sent ? 0 : 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(okMessageOpacity, {
        toValue: sent ? 1 : 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      setHideform(sent);
    });
  }, [sent, formOpacity, okMessageOpacity]);

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
    <View style={[...cls``, ...classes.container]}>
      {hideForm == false && (
        <AnimatedView
          style={cls`
          ${{
            opacity: formOpacity,
            zIndex: sent ? -1 : 0
          }}`}
        >
          {submissionError && (
            <FlashBox.Error>
              Nous n'avons pu réinitiliser le mot de passe pour cet utilisateur
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
          <View style={cls`w-full m-y2`}>
            <Button outlined onPress={() => navigation.navigate("signin")}>
              Annuler
            </Button>
          </View>
        </AnimatedView>
      )}
      <AnimatedView
        style={cls`w-full absolute top-0 left-0 right-0
        ${{
          opacity: okMessageOpacity,
          zIndex: sent ? 0 : -1
        }}`}
      >
        <View style={cls`w-full`}>
          <View style={cls`w-full m-y2`}>
            <Text>
              Vous allez très vite recevoir un e-mail contenant un lien pour
              renouveler votre mot de passe
            </Text>
          </View>
          <View style={cls`w-full m-y2`}>
            <Button outlined onPress={() => navigation.navigate("signin")}>
              Retour
            </Button>
          </View>
        </View>
      </AnimatedView>
    </View>
  );
}
