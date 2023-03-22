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

export default function UploadScreen() {
  const [cameraPermissionInfo, requestCameraPermission] =
    useCameraPermissions();
  const [mediaPermissionInfo, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [pickedImage, setPickedImage] = useState(null);

  const uploadImage = async (uploadUrl: string) => {
    console.log('start!');
    // console.log(pickedImage[0].uri);

    FileSystem.uploadAsync(
      'http://192.168.1.101:8089/imgUrl',
      uploadUrl,

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

    console.log(result);

    if (!result.canceled) {
      setPickedImage(result.assets);
    }
  };

  const readCache = async () => {
    const response = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory?.toString() as string,
    );

    console.log(response);
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
        const album = await MediaLibrary.getAlbumAsync('Blacash');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Blacash', asset, false);
        } else {
          //TODO: Exception
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
            .then(() => {
              ToastAndroid.showWithGravity(
                '写入成功',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
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

  const clearCache = async (targetUrl: string) => {
    console.log('Deleting file...');
    FileSystem.deleteAsync(targetUrl).then(() => {
      console.log('Deleted: ' + targetUrl);
    });
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

  let imagePreview = <Text style={styles.previewText}>No image taken yet</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image source={{uri: pickedImage[0].uri}} style={styles.imageStyle} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreviewContainer}>{imagePreview}</View>
      <Button onPress={cameraPressHandler}>Take Image</Button>
      <Button onPress={pickImage}>Select Image</Button>
      <Button
        onPress={() => {
          writeImage(pickedImage[0]).catch(e => console.log(e));
        }}>
        Write Image
      </Button>
      <Button
        onPress={() => {
          // uploadImage(pickedImage[0].uri);
          uploadImage(FileSystem.documentDirectory + 'small.mp4').then(() => {
            console.log('Upload finish');
          });
        }}>
        Upload Image
      </Button>
      <Button onPress={readCache}>Read Cache</Button>
      <Button
        onPress={() => {
          clearCache(
            FileSystem.documentDirectory?.toString() + 'small.mp4',
          ).then(r => console.log(r));
        }}>
        Clear Cache
      </Button>

      <Image
        source={{
          uri: 'file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540alienit%252Fblacash_expo/small.mp4',
        }}
        style={styles.imageStyle}
      />
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
