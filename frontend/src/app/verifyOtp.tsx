import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";


export default function VerifyOtp() {

  const { email } =
    useLocalSearchParams();

  const [otp, setOtp] =
    useState("");


  const handleVerify = async () => {

    if (!otp || otp.length !== 6) {

      Alert.alert(
        "Error",
        "Please enter OTP"
      );

      return;
    }


    try {

      const response = await fetch(
        "http://192.168.0.102:9000/api/auth/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );


      const data =
        await response.json();


      console.log(
        "Verify response:",
        data
      );


      if (response.ok) {

        Alert.alert(
          "Success",
          "Registration successful!",
          [
            {
              text: "OK",

              onPress: () =>
                router.replace(
                  "./login"
                ),
            },
          ]
        );


      } else {

        Alert.alert(
          "Error",
          data.error ||
          "Invalid OTP"
        );

      }


    } catch (error) {

      console.error(
        "OTP verification error:",
        error
      );

      Alert.alert(
        "Error",
        "Could not connect to backend"
      );

    }
  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Verify Your Email
      </Text>


      <Text style={styles.subtitle}>
        We sent a 6-digit OTP to
      </Text>


      <Text style={styles.email}>
        {email}
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />


      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
      >

        <Text style={styles.buttonText}>
          Verify OTP
        </Text>

      </TouchableOpacity>

    </View>
  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#FFFFFF",
  },


  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },


  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },


  email: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },


  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 5,
    marginBottom: 20,
  },


  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: "#0d2a69",
    justifyContent: "center",
    alignItems: "center",
  },


  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

});