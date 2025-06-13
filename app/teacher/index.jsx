import { colors, fontSizes, shadows, spacing } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { AuthGuard } from "../../components/AuthGaurd";

export default function TeacherHomeScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("Teacher");
  const pulseAnim = useSharedValue(1);

  useEffect(() => {
    pulseAnim.value = withRepeat(withTiming(1.2, { duration: 2000 }), -1, true);
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        setUsername(user.first_name || "Teacher");
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthGuard role="teacher">
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {username} 👋</Text>
          <Text style={styles.subtitle}>
            Generate QR Code to mark attendance
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Today: Database Systems</Text>
          <Text style={styles.cardText}>🕙 Time: 07:00 - 09:00 AM</Text>
          <Text style={styles.cardText}>👥 Students: 23</Text>

          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => router.push("/QR")}
          >
            <Text style={styles.qrButtonText}>Generate QR Code</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...shadows.md,
  },
  greeting: {
    fontSize: fontSizes.xxl,
    fontFamily: "Inter-Bold",
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontFamily: "Inter-Regular",
    color: colors.textLight,
  },
  card: {
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: fontSizes.lg,
    fontFamily: "Inter-SemiBold",
    marginBottom: spacing.sm,
    color: colors.textDark,
  },
  cardText: {
    fontSize: fontSizes.md,
    fontFamily: "Inter-Regular",
    marginBottom: spacing.xs,
    color: colors.textLight,
  },
  qrButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: "center",
  },
  qrButtonText: {
    fontSize: fontSizes.md,
    fontFamily: "Inter-Bold",
    color: colors.white,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: spacing.lg,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: colors.white,
  },
});
