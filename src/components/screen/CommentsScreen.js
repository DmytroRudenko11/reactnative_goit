import { View, Text, Image } from "react-native";
import styled from "styled-components";
import image from "../../assets/images/PostPhoto.jpg";
import avatar from "../../assets/images/user.jpg";

export const CommentsScreen = () => {
  const ownText = true;

  return (
    <CardWrapper>
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
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  padding: 32px 16px;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  gap: 8px;
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
  font-size: 16px;

  color: #212121;
`;

const DateText = styled.Text`
  margin-top: 8px;
  text-align: ${(props) => (props.ownText ? "left" : "right")};

  color: #bdbdbd;
`;
