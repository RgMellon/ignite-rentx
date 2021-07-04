import React from "react";

import * as S from "./styles";
// import GasolineSvg from "../../assets/gasoline.svg";
import { RectButtonProps } from "react-native-gesture-handler";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { CarDTO } from "../../dtos/CarDTO";

type CarProps = {
  data: CarDTO;
} & RectButtonProps;

export function Car({ data, ...rest }: CarProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>

        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>${data.rent.period}</S.Period>
            <S.Price>{`R$ ${data.rent.price}`} </S.Price>
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
