import React from "react";

import styled from "styled-components/native";

import { UserInfo } from "./UserInfo";

export const Posts = () => {
  return (
    <PostsScreenContainer>
      <UserInfoContainer>
        <UserInfo />
      </UserInfoContainer>
    </PostsScreenContainer>
  );
};

const UserInfoContainer = styled.View`
  flex: 1;
`;

const PostsScreenContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
