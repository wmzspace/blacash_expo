import React from 'react';
import {
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { AuthScreenStyles } from '../styles/AuthScreenStyles';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import Animated, {
  BounceIn,
  FadeInDown,
  FadeInLeft,
} from 'react-native-reanimated';
import { Modal, Portal, Button } from 'react-native-paper';
import { FormData, RootStackScreenProps } from '../types';
import { serverIPP } from '../values/strings';

// export interface ISignUpScreenProps {
//   navigation: any;
// }
type Props = RootStackScreenProps<'SignupScreen'>;
const AnimatedView = Animated.createAnimatedComponent(View);

const SignupScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [formData, setFormData] = React.useState<FormData>({
    username: '',
    password: '',
    walletAddress: '',
    checkEmailInputChange: false,
    checkWalletInputChange: false,
    secureTextEntry: true,
    isValidUser: false,
    isValidPassword: false,
  });

  const handleEmailInputChange = (val: any) => {
    if (val.trim().length >= 2) {
      setFormData({
        ...formData,
        username: val,
        checkEmailInputChange: true,
        isValidUser: true,
      });
    } else {
      setFormData({
        ...formData,
        username: val,
        checkEmailInputChange: false,
        isValidUser: false,
      });
    }
  };

  const [currentLongitude, setCurrentLongitude] = React.useState<string>('');
  const [currentLatitude, setCurrentLatitude] = React.useState<string>('');
  const [location, setLocation] = React.useState<string>('');
  const [province, setProvince] = React.useState('');
  const [city, setCity] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [locationStatus, setLocationStatus] =
    React.useState<string>('点击左侧"位置"获取');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      // subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            buttonNegative: '拒绝',
            buttonNeutral: '忽略',
            buttonPositive: '同意',
            title: '定位请求',
            message: 'Blacash需要申请系统的定位权限',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();

          // subscribeLocationLocation();
        } else {
          setLocationStatus('权限被拒绝');
          Alert.alert('定位失败', '用户拒绝定位权限, 请尝试在设置中开启权限');
        }
      } catch (err) {
        console.warn('catch: ' + err);
      }
    }
  };

  const getOneTimeLocation = () => {
    setLocationStatus('定位获取中 ...');
    Geolocation.getCurrentPosition(pos => {
      console.log(pos);
    });
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude_ = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude_ = JSON.stringify(position.coords.latitude);

        setLocationStatus('点击左侧"位置"获取');

        //Setting Longitude state
        setCurrentLongitude(currentLongitude_);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude_);
        // console.log(`${currentLongitude},${currentLatitude}`)
        geocoder(currentLongitude_, currentLatitude_);
      },
      error => {
        if (error.message === 'No location provider available.') {
          setLocationStatus('点击左侧"位置"刷新)');
          Alert.alert('定位失败', '请检查GPS是否开启');
        } else if (error.message === 'Location permission was not granted.') {
          setLocationStatus('点击左侧"位置"刷新)');
          Alert.alert('定位失败', '用户拒绝定位权限, 请尝试在设置中开启权限');
        } else {
          setLocationStatus(error.message);
          Alert.alert('定位失败', error.message);
        }
        return 0;
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const geocoder = (currentLongitude_: String, currentLatitude_: String) => {
    fetch(
      `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${currentLongitude_},${currentLatitude_}&key=6db2f5900df5e3f3be3c2ef4cfb39f2a&radius=1000&extensions=all`,
      {
        method: 'GET',
      },
    )
      .then(res => {
        if (res.ok) {
          res.json().then(responseData => {
            console.log(responseData.regeocode.formatted_address);
            console.log(responseData.regeocode.addressComponent.province);
            console.log(responseData.regeocode.addressComponent.city);
            console.log(responseData.regeocode.addressComponent.district);
            // setFormattedAddress(responseData.regeocode.formatted_address);
            setProvince(responseData.regeocode.addressComponent.province);
            setCity(responseData.regeocode.addressComponent.city);
            setDistrict(responseData.regeocode.addressComponent.district);
            setLocation(
              responseData.regeocode.addressComponent.province +
                ' ' +
                responseData.regeocode.addressComponent.city +
                ' ' +
                responseData.regeocode.addressComponent.district,
            );
          });
        } else {
          Alert.alert('请求失败', 'error', [
            { text: '确定', onPress: () => console.log('OK Pressed!') },
          ]);
        }
      })
      .catch(err => {
        console.log('err', err);
        Alert.alert('请求失败', err, [
          { text: '确定', onPress: () => console.log('OK Pressed!') },
        ]);
      });
  };

  const handleWalletInputChange = (val: any) => {
    if (val.trim().length >= 2) {
      setFormData({
        ...formData,
        walletAddress: val,
        checkWalletInputChange: true,
      });
    } else {
      setFormData({
        ...formData,
        walletAddress: val,
        checkWalletInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val: any) => {
    if (val.trim().length >= 6) {
      setFormData({
        ...formData,
        password: val,
        isValidPassword: true,
      });
    } else {
      setFormData({
        ...formData,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleValidateUser = (val: any) => {
    if (val.trim().length >= 2) {
      setFormData({
        ...formData,
        username: val,
        isValidUser: true,
      });
    } else {
      setFormData({
        ...formData,
        username: val,
        isValidUser: false,
      });
    }
  };

  const handleSecureTextEntryChange = () => {
    setFormData({
      ...formData,
      secureTextEntry: !formData.secureTextEntry,
    });
  };

  const signupAjax = () => {
    fetch('http://' + serverIPP + '/signup', {
      //不能直接使用 wmzspace.space域名, 因为 域名开启了https防窜站
      method: 'POST',
      mode: 'cors', //之前是no-cors
      //same-origin - 同源请求，跨域会报error
      //no-cors - 默认，可以请求其它域的资源，不能访问response内的属性
      //cros - 允许跨域，可以获取第三方数据，必要条件是访问的服务允许跨域访问
      //navigate - 支持导航的模式。该navigate值仅用于HTML导航。导航请求仅在文档之间导航时创建。
      // body: `name=${userInfo.userName}&password=${userInfo.password}&address=${address}&email=${email}&location=${location}&province=${province}&city=${city}&district=${district}&longitude=${currentLongitude}&latitude=${currentLatitude}`, // 上传到后端的数据
      body: `name=${formData.username}&password=${formData.password}&address=${formData.walletAddress}&email=${formData.username}&location=${location}&province=${province}&city=${city}&district=${district}&longitude=${currentLongitude}&latitude=${currentLatitude}`, // 上传到后端的数据
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
              Alert.alert('提示', responseData, [
                {
                  text: '确定',
                  onPress: () => {
                    console.log('OK Pressed!');
                    if (responseData.substring(0, 4) === '注册成功') {
                      navigation.navigate('SplashScreen');
                    }
                  },
                },
              ]);
            });
        } else {
          Alert.alert('请求失败', 'error', [
            { text: '确定', onPress: () => console.log('OK Pressed!') },
          ]);
        }
      })
      .catch(err => {
        console.log('err', err);
        Alert.alert('请求失败', err, [
          { text: '确定', onPress: () => console.log('OK Pressed!') },
        ]);
      });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={AuthScreenStyles.container}>
      <StatusBar backgroundColor="#625B71" barStyle="light-content" />
      <View style={AuthScreenStyles.header}>
        <Text style={AuthScreenStyles.text_header}>Register now! 😎</Text>
      </View>
      <AnimatedView
        style={{ ...AuthScreenStyles.footer, flex: 4 }}
        entering={FadeInDown.duration(500)}>
        <Text style={AuthScreenStyles.text_footer}>邮箱:</Text>
        <View style={AuthScreenStyles.action}>
          <FontAwesome name="user-o" color="#333" size={20} />
          <TextInput
            placeholder="Email..."
            style={AuthScreenStyles.textInput}
            autoCapitalize="none"
            onChangeText={val => handleEmailInputChange(val)}
            onEndEditing={e => handleValidateUser(e.nativeEvent.text)}
          />
          {formData.checkEmailInputChange ? (
            <AnimatedView entering={BounceIn.duration(500)}>
              <Feather name="check-circle" color="green" size={20} />
            </AnimatedView>
          ) : null}
        </View>
        {formData.isValidUser ? null : (
          <AnimatedView entering={FadeInLeft.duration(200)}>
            <Text style={AuthScreenStyles.errorMsg}>用户名最短要2个字符</Text>
          </AnimatedView>
        )}
        <Text style={{ ...AuthScreenStyles.text_footer, marginTop: 25 }}>
          密码:
        </Text>
        <View style={AuthScreenStyles.action}>
          <Feather name="lock" color="#333" size={20} />
          <TextInput
            placeholder="Password..."
            style={AuthScreenStyles.textInput}
            autoCapitalize="none"
            secureTextEntry={formData.secureTextEntry ? true : false}
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={handleSecureTextEntryChange}>
            {formData.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {formData.isValidPassword ? null : (
          <AnimatedView entering={FadeInLeft.duration(200)}>
            <Text style={AuthScreenStyles.errorMsg}>密码最短要6个字符</Text>
          </AnimatedView>
        )}
        <Text style={{ ...AuthScreenStyles.text_footer, marginTop: 25 }}>
          钱包地址:
        </Text>
        <View style={AuthScreenStyles.action}>
          <Feather name="dollar-sign" color="#333" size={20} />
          <TextInput
            placeholder="Wallet address..."
            style={AuthScreenStyles.textInput}
            onChangeText={val => handleWalletInputChange(val)}
          />
          {formData.checkWalletInputChange ? (
            <AnimatedView entering={BounceIn.duration(500)}>
              <Feather name="check-circle" color="green" size={20} />
            </AnimatedView>
          ) : null}
        </View>
        <View style={AuthScreenStyles.button}>
          {/*<TouchableOpacity style={AuthScreenStyles.signIn} onPress={showModal}>*/}
          <TouchableOpacity
            style={AuthScreenStyles.signIn}
            onPress={() => {
              if (formData.isValidUser && formData.isValidPassword) {
                signupAjax();
              } else {
              }
            }}
            disabled={!(formData.isValidPassword && formData.isValidUser)}>
            <LinearGradient
              colors={
                formData.isValidPassword && formData.isValidUser
                  ? ['#625B71', '#7D5260']
                  : ['lightgray', 'lightgray']
              }
              style={AuthScreenStyles.signIn}>
              <Text style={{ ...AuthScreenStyles.textSign, color: '#fff' }}>
                注册
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={AuthScreenStyles.modal}>
              <Text style={AuthScreenStyles.modalText}>
                我们希望您能提供您的位置:)
              </Text>
              <View style={AuthScreenStyles.modalView}>
                <Button
                  mode="outlined"
                  textColor="#FFFFFF"
                  style={AuthScreenStyles.modalBtn}>
                  跳过
                </Button>
                <Button
                  mode="outlined"
                  textColor="#FFFFFF"
                  onPress={requestLocationPermission}
                  style={AuthScreenStyles.modalBtn}>
                  确认
                </Button>
              </View>
            </Modal>
          </Portal>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={[
              AuthScreenStyles.signIn,
              {
                borderColor: '#625B71',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                AuthScreenStyles.textSign,
                {
                  color: '#625B71',
                },
              ]}>
              登陆
            </Text>
          </TouchableOpacity>
        </View>
      </AnimatedView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
