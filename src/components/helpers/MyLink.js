import { TouchableOpacity, Text, Linking } from "react-native";
import styled from "styled-components";

const MyLink = ({ url, text, textColor }) => {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinkText textColor={textColor}>{text}</LinkText>
    </TouchableOpacity>
  );
};

const LinkText = styled.Text`
  color: ${(props) => props.textColor || "#FFFFFF"};
`;

export default MyLink;
