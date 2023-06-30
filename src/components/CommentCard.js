import styled from "styled-components";
import { Image } from "react-native";
import { useState } from "react";

export const CommentCard = ({ avatar, text, date, ownId, authorId }) => {
  const [ownText, setOwnText] = useState(ownId === authorId);

  return (
    <CommentItem ownText={ownText}>
      <AvatarImage source={{ uri: avatar }} />
      <CommentTextWrapper>
        <CommentText>{text}</CommentText>
        <DateText ownText={ownText}>{date}</DateText>
      </CommentTextWrapper>
    </CommentItem>
  );
};

const AvatarImage = styled(Image)`
  border-radius: 28px;
  width: 28px;
  height: 28px;
`;

const CommentSection = styled.View``;

const CommentItem = styled.View`
  flex-direction: row;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  flex-direction: ${(props) => (props.ownText ? "row-reverse" : "row")};
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
