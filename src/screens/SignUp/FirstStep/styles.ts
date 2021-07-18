import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    padding: 0 24px;
    background-color: ${theme.colors.background_primary};
  `}
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 31}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(40)}px;
    font-family: ${theme.fonts.secondary_600};
    color: ${theme.colors.title};

    margin-top: 60px;
    margin-bottom: 16px;
  `}
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(15)}px;
    font-family: ${theme.fonts.primary_400};
    color: ${theme.colors.text};

    line-height: 25px;

    margin-bottom: 16px;
  `}
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 64px;
  margin-bottom: 16px;
`;

export const FormTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(20)}px;
    font-family: ${theme.fonts.secondary_600};
    color: ${theme.colors.title};
  `}
`;