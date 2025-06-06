import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "expo-router";
import { History } from "lucide-react";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const mockClassesData = {
  recentSessions: [
    {
      id: 1,
      course: "Server System",
      date: "2025-06-01",
      attendees: 20,
      total: 23,
    },
    {
      id: 2,
      course: "Database",
      date: "2025-06-02",
      attendees: 21,
      total: 23,
    },
    {
      id: 3,
      course: "It Infrastructure",
      date: "2025-05-03",
      attendees: 22,
      total: 23,
    },
    {
      id: 4,
      course: "Server System",
      date: "2025-05-7",
      attendees: 19,
      total: 23,
    },
    {
      id: 5,
      course: "Database",
      date: "2025-05-8",
      attendees: 23,
      total: 23,
    },
  ],
};

const HistoryPage = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>
            View attendance records for your recent classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockClassesData.recentSessions.map((session) => (
            <View
              key={session.id}
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 12,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {session.course}
                </Text>
                <Text style={{ fontSize: 14, color: "#888" }}>
                  {session.date}
                </Text>
                <Text style={{ fontSize: 12, color: "#888" }}>
                  Attendance: {session.attendees}/{session.total} (
                  {Math.round((session.attendees / session.total) * 100)}%)
                </Text>
              </View>
              <Button
                variant="outline"
                onPress={() => router.push(`/attendance?session=${session.id}`)}
                style={{
                  marginleft: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <History size={16} style={{ marginRight: 8 }} />
                <Text>Details</Text>
              </Button>
            </View>
          ))}
        </CardContent>
      </Card>
    </ScrollView>
  );
};

export default HistoryPage;
