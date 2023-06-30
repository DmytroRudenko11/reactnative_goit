import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { CreatePost } from "../components/screen/CreatePostScreen/CreatePost";
import { UserProfileScreen } from "../components/screen/UserProfileScreen";
import { PostsScreen } from "../components/screen/PostsScreen";
import LogoutSVG from "../assets/svg/LogoutSvg";

import { signOut } from "firebase/auth";
import { auth } from "../../config";
const Tab = createBottomTabNavigator();

export const PostsStack = ({ navigation }) => {
  const handleLogOut = async () => {
    await signOut(auth);
    console.log("LoggedOut");
    navigation.navigate("SignIn");
  };
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        title: "Публікації",
        headerStyle: {
          borderBottomColor: "#e8e8e8",
          borderBottomWidth: 1,
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
              <LogoutButton onPress={handleLogOut}>
                <LogoutSVG />
              </LogoutButton>
            );
          } else {
            return null;
          }
        },
        headerLeft: () => {
          if (route.name === "CreatePost" || route.name === "Comments") {
            return (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="ios-arrow-back" size={24} color="#212121" />
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },
        tabBarStyle: {
          height: 60,
          paddingRight: 90,
          paddingLeft: 90,
          paddingTop: 9,
          paddingBottom: 0,
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveBackgroundColor: "#ff6c00",

        tabBarItemStyle: {
          height: 40,
          borderRadius: 20,
        },
        tabBarContentContainerStyle: {
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: 70,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <LogoutButton onPress={handleLogOut}>
              <LogoutSVG />
            </LogoutButton>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          title: "Створити публікацію",
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const LogoutButton = styled.TouchableOpacity`
  margin-right: 16px;
  width: 24px;
  height: 24px;
`;
