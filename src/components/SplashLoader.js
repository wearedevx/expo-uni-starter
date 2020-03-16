import React from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { classes as cls, getColor, View } from "tw";

const DEFAULT_CLASSES = {
  container: cls`flex-1 w-full h-full bg-white justify-center items-center`
};

export default function SplashLoader({ color }) {
  return (
    <SafeAreaView style={DEFAULT_CLASSES.container}>
      <View style={DEFAULT_CLASSES.container}>
        <ActivityIndicator size="large" color={getColor(color)} />
      </View>
    </SafeAreaView>
  );
}

SplashLoader.defaultProps = {
  color: "blue-600"
};
