import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

type DateValueProps = {
  selected: boolean;
};

import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background_secondary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 325px;

    background-color: ${theme.colors.header};

    justify-content: center;
    padding: 25px;
    padding-top: ${getStatusBarHeight() + 30}px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.secondary_600};

    font-size: ${RFValue(34)}px;
    margin-top: 24px;
  `}
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0px;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.secondary_500};

    font-size: ${RFValue(10)}px;
  `}
`;

export const DateValue = styled.Text<DateValueProps>`
  ${({ theme, selected }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.primary_500};

    font-size: ${RFValue(15)}px;

    ${!selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom: 5px;
    `}
  `}
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 24,
  },
})``;

export const Footer = styled.View`
  padding: 24px;
`;
