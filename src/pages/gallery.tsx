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
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootBottomTabParamList} from '../types';
type Props = NativeStackScreenProps<RootBottomTabParamList, 'Gallery'>;

import {Searchbar, Text} from 'react-native-paper';
// import ScreenWrapper from '../@components/ScreenWrapper';
import {globalVal, userInfo} from '../values/global';
import {getNftImgs} from '../api/nft';

export default function GalleryScreen({navigation}: Props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getNftImgs();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  React.useState(onRefresh);

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
      <Text style={{textAlign: 'center', marginVertical: 10, fontSize: 15}}>
        全部作品 ({globalVal.allNfts?.length})
      </Text>
      {globalVal.allNfts?.map(({id, url}, index) => {
        return (
          <View key={id} style={styles.item}>
            <Image source={{uri: url}} style={styles.photo} />
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
