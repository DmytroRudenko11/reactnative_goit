import { TouchableOpacity, Text, Linking } from "react-native";
import styled from "styled-components";

const MyLink = ({ screen, text, textColor, navigation }) => {
  const handlePress = () => {
    navigation.navigate(`${screen}`);
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
