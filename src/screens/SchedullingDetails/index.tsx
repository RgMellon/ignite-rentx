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
import { useNetInfo } from "@react-native-community/netinfo";
import { useAuth } from "../../hooks/auth";
import { date } from "yup/lib/locale";

type Params = {
  car: CarDTO;
  dates: string[];
};

type RentalPeriod = {
  start: string;
  end: string;
};

export function SchedullingDetails() {
  const { user } = useAuth();
  const netInfo = useNetInfo();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const theme = useTheme();
  const navigation = useNavigation();

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const rentTotal = Number(dates.length * car.price);

  async function handleCompletRent() {
    try {
      await api.post("rentals", {
        car_id: car.id,
        user_id: user.user_id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      });

      navigation.navigate("Confirmation", {
        title: "Carro alugado",
        message: `Agora você só precisa ir\naté a concessonaria RENTX\n pegar o seu automovel`,
        nextScreenRoute: "Home",
      });
    } catch (err) {
      console.log(err);
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
      <S.Header>
        <BackButton onPress={handleGoBack} />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {car.price}</S.Price>
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
              R$ {car.price} x {dates.length} diárias
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
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
