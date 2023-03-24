import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import SplashScreen from './SplashScreen';
import MainScreen from '../pages/main';
import { RootStackParamList } from '../types';

// export interface IRootStackScreenProps {}

const RootStack = createStackNavigator<RootStackParamList>();

// const RootStackScreen: React.FunctionComponent<IRootStackScreenProps>
const RootStackScreen: React.FunctionComponent = () => {
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
        //TODO: TS ERROR
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
