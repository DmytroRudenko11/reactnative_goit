import { Formik } from "formik";
import { useEffect, useState } from "react";

import styled from "styled-components/native";

export const SignUpFormFields = () => {
  const [showPassword, setShowPassword] = useState(true);

  const [textToDisplay, setTextToDisplay] = useState("Показати");

  useEffect(() => {
    setTextToDisplay(showPassword ? "Показати" : "Приховати");
  }, [textToDisplay, showPassword]);

  const handleTogglePassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    resetForm();
  };

  const initialValues = { photo: null, login: "", email: "", password: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <SignUpForm>
          <SignUpInput
            onChangeText={handleChange("login")}
            value={values.login}
            placeholder="Логін"
          />
          <SignUpInput
            onChangeText={handleChange("email")}
            value={values.email}
            placeholder="Адреса електронної пошти"
          />
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
