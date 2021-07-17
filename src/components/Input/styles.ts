import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

type Props = {
  isFocused: boolean;
};

export const Container = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
  `}
`;

export const IconContainer = styled.View<Props>`
  ${({ theme, isFocused }) => css`
    height: 56px;
    width: 56px;
    justify-content: center;
    align-items: center;

    margin-right: 2px;
    background-color: ${theme.colors.background_secondary};

    ${isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
  `}
`;

export const InputText = styled(TextInput)<Props>`
  ${({ theme, isFocused }) => css`
    flex: 1;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary_400};
    padding: 0 23px;
    background-color: ${theme.colors.background_secondary};

    ${isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
  `}
`;
