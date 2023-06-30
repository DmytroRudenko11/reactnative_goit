import { View } from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
// import image from "../../assets/images/PostPhoto.jpg";
// import avatar from "../../assets/images/user.jpg";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../config.js";
import { selectPostState } from "../../redux/postSlice/postSelector";
import { selectUserData } from "../../redux/authSlice/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { CommentCard } from "../CommentCard";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { addPost } from "../../redux/postSlice/postSlice.js";

export const CommentsScreen = ({ route }) => {
  const [toogle, setToogle] = useState(false);
  const dispatch = useDispatch();
  const ownText = true;
  const { id: postId } = route.params;

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
  }, [toogle]);

  const posts = useSelector(selectPostState);
  const { imageURL, comments } = posts.find((post) => post.id === postId) || {};
  const { uid, photoURL } = useSelector(selectUserData);

  const handleSubmit = async (values, { resetForm }) => {
    const postDocRef = doc(db, "posts", postId);
    const postDocSnapshot = await getDoc(postDocRef);
    const postDoc = postDocSnapshot.data();
    const comments = postDoc.comments;

    const newComment = {
      author: {
        uid: uid,
        photoURL: photoURL,
      },
      text: values.comment,
      date: new Date().toISOString(),
    };

    comments.content = arrayUnion(newComment, ...comments.content);

    comments.count += 1;

    await updateDoc(postDocRef, { comments: comments });
    setToogle(!toogle);
    resetForm();
  };

  return (
    <CardWrapper>
      <View>
        <PostImage source={{ uri: imageURL }} />
        <ScrollContainer>
          {comments.content &&
            comments.content.map((comment) => (
              <CommentCard
                key={comment.date}
                avatar={comment.author.photoURL}
                text={comment.text}
                date={comment.date}
                ownId={uid}
                authorId={comment.author.uid}
              />
            ))}
        </ScrollContainer>
      </View>
      <Formik initialValues={{ comment: "" }} onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, values }) => (
          <FormSection>
            <CommentInput
              onChangeText={handleChange("comment")}
              placeholderTextColor="#BDBDBD"
              value={values.comment}
              placeholder="Коментувати..."
            />

            <SubmitBtn onPress={handleSubmit}>
              <Ionicons name={"arrow-up-sharp"} size={24} color={"white"} />
            </SubmitBtn>
          </FormSection>
        )}
      </Formik>
    </CardWrapper>
  );
};

const ScrollContainer = styled.ScrollView`
  height: 350px;
`;

const CardWrapper = styled.View`
  padding: 32px 16px;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  justify-content: space-between;
  background-color: #fff;
`;

const PostImage = styled.Image`
  border-radius: 8px;
  margin-bottom: 32px;
  width: 100%;
  height: 240px;
`;

const FormSection = styled.View`
  /* margin-top: 10px; */
  width: 100%;
  height: 50px;
  background-color: #f6f6f6;
  border-radius: 100px;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  padding-left: 16px;
`;

const CommentInput = styled.TextInput`
  flex: 1;
  color: #212121;
`;

const SubmitBtn = styled.TouchableOpacity`
  border-radius: 34px;
  width: 34px;
  height: 34px;
  background-color: #ff6c00;
  justify-content: center;
  align-items: center;
`;
