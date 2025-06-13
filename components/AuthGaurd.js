import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";

export const AuthGuard = ({ children, role }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const user = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("accessToken");

      if (!user || !token) {
        router.replace("/login");
        return;
      }

      const userData = JSON.parse(user);
      if (role && userData.role !== role) {
        router.replace("/login");
      }
    };

    checkAuth();
  });

  return children;
};
