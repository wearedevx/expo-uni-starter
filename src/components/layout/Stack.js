import React from "react";
import { classes as cls, View } from "tw";

Stack.defaultProps = {
  style: [],
  vertical: false,
  horizontal: false,
  flex: false
};

/**
 * Pile components Horizontally or Vertically.
 * Careful! The component will throw if `vertical` and `horizontal` props
 * have the same value.
 *
 * @param {Object} props
 * @param {boolean} [props.vertical=false]
 * @param {boolean} [props.horizontal=false]
 * @param {boolean} [props.flex=false]  Set flex = 1
 * @param {string|React.ReactNode|React.ReactNode[]} props.children
 *
 * @return {React.ReactNode}
 */
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
