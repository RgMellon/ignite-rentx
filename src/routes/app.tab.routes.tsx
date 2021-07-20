import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";

import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";

const AppTab = createBottomTabNavigator();

export function AppTabRoutes() {
  return (
    <AppTab.Navigator initialRouteName="Home">
      <AppTab.Screen name="Home" component={AppStackRoutes} />
      <AppTab.Screen name="MyCars" component={MyCars} />
      <AppTab.Screen name="Profile" component={Home} />
    </AppTab.Navigator>
  );
}
