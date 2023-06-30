import React, { useEffect } from "react";

import styled from "styled-components/native";
import { PostOwner } from "../PostOwner";
import { PostCard } from "../PostCard";

import { logCurrentStorage } from "../helpers/logCurrentStorage";

import { useSelector, useDispatch } from "react-redux";
import { selectUserData } from "../../redux/authSlice/authSelector";
import { selectPostState } from "../../redux/postSlice/postSelector";

import { addPost } from "../../redux/postSlice/postSlice";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config";
import { View } from "react-native";
import { ScrollView } from "react-native";

export const PostsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { refresh = false } = route.params || {};

  const posts = useSelector(selectPostState);

  const userData = useSelector(selectUserData);

  useEffect(() => {
    // const storage = logCurrentStorage();
    // console.log(storage);
    const getDataFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const result = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(addPost(result));
        return;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    getDataFromFirestore();
  }, [route, refresh]);

  const sortedPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <PostsScreenContainer>
      <ScrollView>
        {sortedPosts.length > 0 &&
          sortedPosts.map((post) => {
            return (
              <View key={post.id}>
                <PostOwner
                  avatar={post.postOwner.photoURL}
                  name={post.postOwner.displayName}
                  email={post.postOwner.email}
                />
                <PostCard
                  id={post.id}
                  location={post.location}
                  comments={post.comments.count}
                  likes={post.likes}
                  title={post.title}
                  image={post.imageURL}
                  position={post.position}
                />
              </View>
            );
          })}
      </ScrollView>
    </PostsScreenContainer>
  );
};

const PostsScreenContainer = styled.View`
  flex: 1;
  padding: 32px 16px;
  background-color: white;
  gap: 15px;
`;
