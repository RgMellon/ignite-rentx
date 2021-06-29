import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";
import { useTheme } from "styled-components";

type ButtonProps = {
  color?: string;
} & TouchableOpacityProps;

export function BackButton({ color, ...rest }: ButtonProps) {
  const theme = useTheme();

  return (
    <S.Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </S.Container>
  );
}
