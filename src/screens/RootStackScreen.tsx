import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import SplashScreen from './SplashScreen';

export interface IRootStackScreenProps {}

const RootStack = createStackNavigator<any>();

const RootStackScreen: React.FunctionComponent<
  IRootStackScreenProps
> = props => {

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
