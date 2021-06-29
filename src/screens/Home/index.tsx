import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";

import * as S from "./styles";

export function Home() {
  const carData = {
    brand: "audi",
    name: "RS Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail:
      "https://production.autoforce.com/uploads/version/profile_image/5049/comprar-s-tronic_c680a07894.png",
  };

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <S.TotalCars>Total de 12 carros</S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      <S.CarList
        keyExtractor={(item) => String(item)}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }) => <Car data={carData} />}
      />
    </S.Container>
  );
}
