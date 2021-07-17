import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

type InputProps = {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
} & TextInputProps;

import * as S from "./styles";

export function Input({ iconName, value, ...rest }: InputProps) {
  const theme = useTheme();

  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocused() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);

    setIsFilled(!!value);
  }

  return (
    <S.Container isFocused={isFocused}>
      <S.IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </S.IconContainer>
      <S.InputText
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        {...rest}
      />
    </S.Container>
  );
}
