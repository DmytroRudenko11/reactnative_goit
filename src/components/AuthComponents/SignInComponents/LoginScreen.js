import { SignInFormFields } from "./SignInForm";
import styled from "styled-components";
import MyLink from "../../helpers/MyLink";

export const LoginScreen = () => {
  return (
    <SignInPage>
      <AuthWrapper>
        <Title>Увійти</Title>
        <SignInFormFields />
        <MyLink
          url="#"
          text="Немає аккаунту? Зареєструватись"
          textColor={"#1b4371"}
        />
      </AuthWrapper>
    </SignInPage>
  );
};

const SignInPage = styled.View`
  flex: 1;
  justify-content: flex-end;
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
