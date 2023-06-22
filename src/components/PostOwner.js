import React from "react";

import styled from "styled-components/native";

import UserImage from "../assets/images/user.jpg";
import { Image } from "react-native";

export const PostOwner = () => {
  return (
    <UserInfoContainer>
      <UserInfoWrapper>
        <UserImg source={UserImage} />
        <UserInfo>
          <UserName>Natali Romanova</UserName>
          <UserEmail>email@example.com</UserEmail>
        </UserInfo>
      </UserInfoWrapper>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.View`
  flex: 1;
`;

const UserImg = styled(Image)`
  width: 60px;
  height: 60px;
`;

const UserInfoWrapper = styled.View`
  padding: 0 16px;
  padding-top: 32px;
  flex-direction: row;
  gap: 8px;
`;

const UserInfo = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.Text`
  font-weight: 700;
  font-size: 13px;
  color: #212121;
`;
const UserEmail = styled.Text`
  font-size: 11px;
  color: rgba(33, 33, 33, 0.8);
`;
