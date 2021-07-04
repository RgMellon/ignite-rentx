import React, { useEffect, useState } from "react";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/Car/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Feather } from "@expo/vector-icons";

import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import * as S from "./styles";

import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { format } from "date-fns/esm";
import { getPlatformDate } from "../../utils/getPlatformDate";

import api from "../../services/api";
import { Alert } from "react-native";

type Params = {
  car: CarDTO;
  dates: string[];
};

type RentalPeriod = {
  start: string;
  end: string;
};

export function SchedullingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const route = useRoute();
  const { car, dates } = route.params as Params;
  const rentalTotal = Number(dates.length * car.rent.price);

  const theme = useTheme();
  const navigation = useNavigation();

  async function handleCompletRent() {
    try {
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      const response = await api.put(`schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });

      navigation.navigate("SchedulingComplete");
    } catch (err) {
      Alert.alert("Não foi possivel confirmar o agendamento");
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

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

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>De</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          <S.DateInfo>
            <S.DateTitle>Até</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>Total</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>
              R$ {car.rent.price} x {dates.length} diárias
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentalTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleCompletRent}
        />
      </S.Footer>
    </S.Container>
  );
}
