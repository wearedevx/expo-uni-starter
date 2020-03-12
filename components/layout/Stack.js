import React from "react";
import { classes as cls, View } from "../../tw";

Stack.defaultProps = {
  style: [],
  vertical: false,
  horizontal: false,
  flex: false
};

export default function Stack({ style, vertical, horizontal, flex, children }) {
  if (vertical == horizontal) {
    console.warn(
      new Error(
        "Stack must be either vertical or horizontal, not both nor neither"
      )
    );

    vertical = true;
    horizontal = false;
  }

  const composedStyle = cls`${{
    flexDirection: horizontal ? "row" : "column",
    flex: flex ? 1 : null
  }} ${style}`;

  return <View style={composedStyle}>{children}</View>;
}
