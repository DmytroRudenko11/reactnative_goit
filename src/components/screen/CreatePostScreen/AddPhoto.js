import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
  }, []);

  //   const takePicture = async () => {
  //     if (camera) {
  //       const photo = await camera.takePictureAsync();
  //       savePicture(photo);
  //     }
  //   };

  //   const savePicture = async (photo) => {
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status === "granted") {
  //       await MediaLibrary.saveToLibraryAsync(photo.uri);
  //       console.log("Picture saved to media library");
  //     }
  //   };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <CameraContainer>
      <Camera ref={cameraRef} type={type}>
        {/* <Button title="Take Picture" onPress={takePicture} /> */}
        <TakeAPhotoBtn>
          <Ionicons name={"camera-sharp"} size={24} color={"white"} />
        </TakeAPhotoBtn>
      </Camera>
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

const TakeAPhotoBtn = styled.TouchableOpacity``;
