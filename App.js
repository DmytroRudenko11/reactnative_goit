import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

import { RegistrationScreen } from "./src/components/screen/SignUpScreen/RegistrationScreen";
import { LoginScreen } from "./src/components/screen/SignInScreen/LoginScreen";
import { HomeStack } from "./src/stacks/HomeStack";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              component={HomeStack}
              options={{ headerShown: false }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
