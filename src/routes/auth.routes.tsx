import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Confirmation } from "../screens/Confirmation";

import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";

const Stack = createStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="FirstStep" component={FirstStep} />
      <Stack.Screen name="SecondStep" component={SecondStep} />

      <Stack.Screen name="Confirmation" component={Confirmation} />
    </Stack.Navigator>
  );
}
