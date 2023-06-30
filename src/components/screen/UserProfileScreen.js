import styled from "styled-components";
import AuthContainer from "../AuthContainer";

import { PostCard } from "../PostCard";
import LogoutSVG from "../../assets/svg/LogoutSvg";

import { useSelector } from "react-redux";
import { selectPostState } from "../../redux/postSlice/postSelector";
import { selectUserData } from "../../redux/authSlice/authSelector";

import { Image } from "react-native";
import { signOut } from "firebase/auth";

export const UserProfileScreen = () => {
  const posts = useSelector(selectPostState);
  const userData = useSelector(selectUserData);

  const ownPosts = posts.filter((post) => post.postOwner.uid === userData.uid);

  const handleLogOut = async () => {
    await signOut(auth);
    console.log("LoggedOut");
    navigation.navigate("SignIn");
  };

  return (
    <AuthContainer>
      <ProfileWrapper>
        <AvatarBox>
          {userData.photoURL && <Avatar source={{ uri: userData.photoURL }} />}
        </AvatarBox>
        <UserName>{userData.displayName}</UserName>
        <ScrollWrap>
          {ownPosts.length > 0 &&
            ownPosts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  location={post.location}
                  comments={post.comments.count}
                  likes={post.likes}
                  title={post.title}
                  image={post.imageURL}
                  styles={{ marginBottom: 15 }}
                />
              );
            })}
        </ScrollWrap>
        <LogoutButton onPress={handleLogOut}>
          <LogoutSVG />
        </LogoutButton>
      </ProfileWrapper>
    </AuthContainer>
  );
};

const ScrollWrap = styled.ScrollView`
  width: 100%;
`;

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
  position: relative;
  margin-top: -60px;
  width: 132px;
  height: 120px;
  margin-bottom: 32px;
`;

const Avatar = styled(Image)`
  background-color: #f6f6f6;
  border-radius: 16px;
  width: 120px;
  height: 120px;
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
