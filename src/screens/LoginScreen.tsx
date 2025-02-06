import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/userSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fakeLoginAPI(email, password);

      if (response.success) {
        dispatch(setUserData(response.user));
        await AsyncStorage.setItem("userData", JSON.stringify(response.user));
        navigation.navigate("Home");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error", err);
    }
  };

  const fakeLoginAPI = (email: string, password: string) => {
    return new Promise<{ success: boolean; user: any }>((resolve) => {
      setTimeout(() => {
        if (email === "test@test.com" && password === "password123") {
          resolve({
            success: true,
            user: { id: "1", email, name: "Test User" },
          });
        } else {
          resolve({ success: false, user: null });
        }
      }, 1000);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconButton icon="email-outline" size={100} color="#C2E7FF" />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        mode="outlined"
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button} buttonColor="#C2E7FF" textColor="black" labelStyle={{
        fontSize: 18
      }}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
  },
  error: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default LoginScreen;
