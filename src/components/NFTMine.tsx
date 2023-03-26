import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { mineScreenStyles } from '../styles/MineScreenStyles';
import { ImageNft } from '../types';

export interface IMinNFTProps {
  nft: ImageNft;
}

const NFTMine: React.FunctionComponent<IMinNFTProps> = ({ nft }) => {
  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
      }}>
      <Image source={{ uri: nft.url }} style={mineScreenStyles.img} />
      <Text>{nft.nftname}</Text>
    </View>
  );
};

export default NFTMine;
