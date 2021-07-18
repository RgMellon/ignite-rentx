import styled, { css } from "styled-components/native";

type Props = {
  active: boolean;
};

export const Container = styled.View<Props>`
  ${({ theme, active }) => css`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-left: 8px;

    background-color: ${active ? theme.colors.title : theme.colors.shape};
  `}
`;
