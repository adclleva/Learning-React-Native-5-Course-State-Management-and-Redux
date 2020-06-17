import React, { Children } from "react";
import { StyleSheet, Text, View } from "react-native";

const DefaultText = (props) => {
  const { children, style } = props;

  return <Text style={{ ...styles.text, style }}>{children}</Text>;
};

export default DefaultText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});
