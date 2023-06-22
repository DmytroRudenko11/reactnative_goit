import "react-native-gesture-handler";
import styled from "styled-components";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

import { RegistrationScreen } from "./src/components/AuthComponents/SignUpComponents/RegistrationScreen";
import { LoginScreen } from "./src/components/AuthComponents/SignInComponents/LoginScreen";
import { PostsScreen } from "./src/components/screen/PostsScreen";
import { CommentsScreen } from "./src/components/screen/CommentsScreen";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="SignUp"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={PostsScreen}
          options={{ headerShown: false }}
        />
        {/* <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ tabBarVisible: false }}
        /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
