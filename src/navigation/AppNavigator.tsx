import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import EmailEditorScreen from "../screens/EmailEditorScreen";
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle: "Emailer"}} />
        <Stack.Screen name="EmailEditor" component={EmailEditorScreen} options={{headerTitle: "Compose"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
