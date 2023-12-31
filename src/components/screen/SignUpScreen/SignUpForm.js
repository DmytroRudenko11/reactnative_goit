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

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/authSlice/authSlice";

export const SignUpFormFields = ({ avatar, setAvatar }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [textToDisplay, setTextToDisplay] = useState("Показати");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setTextToDisplay(showPassword ? "Показати" : "Приховати");
  }, [textToDisplay, showPassword]);

  const handleTogglePassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (values, { resetForm }) => {
    const { login, email, password } = values;
    let userProfile = {};
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userData.user;

      if (avatar) {
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${user.uid}`);
        const response = await fetch(avatar);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const avatarURL = await getDownloadURL(storageRef);

        await updateProfile(user, {
          displayName: login,
          photoURL: avatarURL,
        });
      } else {
        return alert("Add photo!");
      }
      userProfile = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      dispatch(getUser(userProfile));
      console.log("Hello,", user.displayName);

      setAvatar(null);
      resetForm();
    } catch (error) {
      console.error("Sorry, error occurred. Message:", error);
      console.error("Error details:", error.serverResponse);
      alert(error.message);
    }
  };

  const initialValues = { login: "", email: "", password: "" };

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
