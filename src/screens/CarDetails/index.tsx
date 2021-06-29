import React from "react";
import { BackButton } from "../../components/Car/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import * as S from "./styles";

export function CarDetails() {
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

        <S.About>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum
        </S.About>
      </S.Content>
    </S.Container>
  );
}
