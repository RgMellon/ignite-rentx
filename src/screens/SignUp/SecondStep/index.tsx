import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { BackButton } from "../../../components/Car/BackButton";
import { Input } from "../../../components/Input";
import { PasswordInput } from "../../../components/PasswordInput";

import * as S from "./styles";

type Params = {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
};

export function SecondStep() {
  const theme = useTheme();

  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as Params;

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação");
    }

    if (passwordConfirm != password) {
      return Alert.alert("Senhas não são iguais");
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handleBack} />

            <S.Steps>
              <Bullet active={false} />
              <Bullet active />
            </S.Steps>
          </S.Header>

          <S.Title>Crie sua{`\n`}conta</S.Title>

          <S.Subtitle>
            Faça seu cadastro de{`\n`}forma rapida e fácil
          </S.Subtitle>

          <S.Form>
            <S.FormTitle>2. Senhas</S.FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </S.Form>
          <Button
            title="Cadastrar"
            onPress={handleRegister}
            color={theme.colors.success}
          />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
