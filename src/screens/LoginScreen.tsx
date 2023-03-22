import React from 'react';
import { Text, View } from 'react-native';

export interface ILoginScreenProps {}

const LoginScreen: React.FunctionComponent<ILoginScreenProps> = props => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;
