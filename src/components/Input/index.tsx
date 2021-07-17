import React from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

type InputProps = {
  iconName: React.ComponentProps<typeof Feather>["name"];
} & TextInputProps;

import * as S from "./styles";

export function Input({ iconName, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <S.Container>
      <S.IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </S.IconContainer>
      <S.InputText {...rest} />
    </S.Container>
  );
}
