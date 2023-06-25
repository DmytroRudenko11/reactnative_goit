import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";

export const AddPhoto = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    return () => {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
        cameraRef = null;
      }
    };
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo);
        setImage(photo.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <CameraContainer
      ref={cameraRef}
      type={type}
      focusMode={Camera.Constants.auto}
    >
      <TakeAPhotoBtn onPress={takePicture}>
        <Ionicons name={"camera-sharp"} size={35} color={"#BDBDBD"} />
      </TakeAPhotoBtn>
    </CameraContainer>
  );
};

const CameraContainer = styled(Camera)`
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;

  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 25px;
`;

const TakeAPhotoBtn = styled.TouchableOpacity`
  overflow: hidden;
  width: 60px;
  height: 60px;

  background-color: #fff;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
`;

const TakeAPhotoIcon = styled(Ionicons)`
  background-color: transparent;
`;
