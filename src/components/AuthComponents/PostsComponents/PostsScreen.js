// import { StatusBar } from "expo-status-bar";
import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import LogoutSVG from "../../../assets/svg/LogoutSvg";
// import { SafeAreaView } from "react-native";

import { UserInfo } from "./UserInfo";
import { FooterMenu } from "./FooterMenu";

export const PostsScreen = () => {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <PostsScreenContainer>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Header>
        <Title>Публікації</Title>
        <LogoutButton>
          <Logout />
        </LogoutButton>
      </Header>
      <UserInfoContainer>
        <UserInfo />
      </UserInfoContainer>
      <FooterMenu />
    </PostsScreenContainer>
    // {/* </SafeAreaView> */}
  );
};

const UserInfoContainer = styled.View`
  flex: 1;
`;

const LogoutButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

const PostsScreenContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Logout = styled(LogoutSVG)``;

const Header = styled.View`
  height: 50px;
  padding: 10px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  flex-direction: row;
`;

const Title = styled.Text`
  flex: 1;
  text-align: center;
  color: #212121;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.408px;
`;
