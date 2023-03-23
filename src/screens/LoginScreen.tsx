import React from 'react';
import {
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { AuthScreenStyles } from '../styles/AuthScreenStyles';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
  BounceIn,
  FadeInDown,
  FadeInLeft,
} from 'react-native-reanimated';
import { FormData } from '../types';
import { serverIPP } from '../values/strings';

export interface ILoginScreenProps {
  navigation: any;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const LoginScreen: React.FunctionComponent<ILoginScreenProps> = ({
  navigation,
}) => {
  const [formData, setFormData] = React.useState<FormData>({
    username: '',
    password: '',
    checkEmailInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
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

  const loginAjax = () => {
    fetch('http://' + serverIPP + '/login', {
      method: 'POST',
      mode: 'cors',
      //same-origin - 同源请求，跨域会报error
      //no-cors - 默认，可以请求其它域的资源，不能访问response内的属性
      //cros - 允许跨域，可以获取第三方数据，必要条件是访问的服务允许跨域访问
      //navigate - 支持导航的模式。该navigate值仅用于HTML导航。导航请求仅在文档之间导航时创建。
      body: `email=${formData.username}&password=${formData.password}`, // 上传到后端的数据
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
              switch (responseData) {
                case '-1':
                  Alert.alert('登陆失败', '该用户不存在', [
                    { text: '确定', onPress: () => {} },
                  ]);
                  break;

                case '0':
                  Alert.alert('登陆失败', '密码错误', [
                    { text: '确定', onPress: () => {} },
                  ]);
                  break;
                default:
                  let resDict = JSON.parse(responseData);
                  Alert.alert('登陆成功', `欢迎您: ${formData.username}`, [
                    {
                      text: '确定',
                      onPress: () => {
                        navigation.navigate(
                          'Main',
                          resDict,
                          //     {
                          //   // needRefresh: true,
                          // }
                        );
                      },
                    },
                  ]);
                  break;
              }
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
        // reject(err);
      });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={AuthScreenStyles.container}>
      <StatusBar backgroundColor="#625B71" barStyle="light-content" />
      <View style={AuthScreenStyles.header}>
        <Text style={AuthScreenStyles.text_header}>Welcome back! 😊</Text>
      </View>
      <AnimatedView
        style={AuthScreenStyles.footer}
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
            secureTextEntry={formData.secureTextEntry}
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
        <View style={AuthScreenStyles.button}>
          <TouchableOpacity style={AuthScreenStyles.signIn} onPress={loginAjax}>
            <LinearGradient
              colors={['#625B71', '#7D5260']}
              style={AuthScreenStyles.signIn}>
              <Text style={{ ...AuthScreenStyles.textSign, color: '#fff' }}>
                登陆
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignupScreen')}
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
              注册
            </Text>
          </TouchableOpacity>
        </View>
      </AnimatedView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
