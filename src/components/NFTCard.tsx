import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { ImageNft } from 'src/types';

export interface INFTCardProps {
  nft: ImageNft;
}

const NFTCard: React.FunctionComponent<INFTCardProps> = ({ nft }) => {
  return (
    <View
      style={{
        height: Dimensions.get('window').width / 2,
        width: '50%',
        padding: 4,
        flexWrap: 'wrap',
      }}>
      <Image
        source={{ uri: nft.url }}
        style={{
          flex: 1,
          resizeMode: 'cover',
        }}
      />
      <Text>{nft.id}</Text>
      <Text>{nft.nftname}</Text>
    </View>
  );
};

export default NFTCard;
