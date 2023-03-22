import * as React from 'react';
import {View} from 'react-native';

import {Button, Text} from 'react-native-paper';

import styles from '../../styles/SplashScreenStyle';

import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../types';
type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({navigation}: Props) {
  return (
    <View style={[styles.container]}>
      <View style={styles.innerContainer}>
        <Text className="font-bold" style={{margin: 30, fontSize: 30}}>
          Signup Page
        </Text>
        <Button mode="contained" onPress={() => navigation.navigate('Home')}>
          返回
        </Button>
      </View>
    </View>
  );
}
