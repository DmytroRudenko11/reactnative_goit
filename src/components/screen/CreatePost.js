import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as ImagePicker from "react-native-image-picker";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

export const CreatePost = () => {
  // const [ableToSubmit, setAbleToSubmit] = useState(true);

  const selectImage = async (formikProps) => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && !response.error) {
        formikProps.setFieldValue("photo", response.uri);
      }
    });
  };

  const handleSubmit = (values, { resetForm }) => {
    // if (values.title === "") {
    //   setAbleToSubmit(true);
    //   return;
    // }
    // setAbleToSubmit(false);
    console.log(values);
    resetForm();
  };

  const handleReset = ({ resetForm }) => {
    resetForm();
  };

  initialValues = {
    photo: null,
    title: "",
    location: "",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, handleReset }) => (
          <FormContainer>
            <View>
              <TouchableOpacity onPress={() => selectImage(values)}>
                <ImageContainer>
                  <SvgWrapper>
                    <Ionicons name={"camera"} size={24} color="#BDBDBD" />
                  </SvgWrapper>
                </ImageContainer>
                <ImageFieldText>Завантажте фото</ImageFieldText>
                {/* {values.photo && (
                <Image
                  source={{ uri: values.photo }}
                  style={{ width: 200, height: 200 }}
                />
              )} */}
              </TouchableOpacity>
              <TitleInput
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              <LocationWrapper>
                <Ionicons name={"location-outline"} size={24} color="#BDBDBD" />
                <LocationInput
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  value={values.location}
                />
              </LocationWrapper>
              <SubmitBtn onPress={handleSubmit}>
                <SubmitText>Опубліковати</SubmitText>
              </SubmitBtn>
            </View>

            <DeleteButton onPress={handleReset}>
              <Ionicons name={"md-trash-outline"} size={24} color={"#BDBDBD"} />
            </DeleteButton>
          </FormContainer>
        )}
      </Formik>
    </TouchableWithoutFeedback>
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

const ImageContainer = styled.View`
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;

  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;

const SvgWrapper = styled.View`
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
