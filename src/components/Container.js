import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

const Container = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/images/bgphoto.jpg")}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default Container;
