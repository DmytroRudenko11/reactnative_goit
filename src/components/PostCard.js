import styled from "styled-components";

import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import CommentSvg from "../assets/svg/CommentSvg";
import ThumbUpSvg from "../assets/svg/ThumbUpSvg";

import { selectPosition } from "../redux/postSlice/postSelector";
import { useSelector } from "react-redux";

export const PostCard = ({ location, comments, likes, title, image }) => {
  const [fillCommentSvg, setFillCommentSvg] = useState("transparent");
  const [fillThumbUpSvg, setFillThumbUpSvg] = useState("transparent");
  const [uLike, setULike] = useState(false);
  const position = useSelector(selectPosition);
  const navigation = useNavigation();

  const handleCommentsRedirect = (image) => {
    navigation.navigate("Comments", { image });
  };

  const handleMap = () => {
    navigation.navigate("Map", { position });
  };

  useEffect(() => {
    setFillCommentSvg(comments > 0 ? "#FF6C00" : "transparent");
    setFillThumbUpSvg(uLike ? "#FF6C00" : "transparent");
  }, [comments, uLike]);

  const handleThumpUp = () => {
    setULike(!uLike);
  };

  return (
    <CardWrapper>
      <PostImage source={{ uri: image }} />
      <PostTitle>{title}</PostTitle>
      <PostInfo>
        <InfoWrapper>
          <InfoItemWrapper>
            <CommentSvg
              fill={fillCommentSvg}
              onPress={() => handleCommentsRedirect(image)}
            />
            <Text style={{ color: "#212121" }}>{comments}</Text>
          </InfoItemWrapper>
          <InfoItemWrapper>
            <ThumbUpSvg fill={fillThumbUpSvg} onPress={handleThumpUp} />
            <Text style={{ color: "#212121" }}>{likes}</Text>
          </InfoItemWrapper>
        </InfoWrapper>
        <View>
          {location && (
            <LocationWrapper onPress={() => handleMap(location)}>
              <Ionicons name={"location-outline"} size={24} color="#BDBDBD" />
              <LocationText>{location}</LocationText>
            </LocationWrapper>
          )}
        </View>
      </PostInfo>
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  width: 100%;
  border-radius: 8px;
  gap: 8px;
`;

const PostImage = styled.Image`
  border-radius: 8px;
  width: 100%;
  height: 240px;
`;

const PostTitle = styled.Text`
  font-weight: 500;
  font-size: 16px;

  color: #212121;
`;

const PostInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoWrapper = styled.View`
  flex-direction: row;
  gap: 24px;
`;

const InfoItemWrapper = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const LocationWrapper = styled.TouchableOpacity`
  flex-direction: row;
  gap: 4px;
`;

const LocationText = styled.Text`
  text-align: right;
  text-decoration-line: underline;

  color: #212121;
`;
