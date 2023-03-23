import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SplashScreenStyles } from '../styles/SplashScreenStyle';
import Animated, { BounceIn, FadeInUp } from 'react-native-reanimated';

export interface ISplashScreenProps {
    navigation: any
}

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedImage = Animated.createAnimatedComponent(Image)

const SplashScreen: React.FunctionComponent<ISplashScreenProps> = ({ navigation }) => {
  return (
    <View style={SplashScreenStyles.container}>
      <View style={SplashScreenStyles.header}>
        <AnimatedImage
            entering={BounceIn.duration(1500)}
          style={SplashScreenStyles.logo}
          source={require('../../assets/logo-dark/logo.png')}
          resizeMode="contain"
        />
      </View>
      <AnimatedView entering={FadeInUp.duration(1500)} style={SplashScreenStyles.footer}>
        <Text style={SplashScreenStyles.title}>Welcome to Blacash 👋</Text>
        <Text style={SplashScreenStyles.text}>让您的数字资产更加安全</Text>
        <View style={SplashScreenStyles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <LinearGradient colors={['#625B71', '#7D5260']} style={SplashScreenStyles.signIn}>
              <Text style={SplashScreenStyles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </AnimatedView>
    </View>
  );
};
export default SplashScreen;
