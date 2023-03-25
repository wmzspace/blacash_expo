import { serverIPP } from '../values/strings';
import { userInfo } from '../values/global';
import { ImageNft } from '../types';

export const getNftImgs = () =>
  new Promise<ImageNft[]>((resolve, reject) => {
    fetch('http:/' + serverIPP + '/nftimg', {
      method: 'GET',
    })
      .then(res => {
        if (res.ok) {
          res.json().then((resData: ImageNft[]) => {
            resolve(resData);
            userInfo.ownedNfts = resData.filter(
              nftImg => nftImg.owner === userInfo.email,
            );
          });
        } else {
          console.error('res error when getting nftImgs!');
        }
      })
      .catch(e => {
        reject(e);
      });
  });
