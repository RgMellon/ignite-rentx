import React, { useState } from "react";

import * as Yup from "yup";

import {
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import theme from "../../styles/theme";

import * as S from "./style";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),

        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        Alert.alert("Opa", err.message);
      } else {
        Alert.alert("Erro na autenticação", "Ocorreu um erro ao fazer login");
      }
    }
  }

  function handleNavigateSignUp() {
    navigation.navigate("FirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Sua senha secreta"
              onChangeText={setPassword}
              value={password}
            />
          </S.Form>

          <S.Footer>
            <Button
              enabled
              loading={false}
              title="Login"
              onPress={handleSignIn}
            />

            <Button
              enabled
              // loading={false}
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNavigateSignUp}
              light
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
