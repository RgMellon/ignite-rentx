import React from "react";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/Car/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Feather } from "@expo/vector-icons";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import * as S from "./styles";

export function SchedullingDetails() {
  const theme = useTheme();

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}} />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={[
            "https://production.autoforce.com/uploads/version/profile_image/5049/comprar-s-tronic_c680a07894.png",
            "https://production.autoforce.com/uploads/version/profile_image/5049/comprar-s-tronic_c680a07894.png",
            "https://production.autoforce.com/uploads/version/profile_image/5049/comprar-s-tronic_c680a07894.png",
          ]}
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao Dia</S.Period>
            <S.Price>R$ 480</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          <Acessory name="380Km/h" icon={SpeedSvg} />
          <Acessory name="3.2s" icon={AccelerationSvg} />
          <Acessory name="800 HP" icon={ForceSvg} />
          <Acessory name="Gasoline" icon={GasolineSvg} />
          <Acessory name="Auto" icon={ExchangeSvg} />
          <Acessory name="2 pessoas" icon={PeopleSvg} />
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
            <S.DateValue>18/03/2020</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          <S.DateInfo>
            <S.DateTitle>De</S.DateTitle>
            <S.DateValue>18/03/2020</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>Total</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>R$ 580 x3 diárias</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ 2.900</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button title="Alugar agora" color={theme.colors.success} />
      </S.Footer>
    </S.Container>
  );
}
