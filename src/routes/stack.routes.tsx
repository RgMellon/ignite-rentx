import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";

import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";

const Stack = createStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="FirstStep" component={FirstStep} />
      <Stack.Screen name="SecondStep" component={SecondStep} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="CarDetails" component={CarDetails} />
      <Stack.Screen name="Scheduling" component={Scheduling} />
      <Stack.Screen name="SchedullingDetails" component={SchedullingDetails} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
      <Stack.Screen name="MyCars" component={MyCars} />
    </Stack.Navigator>
  );
}
