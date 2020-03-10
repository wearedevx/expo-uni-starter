import React from "react";

import { classes as cls, mergeClasses, Text } from "../../tw";

const DEFAULT_CLASSES = {
  text: cls`text-3xl font-bold p-y6`
};

export const Title = ({ classes, children }) => {
  const styles = mergeClasses(DEFAULT_CLASSES, classes);
  return <Text style={styles.text}>{children}</Text>;
};
