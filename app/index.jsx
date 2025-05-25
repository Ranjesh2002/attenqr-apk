import AsyncStorage from "@react-native-async-storage/async-storage"; // if not already
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "http://127.0.0.1:8000/api";

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/login/`, {
        email,
        password,
      });

      if (response.status === 200) {
        const userData = response.data.user;

        // ✅ Save to AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        alert("Login successful");

        if (role === "teacher") {
          router.push("/teacher/dashboard");
        } else {
          router.push("/student");
        }
      }
    } catch (error) {
      console.log("Login error:", error?.response?.data || error.message);
      alert("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Enter your credentials to access your account
        </Text>

        <View style={styles.roleButtons}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "student" ? styles.active : styles.inactive,
            ]}
            onPress={() => setRole("student")}
          >
            <Text style={styles.roleText}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "teacher" ? styles.active : styles.inactive,
            ]}
            onPress={() => setRole("teacher")}
          >
            <Text style={styles.roleText}>Teacher</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign in as {role}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => router.push("/register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "#6c757d",
    marginBottom: 16,
  },
  roleButtons: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
    justifyContent: "space-between",
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  active: {
    backgroundColor: "#007bff",
  },
  inactive: {
    borderWidth: 1,
    borderColor: "#007bff",
    backgroundColor: "#fff",
  },
  roleText: {
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#6c757d",
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
