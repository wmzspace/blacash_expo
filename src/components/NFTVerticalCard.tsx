import React from 'react';
import { View, Text, Image } from 'react-native';
import { galleryScreenStyles } from '../styles/GalleryScreenStyles';
import { ImageNft } from '../types';
import { sliceText } from '../utils/helper';
import { LinearGradient } from 'expo-linear-gradient';

export interface INameProps {
  nft: ImageNft;
}

const Name: React.FunctionComponent<INameProps> = ({ nft }) => {
  return (
    <View style={galleryScreenStyles.itemDetail}>
      <Image
        source={{ uri: nft.url }}
        style={galleryScreenStyles.itemPhoto}
        resizeMode="cover"
      />
      <View style={galleryScreenStyles.itemGroup}>
        <View>

            <Text style={galleryScreenStyles.itemText}>名称： {nft.nftname}</Text>
            <Text style={galleryScreenStyles.itemText}>
            所有者： {sliceText(nft.owner)}
            </Text>
            <Text style={galleryScreenStyles.itemText}>价格: {nft.price}</Text>
        </View>
        <LinearGradient
          colors={['#625B71', '#7D5260']}
          style={{
            width: '80%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>购买</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Name;
