import { Image, View } from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
// import image from "../../assets/images/PostPhoto.jpg";
import avatar from "../../assets/images/user.jpg";

export const CommentsScreen = ({ route }) => {
  const { image } = route.params;
  const ownText = true;
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <CardWrapper>
      <View>
        <PostImage source={image} />
        <CommentSection>
          <CommentItem ownText={ownText}>
            <AvatarImage source={avatar} />
            <CommentTextWrapper>
              <CommentText>CommentText</CommentText>
              <DateText ownText={ownText}>09 червня, 2020 | 08:40</DateText>
            </CommentTextWrapper>
          </CommentItem>
        </CommentSection>
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
  width: 100%;
  height: 240px;
`;

const AvatarImage = styled(Image)`
  border-radius: 28px;
  width: 28px;
  height: 28px;
`;

const CommentSection = styled.View`
  margin-top: 32px;
  flex-direction: column;
  gap: 12px;
`;

const CommentItem = styled.View`
  width: 100%;
  flex-direction: ${(props) => (props.ownText ? "row-reverse" : "row")};

  gap: 12px;
`;

const CommentTextWrapper = styled.View`
  flex: 1;
  border-radius: 8px;
  width: 100%;
  background-color: #f7f7f7;
  padding: 16px;
`;

const CommentText = styled.Text`
  font-weight: 400;
  font-size: 13px;

  color: #212121;
`;

const DateText = styled.Text`
  margin-top: 8px;
  font-size: 10px;
  text-align: ${(props) => (props.ownText ? "left" : "right")};

  color: #bdbdbd;
`;

const FormSection = styled.View`
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
