import React, { useState, useCallback } from "react";

import { classes as cls, View, color } from "tw";

import { Title } from "components/typography";
import { PasswordForgotBase } from "components/PasswordForgot";

export default function PasswordForgotPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const fakeSubmit = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setSent(true);
      // setError(new Error("Bad Credentials"));
      setLoading(false);
    }, 3000);
  }, [setError, setLoading]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return (
    <View style={cls`flex-1 w-full flex-col justify-center items-center`}>
      <View style={cls`w64 ${{ height: 300 }}`}>
        <Title>Renouvellement de mot de passe</Title>
        <PasswordForgotBase
          sent={sent}
          color={color.blue600}
          errorColor={color.red500}
          onSubmit={fakeSubmit}
          submissionError={error}
          clearSubmissionError={clearError}
          submissionLoading={loading}
        />
      </View>
    </View>
  );
}
