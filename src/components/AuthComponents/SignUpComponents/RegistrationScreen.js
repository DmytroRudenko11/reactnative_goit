import AddSvg from "../../../assets/svg/AddSvg";
import { SignUpFormFields } from "./SignUpForm";
import styled from "styled-components";
import MyLink from "../../helpers/MyLink";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

export const RegistrationScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SignUpPage>
        <AuthWrapper>
          <AvatarBox>
            <Avatar>
              <AddCross />
            </Avatar>
          </AvatarBox>
          <Title>Реєстрація</Title>
          <SignUpFormFields />
          <MyLink url="#" text="Вже є акаунт? Увійти" textColor={"#1b4371"} />
        </AuthWrapper>
      </SignUpPage>
    </TouchableWithoutFeedback>
  );
};

const SignUpPage = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const AuthWrapper = styled.View`
  align-items: center;
  width: 100%;
  height: 75%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-right: 16px;
  padding-left: 16px;

  background-color: #fff;
`;

const AvatarBox = styled.View`
  margin-top: -60px;
  width: 132px;
  height: 120px;
  margin-bottom: 32px;
`;

const Avatar = styled.View`
  position: relative;
  background-color: #f6f6f6;
  border-radius: 16px;
  width: 120px;
  height: 120px;
`;

const AddCross = styled(AddSvg)`
  position: absolute;
  transform: translateX(13px);
  right: 0px;
  bottom: 14px;
  width: 25px;
  height: 25px;
`;

const Title = styled.Text`
  font-family: Roboto;
  color: #212121;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 33px;
`;
