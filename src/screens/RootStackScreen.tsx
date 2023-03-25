import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import SplashScreen from './SplashScreen';
import MainScreen from '../pages/main';
import { RootStackParamList } from '../types';

// export interface IRootStackScreenProps {}

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackScreen: React.FunctionComponent = () => {
  return (
    <RootStack.Navigator initialRouteName="SplashScreen">
      <RootStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
export const RootStackScreenHasLogin: React.FunctionComponent = () => {
  return (
    <RootStack.Navigator initialRouteName="Main">
      <RootStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

// export default RootStackScreen;
