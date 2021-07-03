import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.header};
    padding-top: 96px;
  `}
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(30)}px;
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.secondary_600};

    margin-top: 40px;
  `}
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text_detail};
    font-family: ${theme.fonts.primary_400};

    text-align: center;

    margin-top: 16px;
    line-height: 25px;
  `}
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;

  margin: 80px 0px;
`;