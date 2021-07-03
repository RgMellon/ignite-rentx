import { useTheme } from "styled-components";
import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";

type Props = {
  title: string;
  color?: string;
} & RectButtonProps;

export function Button({ title, color, ...rest }: Props) {
  const theme = useTheme();

  return (
    <S.Container color={color ? color : theme.colors.main} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
