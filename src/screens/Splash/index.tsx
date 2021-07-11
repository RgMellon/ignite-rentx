import React, { useEffect } from "react";
import { Button, StyleSheet, Dimensions } from "react-native";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import * as S from "./style";
import { useNavigation } from "@react-navigation/native";

// const WIDTH = Dimensions.get("window").width;
export function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    splashAnimation.value = withTiming(100, { duration: 1000 }, () => {
      "worklet";
      runOnJS(startApp)();
    });
  }, []);

  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 100], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 100],
            [0, -100],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 100], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 100],
            [-100, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("Home");
  }

  return (
    <S.Container>
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </S.Container>
  );
}
