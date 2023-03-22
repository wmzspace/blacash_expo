import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
const AnimatedView = Animated.createAnimatedComponent(View);

import styles from '../../styles';
import { checkUpdate } from '../api/version';

import { StatusBar } from 'expo-status-bar';
import { PreferencesContext } from '../context/preference';

import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../types';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  // const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  checkUpdate({ navigation });

  return (
    <>
      <StatusBar />
      <View style={{...styles.container, backgroundColor: '#FFFBFE'}}>
        <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold', fontSize: 25, color: '#1C1B1F' }}>
          Welcome 👋
        </Text>
        <AnimatedView entering={FadeIn.delay(500)} style={{ flex: 8 }}>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                flex: 1,
                alignSelf: 'center',
                resizeMode: 'contain',
                borderRadius: 100,
              }}
              source={require('../../assets/logo-dark/logo.png')}
            />
          </View>
          <AnimatedView
            entering={FadeInDown.duration(1000).delay(2000)}
            style={{...styles.inlineFlex, justifyContent: 'space-around'}}>
            <Button
              mode="contained-tonal"
              buttonColor={'#B58392'}
              style={styles.button2}
              labelStyle={{
                paddingHorizontal: 10,
                fontSize: 16,
                color: '#FFFFFF',
                letterSpacing: 2,
              }}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              登陆
            </Button>
            <Button
              mode="contained-tonal"
              buttonColor={'#B58392'}
              style={{
                ...styles.button2,
                // backGround
                // isThemeDark
                //   ? styles.darkBackgroundColor
                //   : styles.lightBackgroundColor,
              }}
              labelStyle={{
                paddingHorizontal: 12,
                fontSize: 16,
                color: '#FFFFFF',
                letterSpacing: 2,
              }}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              注册
            </Button>
          </AnimatedView>
        </AnimatedView>
      </View>
    </>
  );
}
