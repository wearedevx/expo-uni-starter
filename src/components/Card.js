import React from "react";
import { Image } from "react-native";

import { classes as cls, View } from "tw";
import { Text } from "components/typography";
import Button from "components/form/Button";

const imagePlaceholder = require("assets/placeholder.png");

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

/**
 * Cards are used to group information about subjects and their related actions.
 *
 * Use the set of sub-components (`Card.Title`, `Card.Content`, ...) to allow for consistent appearance
 * accross the application without worrying about content structure.
 *
 * Free-form card content can also be built using only `Card.Content`.
 *
 * @param {Object} props
 * @param {"vertical"|"horizontal"} [props.direction="horizontal"]
 * @param {Array|Object} [props.style]
 * @param {React.ReactNode|React.ReactNode[]} props.children
 *
 * @return {React.ReactNode}
 */
export default function Card({ style, direction, children }) {
  // Style needs to be relative to place TopActions
  const styles = cls`relative ${getDefault(direction).container} ${style}`;

  // Validate Children
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

  // Impose parent direction to children
  // TODO: Find a way to avoid re-renders of all children
  children = children.map(child => {
    const Child = child.type;

    const props = { ...child.props, direction };

    return <Child {...props} />;
  });

  // Extract children
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

/**
 * Card Title
 *
 * @param {Object} props
 * @param {string} props.children Text content
 * @param {Object|Array} [props.style]
 * @param {"vertical"|"horizontal"} [props.direction] do not set, will be overwritten by Card parent
 *
 * @return {React.ReactNode}
 */
Card.Title = function CardTitle({ style, direction, children }) {
  const styles = cls`${getDefault(direction).title} ${style}`;

  return <Text style={styles}>{children}</Text>;
};

Card.Title.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

/**
 * Card Image
 *
 * @param {Object} props
 * @param {string} props.source Path or Url to the image
 * @param {Object|Array} [props.style]
 * @param {"vertical"|"horizontal"} [props.direction] do not set, will be overwritten by Card parent
 *
 * @return {React.ReactNode}
 */
// TODO: Place holder on error
Card.Image = function CardImage({ style, direction, source }) {
  const styles = cls`${getDefault(direction).image} ${style}`;

  return <Image source={source} style={styles} />;
};

Card.Image.defaultProps = {
  style: [],
  direction: "horizontal",
  source: imagePlaceholder // TODO: place holder
};

/**
 * Card Content.
 * Only required sub component for cards.
 * Accepts any content but strings. Allows for free form cards
 *
 * @param {Object} props
 * @param {React.ReactNode|React.ReactNode[]} props.children Card content
 * @param {Object|Array} [props.style]
 * @param {"vertical"|"horizontal"} [props.direction] do not set, will be overwritten by Card parent
 *
 * @return {React.ReactNode}
 */
Card.Content = function CardContent({ style, direction, children }) {
  const styles = cls`${getDefault(direction).content} ${style}`;

  return <View style={styles}>{children}</View>;
};

Card.Content.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

/**
 * Zone of a card meant for secondary actions such as
 * display a menu, add to favs, etc
 *
 * @param {Object} props
 * @param {React.ReactNode|React.ReactNode[]} props.children Card content
 * @param {Object|Array} [props.style]
 * @param {"vertical"|"horizontal"} [props.direction] do not set, will be overwritten by Card parent
 *
 * @return {React.ReactNode}
 */
Card.TopActions = function CardTopActions({ style, direction, children }) {
  const styles = cls`${getDefault(direction).topActions} ${style}`;

  return <View style={styles}>{children}</View>;
};

Card.TopActions.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

/**
 * Zone of a card with primary actions like, Ok/Cancel, Save...
 * It is recommended to use the `Card.Action` component for consistent
 * styling
 *
 * @param {Object} props
 * @param {React.ReactNode|React.ReactNode[]} props.children Card content
 * @param {Object|Array} [props.style]
 * @param {"vertical"|"horizontal"} [props.direction] do not set, will be overwritten by Card parent
 *
 * @return {React.ReactNode}
 */
Card.Actions = function CardActions({ style, direction, children }) {
  const styles = cls`${getDefault(direction).actions} ${style}`;

  return <View style={styles}>{children}</View>;
};

Card.Actions.defaultProps = {
  style: [],
  direction: "horizontal",
  children: []
};

/**
 * Button for primary actions in cards.
 * Meant to be used in `Card.Actions`
 *
 * @param {Object} props
 * @param {React.ReactNode|React.ReactNode[]} props.children Card content
 * @param {Object|Array} [props.style]
 * @param {"vertical"|"horizontal"} [props.direction] do not set, will be overwritten by Card parent
 *
 * @return {React.ReactNode}
 */
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
