import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SplashScreenStyles } from '../styles/SplashScreenStyle';

export interface ISplashScreenProps {}

const SplashScreen: React.FunctionComponent<ISplashScreenProps> = props => {
  return (
    <View style={SplashScreenStyles.container}>
      <View style={SplashScreenStyles.header}>
        <Image
          style={SplashScreenStyles.logo}
          source={require('../../assets/logo-dark/logo.png')}
          resizeMode="contain"
        />
      </View>
      <View style={SplashScreenStyles.footer}>
        <Text style={SplashScreenStyles.title}>Welcome to Blacash 👋</Text>
        <Text style={SplashScreenStyles.text}>让您的数字资产更加安全</Text>
        <View style={SplashScreenStyles.button}>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient colors={['#625B71', '#7D5260']} style={SplashScreenStyles.signIn}>
              <Text style={SplashScreenStyles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SplashScreen;
