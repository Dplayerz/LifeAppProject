import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../src/firebase/firebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      console.log("Logged in user ID:", uid);

      // Pass the user ID to your Explore page via router params or context
      router.replace("/(tabs)/Badges");
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/LoginBackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 32, color: "#222" },
  input: {
    width: "100%",
    maxWidth: 340,
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: { width: "100%", maxWidth: 340, height: 48, backgroundColor: "#007AFF", borderRadius: 8, alignItems: "center", justifyContent: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
