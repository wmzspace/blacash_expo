import * as React from 'react';
import {
  Alert,
  StyleSheet,
  ToastAndroid,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  ProgressBar,
  TextInput,
} from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import {serverIPP} from '../values/strings';
import {PreferencesContext} from '../context/preference';
import styles from '../../styles';
import {userInfo} from '../values/global';

export default function UploadScreen() {
  const [cameraPermissionInfo, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaPermissionInfo, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [pickedImage, setPickedImage] = React.useState<
    ImagePicker.ImagePickerAsset[] | null
  >(null);
  const [uploadingVisible, setUploadingVisible] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState(3);
  const [uploadPercentage, setUploadPercentage] = React.useState('');
  const [uploadTask, setUploadTask] = React.useState<
    FileSystem.UploadTask | undefined
  >();

  const uploadDataBase = (resBody: string) => {
    let resDict = JSON.parse(resBody);
    fetch('http://' + serverIPP + '/upload', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        url: resDict.url,
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
            '拥有者: ' +
              _resDataConverted.owner +
              '\n' +
              '作品名称: ' +
              _resDataConverted.nftName +
              '\n' +
              '作品描述: ' +
              _resDataConverted.nftDescription +
              '\n' +
              '价格: ' +
              _resDataConverted.fee +
              '\n' +
              '备注: ' +
              _resDataConverted.remark +
              '\n' +
              'Url: ' +
              resDict.url,
          );
          // setUploadPercentage(1);
          // Alert.alert('上传成功！', resData.fileName);
          console.log('FINISH: ' + resDict.url);
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

  const getAndUploadImage = async () => {
    if (!userInfo.email.length) {
      Alert.alert('无法读取信息', '请先登录');
      return;
    }
    if (pickedImage) {
      setUploadingVisible(true);
      setUploadStatus(1); // 正在写入
      setUploadPercentage('0');
      console.log('\n-------------------------------');
      await writeImage()
        .then(async asset => {
          console.log('文件信息: ' + JSON.stringify(asset, null, 3));
          console.log('开始上传...');
          setUploadStatus(2); // 正在上传
          await uploadImage(asset.uri).then(async () => {
            setUploadTask(undefined);
            setUploadStatus(3); // 上传成功或已取消
            // clearCache();
          });
        })
        .catch(e => Alert.alert('上传失败', e));
    } else {
      ToastAndroid.showWithGravity(
        '请先选择或拍摄图片',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const uploadImage = async (imageUrl: string) => {
    let task = await FileSystem.createUploadTask(
      `http://${serverIPP}/imgUrl`,
      imageUrl,
      {
        fieldName: 'files',
        // httpMethod: 'PATCH',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      },
      res => {
        let percentage = (
          (res.totalBytesSent / res.totalBytesExpectedToSend) *
          100
        ).toFixed(0);

        setUploadPercentage(percentage);
      },
    );
    setUploadTask(task);
    if (task) {
      await task
        .uploadAsync()
        .then(res => {
          if (res) {
            console.log(
              '上传信息: ' + JSON.stringify(JSON.parse(res.body), null, 3),
            );
            console.log('上传成功');
            ToastAndroid.showWithGravity(
              '上传成功',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            uploadDataBase(res.body);
          } else {
            ToastAndroid.showWithGravity(
              '上传失败',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        })
        .catch(e => console.error(e));
    } else {
      console.log('创建任务失败');
    }
  };

  async function verifyCameraPermission() {
    if (
      // cameraPermissionInfo.status === ImagePicker.PermissionStatus.UNDETERMINED
      cameraPermissionInfo?.status === ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestCameraPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInfo?.status === ImagePicker.PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permission!',
        'You need to grant camera access to use this app',
      );
      return false;
    }
    return true;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(JSON.stringify(result, null, 4));

    if (!result.canceled) {
      setPickedImage(result.assets);
    }
  };

  const writeImage = async (): Promise<MediaLibrary.Asset> => {
    if (pickedImage) {
      let image = pickedImage[0];
      if (!mediaPermissionInfo?.granted) {
        await requestMediaPermission()
          .then(res => console.log(res))
          .catch(e => console.warn('warn3: ' + e));
      }

      if (mediaPermissionInfo?.granted) {
        const asset = await MediaLibrary.createAssetAsync(image.uri);
        const album = await MediaLibrary.getAlbumAsync('BlaCash');
        if (album == null) {
          // await MediaLibrary.createAlbumAsync('BlaCash', asset, true);
          await MediaLibrary.createAlbumAsync('BlaCash', asset, true)
            .then(async () => {
              const album2 = await MediaLibrary.getAlbumAsync('BlaCash');
              await MediaLibrary.addAssetsToAlbumAsync(
                [asset],
                album2?.id,
                true,
              ).then(() => {
                console.log('成功创新相册并写入: ' + image.uri);
              });
            })
            .catch(e => {
              console.warn('warn2: ' + e);
            });
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
            .then(() => {
              console.log('成功写入: ' + image.uri);
            })
            .catch(e => console.warn('warn1: ' + e));
        }
        return asset;
      } else {
        ToastAndroid.showWithGravity(
          '权限未获取',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    }
    throw new Error('写入权限获取失败');
  };

  const clearCache = async () => {
    let album = await MediaLibrary.getAlbumAsync('BlaCash');
    if (album) {
      console.log('Deleting file...');
      MediaLibrary.deleteAlbumsAsync(
        await MediaLibrary.getAlbumAsync('BlaCash'),
        true,
      )
        .then(() => {
          ToastAndroid.showWithGravity(
            '成功清除缓存',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          setPickedImage(null);
        })
        .catch(e => console.error(e));
    } else {
      ToastAndroid.showWithGravity(
        '暂无可清理缓存',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  async function cameraPressHandler() {
    const hasPermission = await verifyCameraPermission();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.assets) {
      setPickedImage(image.assets);
    }
  }

  let imagePreview = <Text style={style.previewText}>未选择图片</Text>;

  if (pickedImage) {
    const {uri} = pickedImage[0];
    imagePreview = <Image source={{uri: uri}} style={style.imageStyle} />;
  }

  const uploadDialogTitle = ['无上传任务', '正在写入', '正在上传', '上传成功'];
  const [nftName, setNftName] = React.useState('');
  const [nftDescription, setNftDescription] = React.useState('');
  const [fee, setFee] = React.useState(0);
  const [remark, setRemark] = React.useState('');
  const {isThemeDark} = React.useContext(PreferencesContext);

  return (
    <ScrollView>
      <View style={style.imagePreviewContainer}>{imagePreview}</View>

      <View style={[{marginVertical: 20}, styles.innerContainer]}>
        <TextInput
          mode="outlined"
          label="作品名称"
          style={{width: 300}}
          placeholderTextColor={isThemeDark ? 'gray' : 'gray'}
          underlineColor={isThemeDark ? 'gray' : 'rgba(47,100,125,0.26)'}
          clearButtonMode="always"
          selectionColor="skyblue"
          maxLength={50}
          onChangeText={_nftName => {
            setNftName(_nftName);
          }}
        />

        <TextInput
          mode="outlined"
          label="作品描述"
          style={{width: 300}}
          placeholder="简述作品"
          placeholderTextColor={isThemeDark ? 'gray' : 'gray'}
          underlineColor={isThemeDark ? 'gray' : 'rgba(47,100,125,0.26)'}
          clearButtonMode="always"
          selectionColor="skyblue"
          maxLength={50}
          onChangeText={_nftDescription => {
            setNftDescription(_nftDescription);
          }}
        />

        <TextInput
          mode="outlined"
          label="价格"
          style={{width: 300}}
          placeholder="作品售价"
          placeholderTextColor={isThemeDark ? 'gray' : 'gray'}
          underlineColor={isThemeDark ? 'gray' : 'rgba(47,100,125,0.26)'}
          clearButtonMode="always"
          selectionColor="skyblue"
          maxLength={50}
          onChangeText={_fee => {
            setFee(parseInt(_fee, 10));
          }}
        />

        <TextInput
          mode="outlined"
          label="备注"
          style={{width: 300}}
          placeholder="提供给管理员审核"
          placeholderTextColor={isThemeDark ? 'gray' : 'gray'}
          underlineColor={isThemeDark ? 'gray' : 'rgba(47,100,125,0.26)'}
          clearButtonMode="always"
          selectionColor="skyblue"
          maxLength={50}
          onChangeText={_remark => {
            setRemark(_remark);
          }}
        />
      </View>

      <View>
        <Portal>
          <Dialog
            visible={uploadingVisible}
            onDismiss={() => {
              setUploadingVisible(false);
            }}>
            <Dialog.Title>{uploadDialogTitle[uploadStatus]}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">已完成{uploadPercentage}%</Text>
              <ProgressBar progress={parseFloat(uploadPercentage) / 100} />
            </Dialog.Content>
            <Dialog.Actions>
              {uploadStatus !== 3 && (
                <>
                  <Button
                    onPress={() => {
                      uploadTask?.cancelAsync().then(() => {
                        setUploadTask(undefined);
                        console.log('取消上传');
                      });
                      setUploadingVisible(false);
                    }}>
                    取消
                  </Button>
                  <Button onPress={() => setUploadingVisible(false)}>
                    隐藏
                  </Button>
                </>
              )}
              {uploadStatus === 3 && (
                <>
                  <Button
                    onPress={() => {
                      setUploadingVisible(false);
                    }}>
                    完成
                  </Button>
                </>
              )}
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Button onPress={cameraPressHandler}>从相机拍摄</Button>
        <Button onPress={pickImage}>从相册选择</Button>
        <Button onPress={getAndUploadImage} disabled={uploadTask !== undefined}>
          上传所选图片

        </Button>
        <Button onPress={clearCache}>清除缓存相册</Button>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  imagePreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#f0cced',
    marginVertical: 8,
    borderRadius: 8,
  },
  previewText: {color: '#592454'},
  imageStyle: {width: '100%', height: '100%'},
});
