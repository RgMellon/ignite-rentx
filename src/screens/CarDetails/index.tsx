import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler, // identifica qd o usuario esta fazendo scroll
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/Car/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import * as S from "./styles";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { Car as ModelCar } from "../../database/model/Car";
import { CarDTO } from "../../dtos/CarDTO";

import theme from "../../styles/theme";
import api from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";

type Params = {
  car: ModelCar;
};

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const navigation = useNavigation();
  const route = useRoute();
  const netInfo = useNetInfo();

  const scrollY = useSharedValue(0);

  const scrollHandle = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate("Scheduling", {
      car,
    });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);

      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <S.Header>
          <BackButton onPress={handleGoBack} />
        </S.Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <S.CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </S.CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandle}
      >
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>

            <S.Price>
              R$
              {netInfo.isConnected === true ? car.price : "..."}
            </S.Price>
          </S.Rent>
        </S.Details>

        {carUpdated.accessories && (
          <S.Acessories>
            {carUpdated.accessories.map((accessory) => (
              <Acessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </S.Acessories>
        )}

        <S.About>{car.about}</S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button
          title="Escolher o periodo de alugel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <S.OfflineInfo>
            Conecte-se a internet para ver mais detalhes
          </S.OfflineInfo>
        )}
      </S.Footer>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
