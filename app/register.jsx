import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import api from "../utils/api";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (role === "student" && (!studentId || !department || !year)) {
      Alert.alert("Error", "All student field is required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/register/", {
        name,
        email,
        password,
        confirmPassword,
        role,
        studentId,
        department,
        year,
      });

      Alert.alert("success", response.data.message);
      router.push("/");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Account Type</Text>
      <View style={styles.radioGrp}>
        <View style={styles.radioItem}>
          <RadioButton
            value="student"
            status={role === "student" ? "checked" : "unchecked"}
            onPress={() => setRole("student")}
          />
          <Text>Student</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton
            value="teacher"
            status={role === "teacher" ? "checked" : "unchecked"}
            onPress={() => setRole("teacher")}
          />
          <Text>Teacher</Text>
        </View>
      </View>

      {role === "student" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
          />
          <TextInput
            style={styles.input}
            placeholder="Department"
            value={department}
            onChangeText={setDepartment}
          />
          <TextInput
            style={styles.input}
            placeholder="Year"
            value={year}
            onChangeText={setYear}
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.loginlink}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  radioGrp: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  loginlink: {
    color: "#007bff",
    marginTop: 16,
    textAlign: "center",
  },
});
