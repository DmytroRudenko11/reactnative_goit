import styled from "styled-components/native";
import { Image } from "react-native";

export const PostOwner = ({ avatar, name, email }) => {
  return (
    <>
      {avatar && (
        <UserInfoContainer>
          <UserInfoWrapper>
            <UserImg source={{ uri: avatar }} />
            <UserInfo>
              <UserName>{name}</UserName>
              <UserEmail>{email}</UserEmail>
            </UserInfo>
          </UserInfoWrapper>
        </UserInfoContainer>
      )}
    </>
  );
};

const UserInfoContainer = styled.View`
  margin-bottom: 10px;
  /* flex: 1; */
`;

const UserImg = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 16px;
`;

const UserInfoWrapper = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const UserInfo = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.Text`
  font-weight: 700;
  font-size: 13px;
  color: #212121;
`;
const UserEmail = styled.Text`
  font-size: 11px;
  color: rgba(33, 33, 33, 0.8);
`;
