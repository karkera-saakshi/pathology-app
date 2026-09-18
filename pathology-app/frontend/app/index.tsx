import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("./register");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  logo: {
    width: 220,
    height: 220,
  },
});