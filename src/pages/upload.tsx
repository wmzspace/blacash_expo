import {View, Alert, Image, Text, StyleSheet, ToastAndroid} from 'react-native';
import {Button} from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerAsset,
} from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import {StorageAccessFramework as SAF} from 'expo-file-system';
import {serverIPP} from '../values/strings';

export default function UploadScreen() {
  const [cameraPermissionInfo, requestCameraPermission] =
    useCameraPermissions();
  const [mediaPermissionInfo, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [pickedImage, setPickedImage] = useState(null);

  const uploadImage = async () => {};

  const uploadImage_ = async (imageUrl: string) => {
    console.log('start!');
    // console.log(pickedImage[0].uri);
    // let page = await MediaLibrary.getAssetsAsync({
    //   album: await MediaLibrary.getAlbumAsync('BlaCash'),
    // });
    // MediaLibrary.getAssetInfoAsync(page.assets[0])
    //   .then(res => console.log(res))
    //   .catch(e => console.error(e));

    FileSystem.uploadAsync(
      `http://${serverIPP}/imgUrl`,
      imageUrl,

      {
        fieldName: 'files',
        // httpMethod: 'PATCH',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        // uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      },
    )
      .then(res => {
        console.log(res.body);
      })
      .catch(e => console.error(e));
  };

  async function verifyCameraPermission() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestCameraPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
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

    console.log(JSON.stringify(result, null, 4));

    if (!result.canceled) {
      setPickedImage(result.assets);
    }
  };

  const readAssets = async () => {
    let album = await MediaLibrary.getAlbumAsync('BlaCash');
    if (album) {
      MediaLibrary.getAssetsAsync({
        album: album,
      })
        .then(res =>
          ToastAndroid.showWithGravity(
            `相册中有${res.totalCount}张图片`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          ),
        )
        .catch(e => console.warn(e));
    } else {
      ToastAndroid.showWithGravity(
        '相册无图片',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  // FileSystem.documentDirectory + image.fileName,

  const writeImage = async (image: ImagePickerAsset) => {
    // const permissions = await SAF.requestDirectoryPermissionsAsync();
    // if (!permissions.granted) {
    //   return;
    // }
    // const {directoryUri} = permissions;
    // const filesInRoot = await SAF.readDirectoryAsync(directoryUri);
    // const filesInNestedFolder = await SAF.readDirectoryAsync(filesInRoot[0]);

    // Both values will be the same
    // console.log({filesInRoot, filesInNestedFolder});
    // requestDirectoryPermissionsAsync()
    //   .then(res => console.log(res))
    //   .catch(e => console.log(e));
    if (!mediaPermissionInfo?.granted) {
      await requestMediaPermission()
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }
    try {
      if (mediaPermissionInfo?.granted) {
        const asset = await MediaLibrary.createAssetAsync(image.uri);
        const album = await MediaLibrary.getAlbumAsync('BlaCash');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('BlaCash', asset, false);
        } else {
          //TODO: Exception
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
            .then(() => {
              ToastAndroid.showWithGravity(
                '写入成功',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
              console.log('成功写入: ' + image.uri);
            })
            .catch(e => console.log(e));
        }
      } else {
        ToastAndroid.showWithGravity(
          '权限未获取',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (e) {
      console.log(e);
    }
    // if (image) {
    //   let path = image.uri;
    //   let filename = path.substring(path.lastIndexOf('/') + 1);
    //   path = image.uri.replace(filename, '');
    //
    //   if (FileSystem.documentDirectory) {
    //     SAF.createFileAsync('content://', filename, image.type as string)
    //       .then(res => {
    //         console.log(res);
    //       })
    //       .catch(e => console.log(e));
    //   } else {
    //     Alert.alert('上传失败', '写入文件错误');
    //   }
    // }
  };

  const clearCache = async () => {
    let album = await MediaLibrary.getAlbumAsync('BlaCash');
    if (album) {
      console.log('Deleting file...');
      MediaLibrary.deleteAlbumsAsync(
        await MediaLibrary.getAlbumAsync('BlaCash'),
        true,
      )
        .then(() =>
          ToastAndroid.showWithGravity(
            '成功清除缓存',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          ),
        )
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
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets);
  }

  let imagePreview = <Text style={styles.previewText}>未选择图片</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image source={{uri: pickedImage[0].uri}} style={styles.imageStyle} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreviewContainer}>{imagePreview}</View>
      <Button onPress={cameraPressHandler}>从相机拍摄</Button>
      <Button onPress={pickImage}>从相册选择</Button>
      <Button onPress={uploadImage}>完整上传流程</Button>
      <Button
        onPress={() => {
          writeImage(pickedImage[0]).catch(e => console.log(e));
        }}>
        写入缓存相册
      </Button>
      <Button onPress={readAssets}>读取缓存相册</Button>
      <Button
        onPress={() => {
          // uploadImage(pickedImage[0].uri);
          uploadImage_(FileSystem.documentDirectory + 'small.mp4').then(() => {
            console.log('Upload finish');
          });
        }}>
        上传至服务器
      </Button>
      <Button onPress={clearCache}>清除缓存相册</Button>

      {/*<Image*/}
      {/*  source={{*/}
      {/*    uri: 'file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540alienit%252Fblacash_expo/small.mp4',*/}
      {/*  }}*/}
      {/*  style={styles.imageStyle}*/}
      {/*/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
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
