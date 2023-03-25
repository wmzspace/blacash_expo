import { serverIPP } from '../values/strings';
import { Message } from '../types';

export const getMessage = () =>
  new Promise<Message[]>((resolve, reject) => {
    fetch('http:/' + serverIPP + '/message', {
      method: 'GET',
    })
      .then(res => {
        if (res.ok) {
          res.json().then((resData: Message[]) => {
            resolve(resData);
          });
        } else {
          console.error('res error when getting nftImgs!');
        }
      })
      .catch(e => {
        reject(e);
      });
  });
