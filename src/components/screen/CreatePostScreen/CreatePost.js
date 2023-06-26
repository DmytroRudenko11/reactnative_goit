import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import { optimizeCoords } from "../../helpers/optimizeCoords";

import { AddPhoto } from "./AddPhoto";

import * as Location from "expo-location";

export const CreatePost = ({ route }) => {
  const [positionData, setPositionData] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [displayCam, setDisplayCam] = useState(false);

  const navigation = useNavigation();

  let initialValues = {
    title: "",
    location: "",
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerShown: !displayCam,
      });
    }, [displayCam])
  );

  const handleSubmit = async (values, { resetForm }) => {
    let data = null;
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log(values);
      data = {
        ...values,
        imageURI,
      };
      console.log(data);
      setImageURI(null);
      resetForm();
    }
    if (status === "granted") {
      let position = await Location.getCurrentPositionAsync({});
      // const { title, location } = values;
      const coords = {
        // country,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      data = {
        ...values,
        location: coords,
        imageURI,
      };
      console.log(data);
      setImageURI(null);
      resetForm();
    }

    navigation.navigate("Posts", { data });
  };

  // const handleLocationForm = () => {
  //   navigation.navigate("Map");
  // };

  const handleFormReset = (values) => {
    setImageURI(null);
    initialValues.title = "";
    initialValues.location = "";
  };

  return (
    <>
      {displayCam ? (
        <AddPhoto setDisplayCam={setDisplayCam} setImageURI={setImageURI} />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // onReset={handleReset}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              handleReset,
            }) => (
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
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />
                  <LocationWrapper>
                    <Ionicons
                      name={"location-outline"}
                      size={24}
                      color="#BDBDBD"
                    />
                    <LocationInput
                      placeholder="Місцевість..."
                      placeholderTextColor="#BDBDBD"
                      onChangeText={handleChange("location")}
                      onBlur={handleBlur("location")}
                      value={positionData}
                    />
                  </LocationWrapper>
                  <SubmitBtn onPress={handleSubmit}>
                    <SubmitText>Опубліковати</SubmitText>
                  </SubmitBtn>
                </View>

                <DeleteButton onPress={handleFormReset}>
                  <Ionicons
                    name={"md-trash-outline"}
                    size={24}
                    color={"#BDBDBD"}
                  />
                </DeleteButton>
              </FormContainer>
            )}
          </Formik>
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
  /* background-color: ${(props) =>
    props.disabled ? "#F6F6F6" : "#ff6c00"}; */
  background-color: #ff6c00;
  margin-top: 20px;
  padding: 15px 0;
  width: 100%;
  border-radius: 100px;
`;

const SubmitText = styled.Text`
  text-align: center;

  /* color: ${(props) => (props.disabled ? "#BDBDBD" : "#FFFFFF")}; */
  color: white;
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
