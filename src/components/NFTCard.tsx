import React from 'react';
import { View, Text, Image } from 'react-native';
import { galleryScreenStyles } from '../styles/GalleryScreenStyles';
import { ImageNft } from 'src/types';

export interface INFTCardProps {
  nft: ImageNft;
}

const NFTCard: React.FunctionComponent<INFTCardProps> = ({ nft }) => {
  return (
    <View
      style={galleryScreenStyles.item}>
      <Image
        source={{ uri: nft.url }}
        style={galleryScreenStyles.itemPhoto}
        resizeMode='cover'
      />
      <Text style={galleryScreenStyles.itemText}>No.{nft.id} {nft.nftname}</Text>
    </View>
  );
};

export default NFTCard;
