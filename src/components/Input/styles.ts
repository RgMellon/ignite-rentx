import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

type ContainerProps = {
  isFocused: boolean;
};

export const Container = styled.View<ContainerProps>`
  ${({ isFocused, theme }) => css`
    flex-direction: row;

    ${isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
  `}
`;

export const IconContainer = styled.View`
  ${({ theme }) => css`
    height: 56px;
    width: 56px;
    justify-content: center;
    align-items: center;

    margin-right: 2px;
    background-color: ${theme.colors.background_secondary};
  `}
`;

export const InputText = styled(TextInput)`
  ${({ theme }) => css`
    flex: 1;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary_400};
    padding: 0 23px;
    background-color: ${theme.colors.background_secondary};
  `}
`;