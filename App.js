import { StatusBar } from "expo-status-bar";
import Container from "./src/components/Container";
import { RegistrationScreen } from "./src/components/AuthComponents/SignUpComponents/RegistrationScreen";
import { LoginScreen } from "./src/components/AuthComponents/SignInComponents/LoginScreen";
import { PostsScreen } from "./src/components/AuthComponents/PostsComponents/PostsScreen";
import { Text, View } from "react-native";

export default function App() {
  return (
    <Container>
      <RegistrationScreen></RegistrationScreen>
    </Container>
    // <Container>
    //   <LoginScreen></LoginScreen>
    // </Container>
    //
    //    <View>
    //   <PostsScreen />
    // </View>
  );
}
