import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import * as Yup from "yup";

import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { BackButton } from "../../../components/Car/BackButton";
import { Input } from "../../../components/Input";

import * as S from "./styles";

export function FirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleRedirectContinueRegister() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Email é obrigatório"),
        email: Yup.string()
          .required("Email é obrigatório")
          .email("E-mail inválido"),
        driverLicense: Yup.string().required("CNH é obrigatória"),
      });

      const data = { email, name, driverLicense };
      await schema.validate(data);

      navigation.navigate("SecondStep", {
        user: data,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return Alert.alert("Opa", err.message);
      }

      Alert.alert("Ops", "Algo de errado aconteceu tente mais tarde");
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handleBack} />

            <S.Steps>
              <Bullet active />
              <Bullet active={false} />
            </S.Steps>
          </S.Header>

          <S.Title>Crie sua{`\n`}conta</S.Title>

          <S.Subtitle>
            Faça seu cadastro de{`\n`}forma rapida e fácil
          </S.Subtitle>

          <S.Form>
            <S.FormTitle>1. Dados</S.FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />

            <Input
              onChangeText={setEmail}
              value={email}
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />

            <Input
              onChangeText={setDriverLicense}
              value={driverLicense}
              iconName="credit-card"
              placeholder="CNH "
              keyboardType="numeric"
            />
          </S.Form>
          <Button title="Próximo" onPress={handleRedirectContinueRegister} />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
