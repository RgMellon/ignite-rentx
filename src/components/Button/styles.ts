import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type ButtonProps = {
  color: string;
} & RectButtonProps;

export const Container = styled(RectButton)<ButtonProps>`
  ${({ theme, color }) => css`
    width: 100%;

    padding: 19px;

    background-color: red;
    align-items: center;
    justify-content: center;

    background-color: ${color};
    margin-bottom: 8px;
  `}
`;

type ButtonTextProps = {
  light: boolean;
};
export const Title = styled.Text<ButtonTextProps>`
  ${({ theme, light }) => css`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${light ? theme.colors.header : theme.colors.shape};
  `}
`;
