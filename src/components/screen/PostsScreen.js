import React from "react";

import styled from "styled-components/native";
import { PostOwner } from "../PostOwner";
import { PostCard } from "../PostCard";
import { selectPostState } from "../../redux/postSlice/postSelector";
import { useSelector } from "react-redux";

export const PostsScreen = ({ route }) => {
  const {
    postContent: { title, imageURI, location },
    likes,
    comments: { count },
  } = useSelector(selectPostState);

  return (
    <PostsScreenContainer>
      <PostOwner />

      <PostCard
        location={location}
        comments={count}
        likes={likes}
        title={title}
        image={imageURI}
      />
    </PostsScreenContainer>
  );
};

const PostsScreenContainer = styled.View`
  flex: 1;
  padding: 32px 16px;
  background-color: white;
  gap: 15px;
`;
