import {View} from 'react-native';
import styles from '../../styles';
import {Button, Divider, Text, useTheme} from 'react-native-paper';
import * as React from 'react';
import {PreferencesContext} from '../context/preference';

import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootBottomTabParamList} from '../types';
type Props = NativeStackScreenProps<RootBottomTabParamList, 'Mine'>;

export default function MineScreen({navigation}: Props) {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  return (
    <View style={[styles.container]}>
      <View style={styles.innerContainer}>
        <Text className="font-bold" style={{margin: 30, fontSize: 30}}>
          Mine Page
        </Text>
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
  );
}
