import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Bullet } from "../../../components/Bullet";
import { BackButton } from "../../../components/Car/BackButton";

import * as S from "./styles";

export function FirstStep() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack} />

        <S.Steps>
          <Bullet active />
          <Bullet active={false} />
        </S.Steps>
      </S.Header>

      <S.Title>Crie sua{`\n`}conta</S.Title>

      <S.Subtitle>Faça seu cadastro de{`\n`}forma rapida e fácil</S.Subtitle>

      <S.Form>
        <S.FormTitle>1. Dados</S.FormTitle>
      </S.Form>
    </S.Container>
  );
}
