import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native";

import { classes as cls, View, color } from "../tw";

import { Title } from "../components/typography/Title";
import { LoginBase } from "../components/Login";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fakeSubmit = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setError(new Error("Bad Credentials"));
      setLoading(false);
    }, 3000);
  }, [setError, setLoading]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return (
    <SafeAreaView
      style={cls`flex-1 w-full flex-col justify-center items-center`}
    >
      <View style={cls`w64`}>
        <Title>Connexion</Title>
        <LoginBase
          color={color.blue600}
          errorColor={color.red500}
          onSubmit={fakeSubmit}
          submissionError={error}
          clearSubmissionError={clearError}
          submissionLoading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
