import * as React from 'react';
import {View} from 'react-native';

import {Text} from 'react-native-paper';

import styles from '../../styles';

export default function LoginScreen({navigation}) {
  return (
    <View style={[styles.container]}>
      <View style={styles.innerContainer}>
        <Text className="font-bold">Login Page</Text>
      </View>
    </View>
  );
}
