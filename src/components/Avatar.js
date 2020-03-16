import React, { useState } from "react";
import { Image } from "react-native";
import { classes as cls, View } from "tw";

const SIZES = {
  xs: 12,
  sm: 22,
  md: 36,
  lg: 64,
  xl: 128
};

const placeHolder = require("assets/avatar.jpg");

Avatar.defaultProps = {
  size: "md",
  style: cls`rounded-full overflow-hidden bg-gray-300 m-2`
};

export default function Avatar({ image, size, style }) {
  if (typeof size === "string") {
    size = SIZES[size] || SIZES.md;
  }

  const [imageSource, setImageSource] = useState({
    uri: image
  });

  return (
    <View style={cls`${style} ${{ width: size, height: size }}`}>
      <Image
        source={imageSource}
        resizeMode="cover"
        style={{ width: size, height: size }}
        onError={error => {
          setImageSource(placeHolder);
        }}
      />
    </View>
  );
}
