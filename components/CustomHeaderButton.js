import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons"; // this is for icons
import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
  // {...props} will forward all the props
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23} // 23 is a good size
      color={Platform.OS == "android" ? "#fff" : Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});
