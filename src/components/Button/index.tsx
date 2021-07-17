import { useTheme } from "styled-components";
import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";
import { ActivityIndicator } from "react-native";

type Props = {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
} & RectButtonProps;

export function Button({
  title,
  color,
  enabled,
  loading,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <S.Container
      enabled={enabled}
      color={color ? color : theme.colors.main}
      style={{ opacity: enabled === false || loading === true ? 0.6 : 1 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <S.Title light={light}>{title}</S.Title>
      )}
    </S.Container>
  );
}
