import React, { useState, useCallback } from "react";
import { Feather } from "@expo/vector-icons";

import { classes as cls, View } from "../tw";
import { useUser } from "../state/stores/user";

import { Title, Subtitle, Text } from "../components/typography";
import Card from "../components/Card";

import LogoutButton from "../components/LogoutButton";
import Badge from "../components/Badge";
import Stack from "../components/layout/Stack";

const appIcon = require("../assets/icon.png");

export default function HomePage() {
  const token = useUser(({ token }) => token);

  return (
    <View style={cls`flex-1 w-full h-full p4 items-start`}>
      <Title>Compte</Title>
      <Subtitle>Paramétrage du compte</Subtitle>
      <Text>{token}</Text>
      <LogoutButton />

      <View style={cls`w-full bg-white`}>
        <Card direction="vertical">
          <Card.Image />
          <Card.Title>Text Card 1</Card.Title>
          <Card.Content>
            <Stack vertical style={cls`w-full`}>
              <Stack horizontal style={cls`w-full flex-wrap`}>
                <Badge>Default Badge</Badge>
                <Badge.Error>Error Badge</Badge.Error>
                <Badge.Warning>Warning Badge</Badge.Warning>
                <Badge.Success>Success Badge</Badge.Success>
                <Badge.Info>Info Badge</Badge.Info>
                <Badge dismissable onDismiss={() => {}}>
                  Item #2
                </Badge>
              </Stack>
              <Text>
                This is a card content test that would otherwise desrve a Lorem
                Ipsum but let's just lose time Writing way too long sentences
              </Text>
            </Stack>
          </Card.Content>
          <Card.TopActions>
            <View
              style={cls`bg-white shadow-md rounded-full w-12 h-12 justify-center items-center m-l1`}
            >
              <Feather name="heart" size={24} />
            </View>
            <View
              style={cls`bg-white shadow-md rounded-full w-12 h-12 justify-center items-center`}
            >
              <Feather name="clock" size={24} />
            </View>
          </Card.TopActions>
          <Card.Actions>
            <Card.Action>Ok</Card.Action>
            <Card.Action>Annuler</Card.Action>
          </Card.Actions>
        </Card>

        <Card direction="horizontal">
          <Card.Title>Text Card 1</Card.Title>
          <Card.Image />
          <Card.Content>
            <Text>
              This is a card content test that would otherwise desrve a Lorem
              Ipsum but let's just lose time Writing way too long sentences
            </Text>
          </Card.Content>
          <Card.TopActions>
            <View
              style={cls`bg-white shadow-md rounded-full w-12 h-12 justify-center items-center`}
            >
              <Feather name="heart" size={24} />
            </View>
          </Card.TopActions>
          <Card.Actions>
            <Card.Action>Ok</Card.Action>
            <Card.Action>Annuler</Card.Action>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
}
