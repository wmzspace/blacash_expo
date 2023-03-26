import * as React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { userInfo } from '../values/global';
import { getNftImgs } from '../api/nft';
import NFTMine from '../components/NFTMine';

export default function MineScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getNftImgs().then(() => {
      // Refresh end
      setRefreshing(false);
    });
    setTimeout(() => {
      // Refresh timeout
      setRefreshing(false);
    }, 3000);
  }, []);

  React.useState(onRefresh);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);
 
  // console.log(nftImgs);
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Searchbar
        placeholder="搜索"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ marginHorizontal: 10, marginVertical: 5 }}
        onSubmitEditing={() => {
          Alert.alert('搜索功能暂未启用');
        }}
        // theme={theme}
      />
      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15 }}>
        已拥有作品 ({userInfo.ownedNfts?.length})
      </Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={userInfo.ownedNfts}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <NFTMine nft={item} />}
        />
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...Platform.select({
    web: {
      content: {
        // there is no 'grid' type in RN :(
        display: 'grid' as 'none',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gridRowGap: '8px',
        gridColumnGap: '8px',
        padding: 8,
      },
      item: {
        width: '100%',
        height: 150,
      },
    },
    default: {
      content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 4,
      },
      item: {
        height: Dimensions.get('window').width / 2,
        width: '50%',
        padding: 4,
      },
    },
  }),
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
  screen: {
    flex: 1,
  },
});
