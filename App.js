import "react-native-gesture-handler";
import styled from "styled-components";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

import { RegistrationScreen } from "./src/components/AuthComponents/SignUpComponents/RegistrationScreen";
import { LoginScreen } from "./src/components/AuthComponents/SignInComponents/LoginScreen";
import { Posts } from "./src/components/PostsComponents/Posts";
// import LogoutSVG from "./src/assets/svg/LogoutSvg";
import { PostsScreen } from "./src/components/screen/PostsScreen";
import LogoutSVG from "./src/assets/svg/LogoutSvg";

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
          // options={{
          //   title: "Публікації",
          //   headerStyle: {
          //     height: 60,
          //     backgroundColor: "#FFFFFF",
          //   },
          //   headerTintColor: "#212121",
          //   headerTitleAlign: "center",
          //   headerTitleStyle: {
          //     fontWeight: "bold",
          //     fontSize: 17,
          //     fontWeight: 500,
          //     letterSpacing: -0.408,
          //   },
          //   headerRight: () => (
          //     <LogoutButton onPress={() => alert("This is a button!")}>
          //       {/* <LogoutSVG /> */}
          //     </LogoutButton>
          //   ),
          // }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const LogoutButton = styled.TouchableOpacity`
  margin-right: 16px;
  width: 24px;
  height: 24px;
`;
