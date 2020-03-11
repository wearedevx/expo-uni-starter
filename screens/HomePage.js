import React, { useState, useCallback } from "react";
import { classes as cls, View } from "../tw";
import { useUser } from "../state/stores/user";

import { Title, Subtitle, Text } from "../components/typography";

import LogoutButton from "../components/LogoutButton";

export default function HomePage() {
  const token = useUser(({ token }) => token);

  return (
    <View style={cls`flex-1 w-full h-full p4 items-start`}>
      <Title>Compte</Title>
      <Subtitle>Paramétrage du compte</Subtitle>
      <Text>{token}</Text>
      <LogoutButton />
    </View>
  );
}
