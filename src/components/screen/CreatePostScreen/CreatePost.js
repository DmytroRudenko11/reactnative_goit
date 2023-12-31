import styled from "styled-components/native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { AddPhoto } from "./AddPhoto";

import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCountryFromCoordinates } from "../../helpers/getCountry";

import { selectUserData } from "../../../redux/authSlice/authSelector";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const CreatePost = ({ navigation, route }) => {
  const [disableSbm, setDisableSbm] = useState(true);
  const [imageURI, setImageURI] = useState(null);
  const [displayCam, setDisplayCam] = useState(false);
  const [position, setPosition] = useState("");

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const userData = useSelector(selectUserData);

  // useEffect(() => {
  //   // const storage = logCurrentStorage();
  //   console.log("state", userData);
  //   // console.log(storage);
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerShown: !displayCam,
      });
    }, [displayCam])
  );

  useEffect(() => {
    // if (!imageURI) {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { country, region } = await getCountryFromCoordinates(
          coords.latitude,
          coords.longitude
        );
        const posData = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setPosition(posData);
        setLocation(`${country}, ${region}`);
      }
    })();
    // }
  }, [imageURI]);

  useEffect(() => {
    if (title && imageURI) {
      setDisableSbm(false);
    } else {
      setDisableSbm(true);
    }
  }, [title, imageURI]);

  const handleFormReset = () => {
    // clearAsyncStorage = async () => {
    //   AsyncStorage.clear();
    // };
    setImageURI(null);
    setTitle("");
    setPosition("");
    setLocation("");
  };

  const handleSubmit = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `postPhoto/${Date.now()}`);
      const response = await fetch(imageURI);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const imageURL = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(db, "posts"), {
        postOwner: { ...userData },
        imageURL,
        location,
        title,
        position: {
          latitude: position.latitude,
          longitude: position.longitude,
        },
        likes: 0,
        comments: {
          count: 0,
          content: [],
        },
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }

    handleFormReset();

    navigation.navigate("Posts", { refresh: true });
  };

  return (
    <>
      {displayCam ? (
        <AddPhoto setDisplayCam={setDisplayCam} setImageURI={setImageURI} />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <View>
              <ImageContainer>
                {imageURI && <PostPhoto source={{ uri: imageURI }} />}
                <SvgWrapper onPress={() => setDisplayCam(true)}>
                  <Ionicons name={"camera"} size={24} color="#BDBDBD" />
                </SvgWrapper>
              </ImageContainer>
              <ImageFieldText>Завантажте фото</ImageFieldText>
              <TitleInput
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                onChangeText={setTitle}
                value={title}
              />
              <LocationWrapper>
                <Ionicons name={"location-outline"} size={24} color="#BDBDBD" />
                <LocationInput
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  onChangeText={setLocation}
                  value={location}
                />
              </LocationWrapper>
              <SubmitBtn onPress={handleSubmit} disabled={disableSbm}>
                <SubmitText disabled={disableSbm}>Опубліковати</SubmitText>
              </SubmitBtn>
            </View>

            <DeleteButton onPress={handleFormReset}>
              <Ionicons name={"md-trash-outline"} size={24} color={"#BDBDBD"} />
            </DeleteButton>
          </FormContainer>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const FormContainer = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 16px;
  padding-bottom: 10px;
  background-color: white;
`;

const PostPhoto = styled(Image)`
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.View`
  position: relative;
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;

  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;

const SvgWrapper = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 60px;

  background-color: #fff;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
`;

const ImageFieldText = styled.Text`
  color: #bdbdbd;
`;

const TitleInput = styled.TextInput`
  margin-top: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  border-bottom-color: #e8e8e8;
  border-bottom-width: 1px;
`;

const LocationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-color: #e8e8e8;
  border-bottom-width: 1px;
`;

const LocationSvgWrapper = styled.View``;

const LocationInput = styled.TextInput`
  width: 100%;
  padding: 15px 0 15px 5px;
`;

const SubmitBtn = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? "#F6F6F6" : "#ff6c00")};
  margin-top: 20px;
  padding: 15px 0;
  width: 100%;
  border-radius: 100px;
`;

const SubmitText = styled.Text`
  text-align: center;
  color: ${(props) => (props.disabled ? "#BDBDBD" : "#FFFFFF")};
`;

const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 40px;
  border-radius: 40px;
  background-color: #f6f6f6;
  margin: 0 auto;
`;
