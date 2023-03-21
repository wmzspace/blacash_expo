import * as React from 'react';
import {View, Image} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
const AnimatedView = Animated.createAnimatedComponent(View);

import styles from '../../styles';
import {checkUpdate} from '../api/version';

import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../types';
import {StatusBar} from 'expo-status-bar';
import {PreferencesContext} from '../context/preference';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  checkUpdate({navigation});

  return (
    <>
      <StatusBar />
      <View style={[styles.container]}>
        <AnimatedView entering={FadeIn.delay(500)} style={{flex: 1}}>
          <Image
            style={{
              flex: 1,
              alignSelf: 'center',
              resizeMode: 'contain',
              width: 600,
            }}
            source={require('../../assets/logo-dark/logo_transparent.png')}
          />
          <AnimatedView
            entering={FadeInDown.duration(1000).delay(2000)}
            style={[styles.inlineFlex, {justifyContent: 'space-between'}]}>
            <Button
              mode="contained-tonal"
              buttonColor={'#06be5e'}
              style={styles.button2}
              labelStyle={{
                paddingHorizontal: 10,
                fontSize: 16,
                color: '#fcfcfc',
              }}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              登陆
            </Button>
            <Button
              mode="contained-tonal"
              // buttonColor=
              style={[
                styles.button2,
                isThemeDark
                  ? styles.darkBackgroundColor
                  : styles.lightBackgroundColor,
              ]}
              labelStyle={{
                paddingHorizontal: 10,
                fontSize: 16,
                // color: 'black',
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
