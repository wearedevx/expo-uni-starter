import React, { useState } from "react";

import { classes as cls, getColor, View, ScrollView } from "tw";
import { useUser } from "src/stores/user";

import { Title, Subtitle, Text } from "components/typography";
import Card from "components/Card";

import LogoutButton from "components/LogoutButton";
import Badge from "components/Badge";
import Stack from "components/layout/Stack";
import Checkbox from "components/form/Checkbox";
import Radio from "components/form/Radio";
import IconButton from "components/form/IconButton";
import Avatar from "components/Avatar";

import Snackbar from "components/Snackbar";

export default function HomePage() {
  const token = useUser(({ token }) => token);

  const [radio, setRadio] = useState("first");

  const [showSnack, setShowSnack] = useState(false);
  console.log("HomePage -> showSnack", showSnack);

  return (
    <ScrollView
      style={cls`flex-1 w-full h-full`}
      contentContainerStyle={cls`m4 items-start justify-start`}
    >
      <Title>Compte</Title>
      <Subtitle>Paramétrage du compte</Subtitle>
      <Text>{token}</Text>
      <LogoutButton />
      <Avatar image="http://404.com/sdkjsdf.jpg" />

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
            <IconButton circled icon="md-heart-empty" />
            <IconButton
              circled
              icon="md-thumbs-up"
              color={getColor("blue-600")}
            />
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
            <IconButton circled icon="md-heart" color={getColor("red-500")} />
          </Card.TopActions>
          <Card.Actions>
            <Card.Action
              onPress={() => {
                console.log("Pressed OK");
                setShowSnack(true);
              }}
            >
              Ok
            </Card.Action>
            <Card.Action>Annuler</Card.Action>
          </Card.Actions>
        </Card>

        <Snackbar
          visible={showSnack}
          onDismiss={() => setShowSnack(false)}
          actions={[
            {
              text: "undo"
            }
          ]}
        >
          Hello snackbar
        </Snackbar>
      </View>
    </ScrollView>
  );
}
