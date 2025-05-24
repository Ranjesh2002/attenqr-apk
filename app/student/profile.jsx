import React from "react";
import { View, Text } from "react-native";

function StudentProfile() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Student Profile</Text>
      <Text>Welcome to the Student Profile</Text>
    </View>
  );
}
export default StudentProfile;