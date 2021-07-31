import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";

import { useTheme } from "styled-components";
import { Car } from "../../components/Car";
import { BackButton } from "../../components/Car/BackButton";
import { AntDesign } from "@expo/vector-icons";

import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";

import * as S from "./styles";

type CarProps = {
  car: CarDTO;
  id: string;
  user_id: string;
};

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=10");
        setCars(response.data);
        // console.log(response.data);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <S.Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <S.Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </S.Title>

        <S.SubTitle>Conforto, segurança e privacidade</S.SubTitle>
      </S.Header>

      <S.Content>
        <S.Appointments>
          <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
          <S.AppointmentsQuantity>5</S.AppointmentsQuantity>
        </S.Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <S.CarWrapper>
              <Car data={item.car} />

              <S.CarFooter>
                <S.CarFooterTitle>Periodo</S.CarFooterTitle>
                <S.CarFooterPeriod>
                  <S.CarFooterDate>18/06/2021</S.CarFooterDate>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    style={{ marginHorizontal: 11 }}
                  />
                  <S.CarFooterDate>18/06/2021</S.CarFooterDate>
                </S.CarFooterPeriod>
              </S.CarFooter>
            </S.CarWrapper>
          )}
        />
      </S.Content>
    </S.Container>
  );
}
