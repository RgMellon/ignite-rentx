import React from "react";

import * as S from "./styles";

import { RectButtonProps } from "react-native-gesture-handler";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { CarDTO } from "../../dtos/CarDTO";
import { Car as ModelCar } from "../../database/model/Car";
import { useNetInfo } from "@react-native-community/netinfo";

type CarProps = {
  data: ModelCar;
} & RectButtonProps;

export function Car({ data, ...rest }: CarProps) {
  const netInfo = useNetInfo();

  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>

        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>${data.period}</S.Period>

            <S.Price>
              R$ {netInfo.isConnected === true ? data.price : "..."}
            </S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>
        </S.About>
      </S.Details>

      <S.CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </S.Container>
  );
}
