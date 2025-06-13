import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const logout = async () => {
  try {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    router.replace("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
