import { Alert, RefreshControl, ScrollView, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import * as React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { MainBottomTabParamList, Message } from '../types';
type Props = StackScreenProps<MainBottomTabParamList, 'Message'>;
import { getMessage } from '../api/msg';

export default function MessageScreen({}: Props) {
  const [allMessages, setAllMessages] = React.useState<Message[]>();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getMessage()
      .then(messages => {
        setAllMessages(messages);
        // Refresh end
        setRefreshing(false);
      })
      .catch(e => console.error(e));
    setTimeout(() => {
      // Refresh timeout
      setRefreshing(false);
    }, 5000);
    // getNftImgs();
  }, []);

  React.useState(onRefresh);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Searchbar
        placeholder="搜索"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={() => {
          Alert.alert('搜索功能暂未启用');
        }}
        // theme={theme}
      />
      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15 }}>
        全部消息 ({allMessages?.length})
      </Text>
      {allMessages?.map(msg => (
        <View key={msg.id} style={{ marginVertical: 10 }}>
          <Text> {msg.address}</Text>
          <Text> {msg.content}</Text>
          <Text> {new Date(msg.time).toTimeString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
