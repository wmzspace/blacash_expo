import * as React from 'react';
import {View} from 'react-native';

import {Button, Divider, Text, useTheme} from 'react-native-paper';

import styles from '../../styles';

import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../types';
type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

import {StatusBar} from 'expo-status-bar';
import {PreferencesContext} from '../context/preference';

export default function MainScreen({navigation}: Props) {
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  return (
    <>
      <StatusBar />
      <View style={[styles.container]}>
        <View style={styles.innerContainer}>
          <Text className="font-bold" style={{margin: 30, fontSize: 30}}>
            Main Page
          </Text>
          <Button mode="contained" onPress={() => navigation.navigate('Home')}>
            返回
          </Button>
          <Divider style={{marginVertical: 10}} />
          <Button
            mode="text"
            onPress={() => {
              toggleTheme();
            }}>
            切换深浅主题色
          </Button>
        </View>
      </View>
    </>
  );
}
