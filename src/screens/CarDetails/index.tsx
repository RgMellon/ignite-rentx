import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/Car/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import * as S from "./styles";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

type Params = {
  car: CarDTO;
};

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate("Scheduling", {
      car,
    });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleGoBack} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>R$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          {car.accessories.map((accessory) => (
            <Acessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </S.Acessories>
        <S.About>{car.about}</S.About>
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  );
}
