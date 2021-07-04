import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/Car/BackButton";

import ArrowSvg from "../../assets/arrow.svg";

import * as S from "./styles";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";
import { CarDTO } from "../../dtos/CarDTO";

type RentalPeriod = {
  start: number;
  formatted_start: string;
  end: number;
  formatted_end: string;
};

type Params = {
  car: CarDTO;
};

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  const [lastSelectedDate, setSelectedDate] = useState<DayProps>(
    {} as DayProps
  );

  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  function handleConfirmDate() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert("Selecione o intervalo para alugar");
    } else {
      navigation.navigate("SchedullingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate; //09 //10
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      formatted_start: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      formatted_end: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
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

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>De</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.formatted_end}>
              {rentalPeriod.formatted_start}
            </S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.formatted_end}>
              {rentalPeriod.formatted_end}
            </S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirmDate}></Button>
      </S.Footer>
    </S.Container>
  );
}
