import { Formik } from "formik";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";


import styled from "styled-components/native";

import { auth } from "../../../../config";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export const SignUpFormFields = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [textToDisplay, setTextToDisplay] = useState("Показати");

  const navigation = useNavigation();

 

  useEffect(() => {
    setTextToDisplay(showPassword ? "Показати" : "Приховати");
  }, [textToDisplay, showPassword]);

  const handleTogglePassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = (values, { resetForm }) => {
    const { login, email, password } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        const user = userData.user;
        updateProfile(user, { displayName: login })
          .then(() => {
            console.log("You signed up");
            console.log("Hello,", user.displayName);
          })
          .catch((error) => {
            console.error("Sorry, error ocured. Message:", error);
          });
      })
      .catch((e) => alert(e.message));

    console.log(values);
    navigation.navigate("Home");
    resetForm();
  };
  const initialValues = { photo: null, login: "", email: "", password: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSignUp}>
      {({ handleChange, handleSubmit, values }) => (
        <SignUpForm>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <SignUpInput
              onChangeText={handleChange("login")}
              value={values.login}
              placeholder="Логін"
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <SignUpInput
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Адреса електронної пошти"
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <PasswordWrapper>
              <SignUpInput
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Пароль"
                secureTextEntry={showPassword}
              />
              <ShowPasswordButton onPress={handleTogglePassword}>
                <ShowPasswordText>{textToDisplay}</ShowPasswordText>
              </ShowPasswordButton>
            </PasswordWrapper>
          </KeyboardAvoidingView>

          <SubmitButton onPress={handleSubmit} title="Submit">
            <ButtonText>Зареєстуватися</ButtonText>
          </SubmitButton>
        </SignUpForm>
      )}
    </Formik>
  );
};

const SignUpForm = styled.View`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const SignUpInput = styled.TextInput`
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f6f6f6;

  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;

const PasswordWrapper = styled.View`
  position: relative;
`;

const ShowPasswordText = styled.Text`
  color: #1b4371;
`;
const ShowPasswordButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 20px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-top: 43px;
  background-color: #ff6c00;
  padding: 10px 20px;
  border-radius: 100px;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: 16px;
`;
