import React from "react";
import Dashboard from "../screens/dashboard/Dashboard";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/settings/Settings";

export type MainStackParamList = {
  dashboard: undefined;
  settings: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <NavigationContainer>  
    <Stack.Navigator initialRouteName="dashboard">
      <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }}/>
      <Stack.Screen name="settings" component={SettingsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
