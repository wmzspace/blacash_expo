import {serverIPP} from '../values/strings';
import {Alert, BackHandler, Linking, ToastAndroid} from 'react-native';
const currentVersion = 'demo_1.2';

export const checkUpdate = ({navigation}: any) => {
  // 43.143.213.226:8088
  fetch('http://' + serverIPP + '/checkUpdate', {
    //不能直接使用 wmzspace.space域名, 因为 域名开启了https防窜站
    method: 'POST',
    mode: 'cors',
    body: `version=${currentVersion}`, // 上传到后端的数据
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'multipart/form-data;charset=utf-8', //非文本内容
      // 'Content-Type': 'multipart/form-data;boundary=------FormBoundary15e896376d1'
    },
  })
    .then(res => {
      if (res.ok) {
        //数据解析方式
        res
          //.arrayBuffer() // ArrayBuffer/ArrayBufferView
          // .json() // Json file, need JSON.stringify(...)
          .text() // String
          //.blob()        // Blob/File
          //.formData()    // FormData
          .then(responseData => {
            //从后端返回的数据(res.end())
            if (responseData !== '1') {
              Alert.alert('检查到新版本', responseData, [
                {
                  text: '退出',
                  onPress: () => {
                    navigation.navigate('Home');
                    BackHandler.exitApp();
                  },
                },
              ]);
              Linking.openURL(
                `https://wmzspace.space/yechat/yechat_${currentVersion}.apk`,
              ).catch(e => {
                console.log(e);
              });
            } else {
              ToastAndroid.showWithGravity(
                '当前为最新版本',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            }
          });
      } else {
        Alert.alert('无法进入Blacash', '检查更新失败', [
          {
            text: '退出',
            onPress: () => {
              navigation.navigate('Home');
              BackHandler.exitApp();
            },
          },
        ]);
      }
    })
    .catch(err => {
      // console.log('err', err);
      Alert.alert('网络请求失败', err.message, [
        {
          text: '退出',
          onPress: () => {
            navigation.navigate('Home');
            BackHandler.exitApp();
            // NativeModules.ExitManager.exitApp();
          },
        },
      ]);
      // showToast();
    });
};
