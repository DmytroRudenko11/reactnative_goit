import { createStackNavigator } from "@react-navigation/stack";
import { CommentsScreen } from "../components/screen/CommentsScreen";
import { PostsStack } from "./PostsStack";

export const RootStack = createStackNavigator();

export const HomeStack = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="PostsScreen"
        component={PostsStack}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
    </RootStack.Navigator>
  );
};
