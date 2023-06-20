import React from "react";
import LogoutSVG from "../../assets/svg/LogoutSvg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { CreatePost } from "../CreatePostScreen/CreatePost";
import { UserProfile } from "../UserProfile/UserProfile";
import { Posts } from "../PostsComponents/Posts";
import AddPostSvg from "../../assets/svg/AddPostSvg";
const Tab = createBottomTabNavigator();

export const PostsScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        title: "Публікації",
        headerStyle: {
          height: 60,
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#212121",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 17,
          fontWeight: 500,
          letterSpacing: -0.408,
        },
        headerRight: () => {
          if (route.name === "Posts") {
            return (
              <LogoutButton onPress={() => alert("This is a button!")}>
                <LogoutSVG />
              </LogoutButton>
            );
          } else {
            return null;
          }
        },
        tabBarStyle: {
          height: 80,
          paddingTop: 9,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid-outline";
          } else if (route.name === "CreatePost") {
            iconName = "ios-add-sharp";
          } else if (route.name === "UserProfile") {
            iconName = "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveBackgroundColor: "#ff6c00",

        tabBarItemStyle: {
          // padding: 5,
          // width: 70,
          height: 40,
          borderRadius: 20,
          // justifyContent: "space-around",
          // justifyContent: "center",
          // alignItems: "center",
        },
        tabBarContentContainerStyle: {
          flexDirection: "row",
          justifyContent: "space-around", // Применяем justifyContent: space-around
          alignItems: "center",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="CreatePost" component={CreatePost} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

const LogoutButton = styled.TouchableOpacity`
  margin-right: 16px;
  width: 24px;
  height: 24px;
`;

const AddButton = styled.TouchableOpacity`
  width: 70px;
  height: 40px;
  background-color: #ff6c00;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const SvgWrapper = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
`;
