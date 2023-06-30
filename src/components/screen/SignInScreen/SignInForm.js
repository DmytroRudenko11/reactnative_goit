import { Formik } from "formik";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styled from "styled-components/native";
import { useDispatch } from "react-redux";

import { auth } from "../../../../config";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { getUser } from "../../../redux/authSlice/authSlice";

export const SignInFormFields = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [textToDisplay, setTextToDisplay] = useState("Показати");

  useEffect(() => {
    setTextToDisplay(showPassword ? "Показати" : "Приховати");
  }, [textToDisplay, showPassword]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (values, { resetForm }) => {
    const { email, password } = values;
    let userData = {};
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        // accessToken: user.accessToken,
        photoURL: user.photoURL,
      };

      console.log("hello,", user.displayName);
    } catch (error) {
      console.error("Sorry, error ocured. Message:", error);
    }

    dispatch(getUser(userData));
    // resetForm();
  };

  const initialValues = { email: "", password: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSignIn}>
      {({ handleChange, handleSubmit, values }) => (
        <SignInForm>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <SignInInput
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Адреса електронної пошти"
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <PasswordWrapper>
              <SignInInput
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
            <ButtonText>Увійти</ButtonText>
          </SubmitButton>
        </SignInForm>
      )}
    </Formik>
  );
};

const SignInForm = styled.View`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const SignInInput = styled.TextInput`
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
