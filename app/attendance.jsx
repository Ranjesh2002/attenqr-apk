import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import api from "../utils/api";

export default function AttendanceRecord() {
  const [student, setStudent] = useState([]);
  const { sessionId } = useLocalSearchParams();

  useEffect(() => {
    const fetchStu = async () => {
      try {
        const res = await api.get(`/student-atten/${sessionId}/`, {
          withCredentials: true,
        });
        setStudent(res.data.students);
      } catch (error) {
        console.log("error loading students", error);
      }
    };
    fetchStu();
  }, [sessionId]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>
        {new Date(item.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kathmandu",
        })}
      </Text>

      <Text
        style={[
          styles.cell,
          styles.status,
          { color: item.status === "Present" ? "green" : "red" },
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Attendance</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Student ID</Text>
        <Text style={styles.headerCell}>Time</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>
      <FlatList
        data={student}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#555",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  cell: {
    flex: 1,
    color: "#333",
  },
  status: {
    fontWeight: "600",
  },
});
