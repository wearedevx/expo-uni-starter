import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native";

import { classes as cls, View, Text, color } from "../tw";

import { Title } from "../components/typography/Title";
import { SignUpBase } from "../components/Signup";

export default function SignupPage() {
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
        <Title>Créez votre compte</Title>
        <SignUpBase
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
