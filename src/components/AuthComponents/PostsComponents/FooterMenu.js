// import { View, Text, Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import UserSvg from "../../../assets/svg/UserSvg";
import GridSvg from "../../../assets/svg/GridSvg";
import AddPostSvg from "../../../assets/svg/AddPostSvg";

export const FooterMenu = () => {
  return (
    <FooterWrapper>
      <SvgWrapper>
        <GridSvg />
      </SvgWrapper>
      <AddButton>
        <AddPostSvg />
      </AddButton>
      <SvgWrapper>
        <UserSvg />
      </SvgWrapper>
    </FooterWrapper>
  );
};

const AddButton = styled.TouchableOpacity`
  width: 70px;
  height: 40px;
  background-color: #ff6c00;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const FooterWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 31px;
  align-items: center;

  padding-top: 9px;
  padding-bottom: 22px;
  border-top-width: 1px;
  border-top-color: #e8e8e8;
`;

const SvgWrapper = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
`;
