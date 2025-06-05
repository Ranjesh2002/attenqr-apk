import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigation } from "@react-navigation/native";
import { History } from "lucide-react";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const mockClassesData = {
  recentSessions: [
    {
      id: 1,
      course: "Mathematics 101",
      date: "2023-05-01",
      attendees: 32,
      total: 32,
    },
    {
      id: 2,
      course: "Physics 202",
      date: "2023-05-02",
      attendees: 26,
      total: 28,
    },
    {
      id: 3,
      course: "Chemistry 303",
      date: "2023-05-03",
      attendees: 20,
      total: 22,
    },
    {
      id: 4,
      course: "Mathematics 101",
      date: "2023-04-28",
      attendees: 33,
      total: 35,
    },
    {
      id: 5,
      course: "Physics 202",
      date: "2023-04-27",
      attendees: 25,
      total: 28,
    },
  ],
};

const HistoryPage = () => {
  const navigation = useNavigation();

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
              }}
            >
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
              <Button
                variant="outline"
                onPress={() =>
                  navigation.navigate(
                    `/teacher/attendance-details?session=${session.id}`
                  )
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 8,
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
