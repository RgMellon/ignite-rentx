import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/Car/BackButton";

import * as S from "./styles";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();

  const { user } = useAuth();

  const [option, setOption] = useState<"data" | "password">("data");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: "data" | "password") {
    setOption(optionSelected);
  }

  async function handleSelectImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      allowsEditing: true,
      // allowsMultipleSelection: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <S.HeaderTop>
              <BackButton onPress={handleBack} color={theme.colors.shape} />
              <S.HeaderTitle>Editar perfil</S.HeaderTitle>
              <S.LogoutButton>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </S.LogoutButton>
            </S.HeaderTop>

            <S.PhotoContainer>
              {!!avatar && (
                <S.Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}

              <S.PhotoButton onPress={handleSelectImage}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content>
            <S.Options>
              <S.Option
                onPress={() => handleOptionChange("data")}
                active={option === "data"}
              >
                <S.OptionTitle active={option === "data"}>Dados</S.OptionTitle>
              </S.Option>

              <S.Option
                onPress={() => handleOptionChange("password")}
                active={option === "password"}
              >
                <S.OptionTitle active={option === "password"}>
                  Trocar senha
                </S.OptionTitle>
              </S.Option>
            </S.Options>

            {option === "data" && (
              <S.Section style={{ marginBottom: useBottomTabBarHeight() }}>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={name}
                  value={name}
                  onChangeText={setName}
                />

                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </S.Section>
            )}

            {option === "password" && (
              <S.Section style={{ marginBottom: useBottomTabBarHeight() }}>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCorrect={false}
                />

                <PasswordInput
                  iconName="lock"
                  placeholder="Nova senha"
                  autoCorrect={false}
                />

                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir senha"
                  autoCorrect={false}
                />
              </S.Section>
            )}
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
