import styled from "styled-components";
import AuthContainer from "../AuthContainer";
import { Ionicons } from "@expo/vector-icons";
import { PostCard } from "../PostCard";
import PostPhoto from "../../assets/images/PostPhoto.jpg";
import LogoutSVG from "../../assets/svg/LogoutSvg";

export const UserProfileScreen = () => {
  return (
    <AuthContainer>
      <ProfileWrapper>
        <AvatarBox>
          <Avatar>
            <DeleteCross
              name={"close-circle-outline"}
              size={25}
              color={"#BDBDBD"}
            />
          </Avatar>
        </AvatarBox>
        <UserName>Natali Romanova</UserName>
        <PostCard
          location={"Ukraine"}
          comments={1}
          likes={7}
          title={"some place"}
          image={PostPhoto}
        />
        <LogoutButton onPress={() => alert("Sure?")}>
          <LogoutSVG />
        </LogoutButton>
      </ProfileWrapper>
    </AuthContainer>
  );
};

const ProfileWrapper = styled.View`
  align-items: center;
  width: 100%;
  height: 80%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 32px;

  background-color: #fff;
`;

const AvatarBox = styled.View`
  margin-top: -60px;
  width: 132px;
  height: 120px;
  margin-bottom: 32px;
`;

const Avatar = styled.View`
  position: relative;
  background-color: #f6f6f6;
  border-radius: 16px;
  width: 120px;
  height: 120px;
`;

const DeleteCross = styled(Ionicons)`
  position: absolute;
  transform: translateX(13px);
  right: 0px;
  bottom: 14px;
  background-color: white;
  border-radius: 25px;
`;

const UserName = styled.Text`
  margin-bottom: 32px;

  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  text-align: center;

  color: #212121;
`;

const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 22px;
  width: 24px;
  height: 24px;
`;
