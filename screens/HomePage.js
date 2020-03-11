import React, { useState, useCallback } from "react";
import { classes as cls, View, Text } from "../tw";
import { useUser } from "../state/stores/user";

import { Title } from "../components/typography/Title";

import LogoutButton from "../components/LogoutButton";

export default function HomePage() {
  const token = useUser(({ token }) => token);

  return (
    <View style={cls`flex-1 w-full h-full p4`}>
      <Title>Compte</Title>
      <Text>{token}</Text>
      <LogoutButton />
    </View>
  );
}
