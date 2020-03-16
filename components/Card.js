import React from "react";
import { Image } from "react-native";

import { classes as cls, mergeClasses, View } from "../tw";
import { Text } from "../components/typography";
import Button from "../components/form/Button";

const imagePlaceholder = require("../assets/placeholder.png");

const DEFAULT_CLASSES_HORIZONTAL = {
  container: cls`rounded shadow-md bg-white flex-row m-y3 overflow-hidden border border-gray-200 justify-stretch`,
  title: cls`text-xl text-gray-900 p-x2 p-y4`,
  image: cls`h-auto w-1/3`,
  content: cls`flex-column p-x2 p-b4`,
  contentContainer: cls`w-2/3`,
  topActions: cls`flex-row-reverse absolute top-0 right-0 p2`,
  actions: cls`flex-row-reverse justify-start`
};

const DEFAULT_CLASSES_VERTICAL = {
  container: cls`rounded shadow-md z-50 bg-white flex-column m-y3 overflow-hidden border border-gray-200`,
  title: cls`text-xl text-gray-900 w-full p-x2 p-y4`,
  image: cls`w-full ${{ height: 120 }}`,
  content: cls`flex-column p-x2 p-b4`,
  contentContainer: cls`w-full`,
  topActions: cls`flex-row-reverse absolute top-0 right-0 p2`,
  actions: cls`flex-row-reverse justify-start`
};

function getDefault(direction) {
  return direction === "vertical"
    ? DEFAULT_CLASSES_VERTICAL
    : DEFAULT_CLASSES_HORIZONTAL;
}

export default function Card({ style, direction, children }) {
  const styles = cls`relative ${getDefault(direction).container} ${style}`;
  const defaultContentStyle = getDefault(direction).contentContainer;

  if (
    children.some(child => {
      return ![
        Card.Title,
        Card.Content,
        Card.Image,
        Card.TopActions,
        Card.Actions
      ].includes(child.type);
    })
  ) {
    throw new Error(
      `Card component only accept Card.Title, Card.Image, Card.Content, Card.Actions or Card.TopActions as direct children`
    );
  }

  children = children.map(child => {
    const Child = child.type;

    const props = { ...child.props, direction };

    return <Child {...props} />;
  });

  const Title = children.find(child => child.type === Card.Title);
  const Content = children.find(child => child.type === Card.Content);
  const Image = children.find(child => child.type === Card.Image);
  const TopActions = children.find(child => child.type === Card.TopActions);
  const Actions = children.find(child => child.type === Card.Actions);

  const contentWidth =
    direction === "vertical" ? cls`w-full` : Image ? cls`w-2/3` : cls`w-full`;

  const contentStyles = cls`relative ${
    getDefault(direction).contentContainer
  } ${contentWidth}`;

  return (
    <View style={styles}>
      {Image && <Image.type {...Image.props} direction={direction} />}
      <View style={cls`flex-column ${contentStyles}`}>
        {Title && <Title.type {...Title.props} direction={direction} />}
        {Content && <Content.type {...Content.props} direction={direction} />}
        {Actions && <Actions.type {...Actions.props} direction={direction} />}
      </View>
      {TopActions && (
        <TopActions.type {...TopActions.props} direction={direction} />
      )}
    </View>
  );
}

Card.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

Card.Title = function CardTitle({ style, direction, children }) {
  const styles = cls`${getDefault(direction).title} ${style}`;

  return <Text style={styles}>{children}</Text>;
};

Card.Title.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

Card.Image = function CardImage({ style, direction, source }) {
  const styles = cls`${getDefault(direction).image} ${style}`;

  return <Image source={source} style={styles} />;
};

Card.Image.defaultProps = {
  style: [],
  direction: "horizontal",
  source: imagePlaceholder // TODO: place holder
};

Card.Content = function CardContent({ style, direction, children }) {
  const styles = cls`${getDefault(direction).content} ${style}`;

  return <View style={styles}>{children}</View>;
};

Card.Content.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

Card.TopActions = function CardTopActions({ style, direction, children }) {
  const styles = cls`${getDefault(direction).topActions} ${style}`;

  return <View style={styles}>{children}</View>;
};

Card.TopActions.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

Card.Actions = function CardActions({ style, direction, children }) {
  const styles = cls`${getDefault(direction).actions} ${style}`;

  return <View style={styles}>{children}</View>;
};

Card.Actions.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

Card.Action = function CardAction({ classes, onPress, children }) {
  return (
    <Button invert classes={classes} onPress={onPress}>
      {children}
    </Button>
  );
};

Card.Action.defaultProps = {
  classes: {},
  onPress: () => {},
  children: []
};
