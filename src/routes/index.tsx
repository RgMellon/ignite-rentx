import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AppTabRoutes } from "../routes/app.tab.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "../hooks/auth";
import { ActivityIndicator } from "react-native";

export function Routes() {
  const { user, loading } = useAuth();

  return loading ? (
    <ActivityIndicator />
  ) : (
    <NavigationContainer>
      {user?.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
