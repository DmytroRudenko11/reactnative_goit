import React from "react";

import styled from "styled-components/native";
import { PostOwner } from "../PostOwner";

export const PostsScreen = () => {
  return (
    <PostsScreenContainer>
      <PostOwner />
    </PostsScreenContainer>
  );
};

const PostsScreenContainer = styled.View`
  background-color: white;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
