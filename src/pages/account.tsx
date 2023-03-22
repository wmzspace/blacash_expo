import * as React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import {userInfo} from '../values/global';
import styles from '../../styles';

import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootBottomTabParamList} from '../types';
type Props = NativeStackScreenProps<RootBottomTabParamList, 'Account'>;

export default function AccountScreen({navigation}: Props) {
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  return (
    <View style={[styles.container, {padding: 10}]}>
      <List.Accordion
        title="注册信息"
        expanded={expanded1}
        onPress={() => {
          setExpanded1(!expanded1);
        }}>
        <List.Item title="用户名: " description={userInfo?.name} />
        <List.Item title="邮箱: " description={userInfo?.email} />
        <List.Item title="定位: " description={userInfo?.location} />
      </List.Accordion>
      <List.Accordion
        title="账户信息"
        expanded={expanded2}
        onPress={() => {
          setExpanded2(!expanded2);
        }}>
        <List.Item title="钱包余额:" description={userInfo?.coin} />
        <List.Item title="钱包地址:" description={userInfo?.address} />
      </List.Accordion>
    </View>
  );
}
