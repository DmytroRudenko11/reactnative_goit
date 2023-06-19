import React from "react";
import { View } from "react-native";
import styled from "styled-components";

export const BaseContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.View`
  padding: 0 16px;
`;
