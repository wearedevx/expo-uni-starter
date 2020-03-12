import React, { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
// import { ScrollView } from "react-native";

import { classes as cls, View, ScrollView } from "../tw";
import { useUser } from "../state/stores/user";

import { Title, Subtitle, Text } from "../components/typography";
import Card from "../components/Card";

import LogoutButton from "../components/LogoutButton";
import Badge from "../components/Badge";
import Stack from "../components/layout/Stack";
import Checkbox from "../components/form/Checkbox";
import Radio from "../components/form/Radio";
console.log("Radio", Radio);

const appIcon = require("../assets/icon.png");

export default function HomePage() {
  const token = useUser(({ token }) => token);

  const [radio, setRadio] = useState("first");

  return (
    <ScrollView
      style={cls`flex-1 w-full h-full`}
      contentContainerStyle={cls`m4 items-start justify-start`}
    >
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
              <Checkbox label="This is a checkbox" />
              <Checkbox label="This is a disabled checkbox" disabled />
              <Checkbox label="This is a checkbox" error="With an error !" />

              <Checkbox
                label="This is a checkbox on the left"
                labelPosition="left"
              />

              <Radio.Group value={radio} onValueChange={setRadio}>
                <Radio.Button value="first" label="First Radio button" />
                <Radio.Button value="second" label="Second Radio button" />
              </Radio.Group>
            </Stack>
          </Card.Content>
          <Card.TopActions>
            <View
              style={cls`bg-white shadow-md rounded-full w-12 h-12 justify-center items-center m-l1`}
            >
              <Ionicons name="md-heart-empty" size={24} />
            </View>
            <View
              style={cls`bg-white shadow-md rounded-full w-12 h-12 justify-center items-center`}
            >
              <Ionicons name="md-clock" size={24} />
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
              <Ionicons name="md-heart" size={24} />
            </View>
          </Card.TopActions>
          <Card.Actions>
            <Card.Action>Ok</Card.Action>
            <Card.Action>Annuler</Card.Action>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}
