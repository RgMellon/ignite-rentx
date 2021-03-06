import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";

type Props = {
  title: string;
} & RectButtonProps;

export function ConfirmButton({ title, ...rest }: Props) {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
