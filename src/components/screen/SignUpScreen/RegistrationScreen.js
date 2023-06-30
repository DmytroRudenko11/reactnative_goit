import styled from "styled-components";

import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthContainer from "../../AuthContainer";
import AddSvg from "../../../assets/svg/AddSvg";
import { SignUpFormFields } from "./SignUpForm";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null);

  const handleNavigation = () => {
    navigation.navigate("SignIn");
  };

  const handleChooseAvatar = async () => {
    const galleryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (galleryStatus.granted === true) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <AuthContainer>
        <AuthWrapper>
          <AvatarBox>
            {avatar ? (
              <Avatar source={{ uri: avatar }}></Avatar>
            ) : (
              <AvatarPlaceholder />
            )}
            <AddAvatarBtn onPress={handleChooseAvatar}>
              <AddCross />
            </AddAvatarBtn>
          </AvatarBox>
          <Title>Реєстрація</Title>
          <SignUpFormFields avatar={avatar} setAvatar={setAvatar} />
          <TouchableOpacity onPress={handleNavigation}>
            <LinkText>Вже є акаунт? Увійти</LinkText>
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
  height: 75%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-right: 16px;
  padding-left: 16px;

  background-color: #fff;
`;

const AvatarBox = styled.View`
  position: relative;
  margin-top: -60px;
  width: 132px;
  height: 120px;
  margin-bottom: 32px;
`;

const AvatarPlaceholder = styled.View`
  background-color: #f6f6f6;
  border-radius: 16px;
  width: 120px;
  height: 120px;
`;
const Avatar = styled(Image)`
  background-color: #f6f6f6;
  border-radius: 16px;
  width: 120px;
  height: 120px;
`;

const AddAvatarBtn = styled.TouchableOpacity`
  position: absolute;
  transform: translateX(13px);
  right: 10%;
  bottom: 14px;
  width: 25px;
  height: 25px;
`;

const AddCross = styled(AddSvg)``;

const Title = styled.Text`
  font-family: Roboto;
  color: #212121;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 33px;
`;
