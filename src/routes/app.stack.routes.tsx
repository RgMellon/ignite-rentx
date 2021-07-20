import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";

import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";

const AppStack = createStackNavigator();

export function AppStackRoutes() {
  return (
    <AppStack.Navigator headerMode="none" initialRouteName="Home">
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="CarDetails" component={CarDetails} />
      <AppStack.Screen name="Scheduling" component={Scheduling} />
      <AppStack.Screen
        name="SchedullingDetails"
        component={SchedullingDetails}
      />
      <AppStack.Screen name="Confirmation" component={Confirmation} />
      <AppStack.Screen name="MyCars" component={MyCars} />
    </AppStack.Navigator>
  );
}
