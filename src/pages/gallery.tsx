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
import { ImageNft, MainBottomTabScreenProps } from '../types';
type Props = MainBottomTabScreenProps<'Gallery'>;

import { Searchbar, Text } from 'react-native-paper';
// import ScreenWrapper from '../@components/ScreenWrapper';
// import { globalVal, userInfo } from '../values/global';
import { getNftImgs } from '../api/nft';

export default function GalleryScreen({}: Props) {
  const [allNfts, setAllNfts] = React.useState<ImageNft[]>();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getNftImgs()
      .then(res => {
        setAllNfts(res);
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
        全部作品 ({allNfts?.length})
      </Text>
      {allNfts?.map(({ id, url }) => {
        return (
          <View key={id} style={styles.item}>
            <Image source={{ uri: url }} style={styles.photo} />
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
