import * as React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { userInfo } from '../values/global';
import { getNftImgs } from '../api/nft';

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
        已拥有作品 ({userInfo.ownedNfts?.length})
      </Text>

      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15 }}>
        正在出售所有权(
        {userInfo.ownedNfts?.filter(nft => nft.state === 2).length})
      </Text>
      {userInfo.ownedNfts
        ?.filter(nft => nft.state === 2)
        .map(nft => {
          return (
            <View key={nft?.id} style={styles.item}>
              <Image source={{ uri: nft?.url }} style={styles.photo} />
            </View>
          );
        })}

      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15 }}>
        正在出售使用权(
        {userInfo.ownedNfts?.filter(nft => nft.state === 3).length})
      </Text>
      {userInfo.ownedNfts
        ?.filter(nft => nft.state === 3)
        .map(nft => {
          return (
            <View key={nft?.id} style={styles.item}>
              <Image source={{ uri: nft?.url }} style={styles.photo} />
            </View>
          );
        })}

      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15 }}>
        待出售(
        {userInfo.ownedNfts?.filter(nft => nft.state === 1).length})
      </Text>
      {userInfo.ownedNfts
        ?.filter(nft => nft.state === 1)
        .map(nft => {
          return (
            <View key={nft?.id} style={styles.item}>
              <Image source={{ uri: nft?.url }} style={styles.photo} />
            </View>
          );
        })}

      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15 }}>
        待审核(
        {userInfo.ownedNfts?.filter(nft => nft.state === 0).length})
      </Text>
      {userInfo.ownedNfts
        ?.filter(nft => nft.state === 0)
        .map(nft => {
          return (
            <View key={nft?.id} style={styles.item}>
              <Image source={{ uri: nft?.url }} style={styles.photo} />
            </View>
          );
        })}
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
