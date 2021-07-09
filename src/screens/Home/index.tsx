import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Ionicons } from "@expo/vector-icons";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";

import * as S from "./styles";

import { CarDTO } from "../../dtos/CarDTO";

import api from "../../services/api";
import { Load } from "../../components/Load";
import { useTheme } from "styled-components";

export function Home() {
  const theme = useTheme();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  async function getCars() {
    try {
      const response = await api.get("/cars");
      const { data } = response;
      setCars(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, []);

  function handleCardDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

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

      {loading ? (
        <Load />
      ) : (
        <S.CarList
          keyExtractor={(item) => String(item.id)}
          data={cars}
          renderItem={({ item }) => (
            <Car
              data={item}
              onPress={() => {
                handleCardDetails(item);
              }}
            />
          )}
        />
      )}

      <S.MyCarButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </S.MyCarButton>
    </S.Container>
  );
}
