import styled from "styled-components";

import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthContainer from "../../AuthContainer";
import { SignInFormFields } from "./SignInForm";

export const LoginScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("SignUp");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <AuthContainer>
        <AuthWrapper>
          <Title>Увійти</Title>
          <SignInFormFields />
          <TouchableOpacity onPress={handleNavigation}>
            <LinkText>Немає аккаунту? Зареєструватись</LinkText>
          </TouchableOpacity>
        </AuthWrapper>
      </AuthContainer>
    </TouchableWithoutFeedback>
  );
};

const LinkText = styled.Text`
  color: #1b4371;
`;

const AuthWrapper = styled.View`
  align-items: center;
  width: 100%;
  height: 60%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 32px;

  background-color: #fff;
`;

const Title = styled.Text`
  font-family: Roboto;
  color: #212121;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 33px;
`;
