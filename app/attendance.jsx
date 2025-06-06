import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const attendanceData = [
  {
    id: "1",
    name: "Ranjesh Thakur",
    studentId: "23186532",
    time: "07:15 AM",
    status: "Present",
  },
  {
    id: "2",
    name: "Sumit Ray",
    studentId: "23186542",
    time: "07:10 AM",
    status: "Present",
  },
  {
    id: "3",
    name: "Ratik Bajracharya",
    studentId: "23186533",
    time: "07:20 AM",
    status: "Absent",
  },
  {
    id: "4",
    name: "Aadarsha Sunam",
    studentId: "23186535",
    time: "07:20 AM",
    status: "Present",
  },
  {
    id: "5",
    name: "Niraj Chaudhary",
    studentId: "23186543",
    time: "07:05 AM",
    status: "Absent",
  },
  {
    id: "6",
    name: "Bikal Maharjan",
    studentId: "23186538",
    time: "07:10 AM",
    status: "Present",
  },
];

export default function AttendanceRecord() {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.studentId}</Text>
      <Text style={styles.cell}>{item.time}</Text>
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
        data={attendanceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
