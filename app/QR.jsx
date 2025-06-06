import { colors, fontSizes, spacing } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function GenerateQRScreen() {
  const [sessionId, setSessionId] = useState("");
  const [expiryTime, setExpiryTime] = useState(300); 
  const [isGenerating, setIsGenerating] = useState(true);
  const navigation = useNavigation();

  const generateQR = () => {
    setIsGenerating(true);
    const newSessionId = `SESSION-${Date.now()}-${Math.floor(
      Math.random() * 10000
    )}`;
    setSessionId(newSessionId);
    setExpiryTime(300);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateQR();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setExpiryTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          Alert.alert("QR Expired", "Generating a new QR code...");
          generateQR();
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance QR Code</Text>
      <Text style={styles.subtitle}>
        Students can scan this to mark attendance
      </Text>

      <View style={styles.qrContainer}>
        {sessionId ? (
          <QRCode value={sessionId} size={220} />
        ) : (
          <Text>Loading QR...</Text>
        )}
      </View>

      <View style={styles.sessionInfo}>
        <Text style={styles.label}>Session ID:</Text>
        <Text style={styles.sessionText}>{sessionId}</Text>
        <Text style={styles.label}>Expires in: {formatTime(expiryTime)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={generateQR}>
        <Text style={styles.buttonText}>
          {isGenerating ? "Generating..." : "Generate New QR"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[
          styles.button,
          { backgroundColor: "#ccc", marginTop: spacing.md },
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.textDark }]}>
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fontSizes.xl,
    fontFamily: "Inter-Bold",
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontFamily: "Inter-Regular",
    color: colors.textLight,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  qrContainer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing.lg,
  },
  sessionInfo: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
  },
  sessionText: {
    fontSize: fontSizes.sm,
    fontFamily: "Inter-Medium",
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: fontSizes.md,
    fontFamily: "Inter-Bold",
  },
});
