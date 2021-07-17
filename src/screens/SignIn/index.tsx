import React from "react";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import theme from "../../styles/theme";

import * as S from "./style";

export function SignIn() {
  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <S.Title>Estamos {`\n`}quase la</S.Title>

        <S.SubTitle>
          Faça seu login para começar {`\n`}
          uma experiência incrível
        </S.SubTitle>
      </S.Header>

      <S.Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </S.Form>

      <S.Footer>
        <Button
          enabled={false}
          loading={false}
          title="Login"
          onPress={() => {}}
        />

        <Button
          enabled
          // loading={false}
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          onPress={() => Alert.alert("oi")}
          light
        />
      </S.Footer>
    </S.Container>
  );
}
