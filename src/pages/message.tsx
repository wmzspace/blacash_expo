import { View } from 'react-native';
import styles from '../../styles';
import { Button, Divider, Text } from 'react-native-paper';
import * as React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { MainBottomTabParamList } from '../types';
type Props = StackScreenProps<MainBottomTabParamList, 'Message'>;
import { PreferencesContext } from '../context/preference';

export default function MessageScreen({ navigation }: Props) {
  const { toggleTheme } = React.useContext(PreferencesContext);
  return (
    <View style={[styles.container]}>
      <View style={styles.innerContainer}>
        <Text style={{ margin: 30, fontSize: 30 }}>Message Page</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Gallery')}>
          返回
        </Button>
        <Divider style={{ marginVertical: 10 }} />
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
