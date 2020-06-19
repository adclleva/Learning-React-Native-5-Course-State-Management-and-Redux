import React, { Children } from "react";
import { StyleSheet, Text, View } from "react-native";

const DefaultText = (props) => {
  const { children } = props;

  return <Text style={styles.text}>{children}</Text>;
};

export default DefaultText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});
