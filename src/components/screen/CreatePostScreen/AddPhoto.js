import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";

export const AddPhoto = ({ setDisplayCam, setImageURI }) => {
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
    // return () => {
    //   if (cameraRef.current) {
    //     cameraRef.current.pausePreview();
    //     cameraRef = null;
    //   }
    // };
  }, []);

  const saveImage = async () => {
    if (image) {
    }
    try {
      const asset = await MediaLibrary.createAssetAsync(image);
      alert("Photo saved to gallery");
      setImageURI(image);
      setDisplayCam(false);
    } catch (error) {
      console.log("Failed to save photo to gallery", error);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo.uri);
        // setDisplayCam(false);
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
    <Container>
      {!image ? (
        <CameraContainer
          ref={cameraRef}
          type={type}
          focusMode={Camera.Constants.auto}
        ></CameraContainer>
      ) : (
        <ImageContainer source={{ uri: image }} />
      )}
      {!image ? (
        <TakeAPhotoBtn onPress={takePicture}>
          <Ionicons name={"camera-sharp"} size={35} color={"#BDBDBD"} />
        </TakeAPhotoBtn>
      ) : (
        <BtnContainer>
          <RetweetBtn onPress={() => setImage(null)}>
            <AntDesign name={"retweet"} size={35} color={"#BDBDBD"} />
          </RetweetBtn>
          <SaveBtn onPress={saveImage}>
            <AntDesign name={"save"} size={35} color={"#BDBDBD"} />
          </SaveBtn>
        </BtnContainer>
      )}
    </Container>
  );
};

const ImageContainer = styled(Image)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const CameraContainer = styled(Camera)`
  flex: 1;
  border-radius: 25px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TakeAPhotoBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 43%;
  width: 60px;
  height: 60px;

  background-color: #fff;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
`;

const RetweetBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 20%;
  width: 60px;
  height: 60px;

  background-color: #fff;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
`;

const SaveBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  left: 20%;
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
