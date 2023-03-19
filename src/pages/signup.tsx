import * as React from 'react';
import {View} from 'react-native';

import {Text} from 'react-native-paper';

import styles from '../../styles';

export default function SignupScreen({navigation}) {
  return (
    <View style={[styles.container]}>
      <View style={styles.innerContainer}>
        <Text className="font-bold">Signup Page</Text>
      </View>
    </View>
  );
}
