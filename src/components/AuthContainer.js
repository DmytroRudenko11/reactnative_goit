import { Text } from "react-native";
import styled from "styled-components";

const AuthContainer = ({ children }) => {
  return (
    <Container source={require("../assets/images/bgphoto.jpg")}>
      {children}
    </Container>
  );
};

const Container = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  resize: cover;
`;

export default AuthContainer;
