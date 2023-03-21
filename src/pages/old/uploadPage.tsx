import * as React from 'react';
import {serverIPP} from '../values/strings';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  HelperText,
  Searchbar,
  Text,
  TextInput,
  useTheme,
  ProgressBar,
} from 'react-native-paper';
import ScreenWrapper from '../@components/ScreenWrapper';
import {globalVal, userInfo} from '../values/global';
import {getNftImgs} from '../apis/api';
import styles from '../styles';
import {readFile, uploadFile, write_file, writeFile} from '../apis/ProcessFile';
import {useCallback, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {theme} from '../ui/themes_old';
import {PreferencesContext} from '../context/preference';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {length} from 'deepmerge';

export const UploadScreen = () => {
  const [url, setUrl] = React.useState('');
  const [nftName, setNftName] = React.useState('');
  const [nftDescription, setNftDescription] = React.useState('');
  const [owner, setOwner] = React.useState('');
  const [fee, setFee] = React.useState(0);
  const [remark, setRemark] = React.useState('');
  const [uploadPercentage, setUploadPercentage] = React.useState(0);

  const uploadData = () => {
    fetch('http://' + serverIPP + '/upload', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        url: globalVal.uploadUrl,
        nftName: nftName,
        nftDescription: nftDescription,
        owner: userInfo.email,
        fee: fee,
        remark: remark,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(_res => {
      if (_res.ok) {
        _res.text().then(_resData => {
          // console.log(resData);
          let _resDataConverted = JSON.parse(_resData);
          console.log(_resData);
          Alert.alert(
            '上传成功！',
            '作品名称:' +
              _resDataConverted.nftName +
              '\n' +
              '作品描述:' +
              _resDataConverted.nftDescription +
              '\n' +
              '价格:' +
              _resDataConverted.fee +
              '\n' +
              '备注:' +
              _resDataConverted.remark,
          );
          // setUploadPercentage(1);
          // Alert.alert('上传成功！', resData.fileName);
          console.log('FINISH: ' + globalVal.uploadUrl);
          console.log('');
          console.log('');
        });
      } else {
        Alert.alert('请求失败', 'error', [
          {text: '确定', onPress: () => console.log('OK Pressed!')},
        ]);
      }
    });
  };

  const [fileResponse, setFileResponse] = useState([]);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });

      // RNFS.readFile(response[0].uri, 'base64')
      //   .then(content => {
      //     // data:image/jpeg;base64,
      //     // 得到的结果就可以 传给接口了 ，如果想要在网页上预览效果不要忘记格式转换
      //     // params.idImage = content;
      //     // 上传至服务端, content是 base64 格式的图片文件
      //     fetch('http://' + serverIPP + '/uploadImg', {
      //       method: 'POST',
      //       mode: 'cors',
      //       body: content,
      //       headers: {
      //         Accept: 'application/json',
      //         // 'Content-Type': 'application/x-www-form-urlencoded',
      //         'Content-Type': 'image/png',
      //         // 'Content-Type': 'image/jpeg',
      //       },
      //     });
      //   })
      //   .catch(err => {
      //     // toastShort('图片读取失败');
      //     console.log(err);
      //   });

      console.log(response);
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);

  return (
    <ScrollView>
      <View style={[styles.innerContainer, {marginVertical: 30}]}>
        <Text style={{fontSize: 25}}>上传作品</Text>
        <View style={{marginVertical: 30}}>
          <TextInput
            mode="outlined"
            label="作品名称"
            style={{width: 300}}
            placeholder={
              fileResponse[0]?.name.length > 15
                ? fileResponse[0]?.name.substring(0, 15) + '...'
                : fileResponse[0]?.name
            }
            placeholderTextColor={isThemeDark ? 'gray' : 'gray'}
            underlineColor={isThemeDark ? 'gray' : 'rgba(47,100,125,0.26)'}
            clearButtonMode="always"
            selectionColor="skyblue"
            maxLength={50}
            onChangeText={_nftName => {
              setNftName(_nftName);
              // setUserName(_userName);
              // setUserNameValidation(_userName.length >= 6);
              // dispatch({type: 'userName', userName: userName});
            }}
            // left={<TextInput.Icon icon="account" />}
            // left={<TextInput.Affix text="1" />}
          />

          <TextInput
            mode="outlined"
            label="作品描述"
            style={{width: 300}}
            // placeholder={
            //   fileResponse[0]?.name.length > 15
            //     ? fileResponse[0]?.name.substring(0, 15) + '...'
            //     : fileResponse[0]?.name
            // }
            placeholder="简述作品"
            placeholderTextColor={isThemeDark ? 'gray' : 'gray'}
            underlineColor={isThemeDark ? 'gray' : 'rgba(47,100,125,0.26)'}
            clearButtonMode="always"
            selectionColor="skyblue"
            maxLength={50}
            onChangeText={_nftDescription => {
              setNftDescription(_nftDescription);
              // setUserName(_userName);
              // setUserNameValidation(_userName.length >= 6);
              // dispatch({type: 'userName', userName: userName});
            }}
            // left={<TextInput.Icon icon="account" />}
            // left={<TextInput.Affix text="1" />}
          />

          <TextInput
            mode="outlined"
            label="价格"
            style={{width: 300}}
            // placeholder={
            //   fileResponse[0]?.name.length > 15
            //     ? fileResponse[0]?.name.substring(0, 15) + '...'
            //     : fileResponse[0]?.name
            // }
            placeholder="作品售价"
            placeholderTextColor={isThemeDark ? 'gray' : 'gray'}
            underlineColor={isThemeDark ? 'gray' : 'rgba(47,100,125,0.26)'}
            clearButtonMode="always"
            selectionColor="skyblue"
            maxLength={50}
            onChangeText={_fee => {
              setFee(parseInt(_fee, 10));
              // setUserName(_userName);
              // setUserNameValidation(_userName.length >= 6);
              // dispatch({type: 'userName', userName: userName});
            }}
            // left={<TextInput.Icon icon="account" />}
            // left={<TextInput.Affix text="1" />}
          />

          <TextInput
            mode="outlined"
            label="备注"
            style={{width: 300}}
            // placeholder={
            //   fileResponse[0]?.name.length > 15
            //     ? fileResponse[0]?.name.substring(0, 15) + '...'
            //     : fileResponse[0]?.name
            // }
            placeholder="提供给管理员审核"
            placeholderTextColor={isThemeDark ? 'gray' : 'gray'}
            underlineColor={isThemeDark ? 'gray' : 'rgba(47,100,125,0.26)'}
            clearButtonMode="always"
            selectionColor="skyblue"
            maxLength={50}
            onChangeText={_remark => {
              setRemark(_remark);
              // setUserName(_userName);
              // setUserNameValidation(_userName.length >= 6);
              // dispatch({type: 'userName', userName: userName});
            }}
            // left={<TextInput.Icon icon="account" />}
            // left={<TextInput.Affix text="1" />}
          />
        </View>

        {/*<HelperText type="error" style={{display: true ? 'none' : 'flex'}}>*/}
        {/*  用户名需至少6个字符*/}
        {/*</HelperText>*/}

        <View
          style={[
            // styles.inlineFlex,
            {marginVertical: 20, justifyContent: 'space-evenly'},
          ]}>
          <Button
            onPress={handleDocumentSelection}
            // style={{marginRight: 60}}
            labelStyle={{fontSize: 18}}>
            选择作品
          </Button>

          {/*<Button*/}
          {/*  labelStyle={{fontSize: 18}}*/}
          {/*  onPress={() => {*/}
          {/*    write_file(fileResponse[0]);*/}
          {/*  }}>*/}
          {/*  测试WriteFile*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  labelStyle={{fontSize: 18}}*/}
          {/*  onPress={() => {*/}
          {/*    readFile();*/}
          {/*  }}>*/}
          {/*  测试ReadFile*/}
          {/*</Button>*/}
          <Button
            labelStyle={{fontSize: 18}}
            onPress={async () => {
              if (!userInfo.email.length) {
                Alert.alert('无法读取信息', '请先登录');
                return;
              }

              // write_file(fileResponse[0]);
              console.log(fileResponse[0]);
              setUploadPercentage(0);

              await write_file(fileResponse[0]);

              uploadFile(fileResponse[0]).then(() => {
                if (!globalVal.writePermission) {
                  Alert.alert('无法读取信息', '请检查是否授权读写权限');
                  console.log('Permission denied!');
                  return;
                }
                if (fileResponse.length) {
                  const temp = setInterval(async () => {
                    try {
                      const value = await AsyncStorage.getItem(
                        '@uploadPercentage',
                      );
                      if (value !== null) {
                        // value previously stored
                        let pValue = JSON.parse(value);
                        // console.log(pValue.value);
                        setUploadPercentage(pValue.value);
                        if (pValue.value === 1) {
                          clearTimeout(temp);
                        }
                      }
                    } catch (e) {
                      // error reading value
                      console.log(e);
                    }
                  }, 1);
                  let attemptUpload = setInterval(() => {
                    if (globalVal.uploadUrl) {
                      uploadData();
                      clearInterval(attemptUpload);
                    }
                  }, 1000);

                  setTimeout(() => {
                    clearTimeout(temp);
                    clearInterval(attemptUpload);
                  }, 3000);
                } else {
                  // clearTimeout(temp);
                }
              });
            }}>
            上传
          </Button>

          {/*<Button labelStyle={{fontSize: 18}} onPress={getPercentage}>*/}
          {/*  测试*/}
          {/*</Button>*/}
          <ProgressBar progress={uploadPercentage} indeterminate={false} />
          {/*<ProgressBar*/}
          {/*  progress={parseInt()}*/}
          {/*/>*/}
        </View>
        {fileResponse.map((file, index) => (
          <View key={index.toString()}>
            <Text
              style={{paddingBottom: 20}}
              numberOfLines={1}
              ellipsizeMode={'middle'}
              // style={styles.uri}
            >
              {file?.name}
            </Text>
            <Image
              source={{uri: file?.uri}}
              // style={{width: 330, height: 450}}
              style={{width: 300, height: 500, alignSelf: 'center'}}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
