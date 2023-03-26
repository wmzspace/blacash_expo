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
import { mineScreenStyles } from '../styles/MineScreenStyles';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

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

  const scrollX = React.useRef(new Animated.Value(0)).current;

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
      <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 15, color: '#B58392',fontWeight: 'bold', letterSpacing: 2 }}>
        😎 已拥有作品 ({userInfo.ownedNfts?.length})
      </Text>

      <View style={{ flex: 1, position: 'relative' }}>
        <View style={mineScreenStyles.absoluteFillObject}>
          {userInfo.ownedNfts?.map((nft, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <Animated.Image
                source={{ uri: nft.url }}
                key={nft.id}
                style={[mineScreenStyles.absoluteFillObject, { opacity }]}
                blurRadius={50}
              />
            );
          })}
        </View>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          data={userInfo.ownedNfts}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <NFTMine nft={item} />}
        />
      </View>



    </ScrollView>
  );
}
