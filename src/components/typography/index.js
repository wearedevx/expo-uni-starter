import React from "react";

import { classes as cls, Text as TWText } from "tw";

const DEFAULT_PROPS = {
  style: [],
  children: ""
};

export const Title = ({ style, children }) => {
  const styles = cls`text-3xl font-bold p-y4 text-gray-900 ${style}`;
  return <TWText style={styles}>{children}</TWText>;
};

Title.defaultProps = DEFAULT_PROPS;

export const Subtitle = ({ style, children }) => {
  const styles = cls`text-2xl font-bold p-y2 text-gray-500 ${style}`;

  return <TWText style={styles}>{children}</TWText>;
};

Subtitle.defaultProps = DEFAULT_PROPS;

export const Bold = ({ style, children }) => {
  const styles = cls`font-bold text-gray-900 ${style}`;

  return <TWText style={styles}>{children}</TWText>;
};

Bold.defaultProps = DEFAULT_PROPS;

export const Text = ({ style, children }) => {
  const styles = cls`text-gray-900 ${style}`;

  return <TWText style={styles}>{children}</TWText>;
};

Text.defaultProps = DEFAULT_PROPS;

export const Caption = ({ style, children }) => {
  const styles = cls`text-gray-500 text-sm ${style}`;

  return <TWText style={styles}>{children}</TWText>;
};

Caption.defaultProps = DEFAULT_PROPS;
