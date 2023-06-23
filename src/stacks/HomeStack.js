import { createStackNavigator } from "@react-navigation/stack";
import { CommentsScreen } from "../components/screen/CommentsScreen";
import { PostsStack } from "./PostsStack";
import { MapScreen } from "../components/screen/MapScreen";
import { useState } from "react";

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
      <RootStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
        }}
      />
    </RootStack.Navigator>
  );
};
