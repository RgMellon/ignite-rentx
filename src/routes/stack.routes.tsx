import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";

import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

const Stack = createStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CarDetails" component={CarDetails} />
      <Stack.Screen name="Scheduling" component={Scheduling} />
      <Stack.Screen name="SchedullingDetails" component={SchedullingDetails} />
      <Stack.Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Stack.Screen name="MyCars" component={MyCars} />
    </Stack.Navigator>
  );
}
