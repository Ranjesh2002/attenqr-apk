import { colors, fontSizes, shadows, spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function StudentHomeScreen() {
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const pulseAnim = useSharedValue(1);

  useEffect(() => {
    // Start the pulsing animation
    pulseAnim.value = withRepeat(withTiming(1.2, { duration: 2000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnim.value }],
      opacity: pulseAnim.value > 1.1 ? withTiming(0.6) : withTiming(0.9),
    };
  });

  const handleScanPress = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Camera permission is needed to scan QR codes"
        );
        return;
      }
    }

    setScanning(true);

    // Simulate a successful scan after 3 seconds
    setTimeout(() => {
      setScanning(false);
      setSuccess(true);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Student</Text>
        <Text style={styles.subtitle}>
          Mark your attendance by scanning a QR code
        </Text>
      </View>

      <View style={styles.mainContent}>
        {scanning ? (
          <View style={styles.scannerContainer}>
            <CameraView style={styles.camera} facing="back">
              <View style={styles.overlay}>
                <View style={styles.scanFrame} />
                <Text style={styles.scanText}>Scanning for QR Code...</Text>
              </View>
            </CameraView>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setScanning(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            {success ? (
              <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(300)}
                style={styles.successContainer}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={80}
                  color={colors.success}
                />
                <Text style={styles.successText}>Attendance Marked!</Text>
              </Animated.View>
            ) : (
              <>
                <Animated.View style={[styles.pulseCircle, animatedStyle]} />
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity
                    style={styles.scanButton}
                    onPress={handleScanPress}
                    activeOpacity={0.9}
                  >
                    <Ionicons name="qr-code" size={32} color="white" />
                    <Text style={styles.scanButtonText}>Scan QR Code</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}
          </View>
        )}
      </View>
    </View>
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
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pulseCircle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary,
    opacity: 0.3,
  },
  gradientButton: {
    width: 170,
    height: 170,
    borderRadius: 85,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.lg,
  },
  scanButton: {
    width: "100%",
    height: "100%",
    borderRadius: 85,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonText: {
    marginTop: spacing.sm,
    fontSize: fontSizes.md,
    fontFamily: "Inter-Bold",
    color: colors.white,
  },
  scannerContainer: {
    width: "100%",
    height: 400,
    overflow: "hidden",
    borderRadius: 20,
    ...shadows.md,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  scanText: {
    marginTop: spacing.lg,
    fontSize: fontSizes.md,
    fontFamily: "Inter-Medium",
    color: colors.white,
  },
  cancelButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
  },
  cancelButtonText: {
    fontSize: fontSizes.md,
    fontFamily: "Inter-Medium",
    color: colors.white,
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    marginTop: spacing.md,
    fontSize: fontSizes.lg,
    fontFamily: "Inter-Bold",
    color: colors.success,
  },
  footer: {
    padding: spacing.lg,
    alignItems: "center",
  },
  notificationButton: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
    ...shadows.sm,
  },
  notificationButtonText: {
    fontSize: fontSizes.sm,
    fontFamily: "Inter-Medium",
    color: colors.primary,
  },
});
