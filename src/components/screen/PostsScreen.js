import React from "react";

import styled from "styled-components/native";
import { PostOwner } from "../PostOwner";
import { PostCard } from "../PostCard";

export const PostsScreen = ({ route }) => {
  let postData = {};
  if (route.params) {
    const { location, imageURI, title } = route.params.data;
    let likes = 10;
    let comments = 0;
    postData = {
      location: [location.latitude, location.longitude],
      imageURI,
      title,
      likes,
      comments,
    };
  }

  return (
    <PostsScreenContainer>
      <PostOwner />
      {route.params && (
        <PostCard
          location={postData.location}
          comments={postData.comments}
          likes={postData.likes}
          title={postData.title}
          image={postData.imageURI}
        />
      )}
    </PostsScreenContainer>
  );
};

const PostsScreenContainer = styled.View`
  flex: 1;
  padding: 32px 16px;
  background-color: white;
  /* flex-direction: column; */
  gap: 15px;
  /* justify-content: flex-start; */
  /* height: 100%; */
`;
