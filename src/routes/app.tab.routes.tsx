import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";

import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";

import HomeSvg from "../assets/home.svg";
import CarSvg from "../assets/car.svg";
import PeopleSvg from "../assets/people.svg";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { Profile } from "../screens/Profile";

const AppTab = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <AppTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,

        style: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <AppTab.Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <AppTab.Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <AppTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg height={24} width={24} fill={color} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
}
