import * as React from 'react';
import { Alert, RefreshControl, ScrollView, View } from 'react-native';
import { ImageNft, MainBottomTabScreenProps } from '../types';
type Props = MainBottomTabScreenProps<'Gallery'>;
import { Searchbar, Text } from 'react-native-paper';
import { getNftImgs } from '../api/nft';
import NFTHorizontalCard from '../components/NFTHorizontalCard';
import NFTVerticalCard from '../components/NFTVerticalCard';

export default function GalleryScreen({}: Props) {
  const [allNfts, setAllNfts] = React.useState<ImageNft[]>();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getNftImgs()
      .then(res => {
        // Displays reviewed Nfts
        setAllNfts(res.filter(nft => nft.state !== 0));
        // Refresh end
        setRefreshing(false);
      })
      .catch(e => console.error(e));
    setTimeout(() => {
      // Refresh timeout
      setRefreshing(false);
    }, 3000);
  }, []);

  React.useState(onRefresh);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

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
        onSubmitEditing={() => {
          Alert.alert('搜索功能暂未启用');
        }}
        style={{ marginHorizontal: 10, marginVertical: 5 }}
      />
      <View>
        <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15 }}>
          全部作品 ({allNfts?.length})
        </Text>
        <ScrollView
          horizontal={true}
          style={{
            backgroundColor: '#fff',
            elevation: 10,
            shadowColor: '#939094',
          }}>
          {allNfts?.map((nft: ImageNft) => {
            return <NFTHorizontalCard key={nft.id} nft={nft} />;
          })}
        </ScrollView>
      </View>
      <View>
        <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15 }}>
          详细信息
        </Text>
        <ScrollView
          style={{
            backgroundColor: '#fff',
            elevation: 10,
            shadowColor: '#939094',
          }}>
          {allNfts?.map((nft: ImageNft) => (
            <NFTVerticalCard key={nft.id} nft={nft} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
