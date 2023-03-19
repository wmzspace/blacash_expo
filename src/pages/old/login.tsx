import * as React from 'react';
import {StyleSheet, View, TouchableHighlight, Alert} from 'react-native';

import {Text, TextInput, HelperText, Button} from 'react-native-paper';

import {StatusBarComp} from '../@components/StatusBarComp';
import styles from '../styles';

import {serverIPP} from '../values/strings';
import {PreferencesContext} from '../context/preference';

const style = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 245,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'rgba(171, 190, 215, 0.56)',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textInput: {
    // backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    marginVertical: 8,
    width: 250,
    height: 50,
    fontSize: 14,
  },
});

export default function LoginScreen({navigation}) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameIsValid, setUserNameValidation] = React.useState(false);
  const [passwordIsValid, setPasswordValidation] = React.useState(false);

  const sendAjax = () => {
    fetch('http://' + serverIPP + '/login', {
      method: 'POST',
      mode: 'cors',
      //same-origin - 同源请求，跨域会报error
      //no-cors - 默认，可以请求其它域的资源，不能访问response内的属性
      //cros - 允许跨域，可以获取第三方数据，必要条件是访问的服务允许跨域访问
      //navigate - 支持导航的模式。该navigate值仅用于HTML导航。导航请求仅在文档之间导航时创建。
      body: `email=${userName}&password=${password}`, // 上传到后端的数据
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
                    {text: '确定', onPress: () => {}},
                  ]);
                  break;

                case '0':
                  Alert.alert('登陆失败', '密码错误', [
                    {text: '确定', onPress: () => {}},
                  ]);
                  break;
                default:
                  let resDict = JSON.parse(responseData);
                  Alert.alert('登陆成功', `欢迎您: ${userName}`, [
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
            {text: '确定', onPress: () => console.log('OK Pressed!')},
          ]);
        }
      })
      .catch(err => {
        console.log('err', err);
        Alert.alert('请求失败', err, [
          {text: '确定', onPress: () => console.log('OK Pressed!')},
        ]);
        // reject(err);
      });
  };

  // const theme = useTheme();
  const {isThemeDark} = React.useContext(PreferencesContext);

  return (
    <View style={[styles.container]}>
      <StatusBarComp isDarkStyle={isThemeDark} />
      <View style={{alignItems: 'center'}}>
        {/* <View style={{alignItems: 'center'}}> */}
        <Text style={{marginTop: 60, marginBottom: 20, fontSize: 20}}>
          BlaCash 登录
        </Text>
        <View>
          {/*<MaterialCommunityIcons*/}
          {/*  name="account"*/}
          {/*  size={30}*/}
          {/*  style={style.icon}*/}
          {/*/>*/}
          {/*<Button icon={require('../assets/')}>Press me</Button>*/}
          <TextInput
            style={style.textInput}
            placeholder="邮箱"
            placeholderTextColor={isThemeDark ? '#fcfcfc' : '#181818'}
            clearButtonMode="always"
            selectionColor="skyblue"
            maxLength={19}
            onChangeText={_userName => {
              setUserName(_userName);
              setUserNameValidation(
                _userName.includes('@') && _userName.includes('.'),
              );
              // dispatch({type: 'userName', userName: userName});
            }}
            left={<TextInput.Icon icon="email" />}
          />
          <HelperText
            type="error"
            style={{
              display: !(userNameIsValid || !userName.length) ? 'flex' : 'none',
            }}>
            邮箱格式不正确
          </HelperText>

          <TextInput
            style={style.textInput}
            placeholder="密码"
            placeholderTextColor={isThemeDark ? '#fcfcfc' : '#181818'}
            secureTextEntry={true}
            clearButtonMode="always"
            selectionColor="skyblue"
            maxLength={19}
            onChangeText={_password => {
              setPassword(_password);
              setPasswordValidation(_password.length >= 6);
              // dispatch({type: 'password', password: password});
            }}
            left={<TextInput.Icon icon="lock" />}
          />

          {/*<Text*/}
          {/*  style={{*/}
          {/*    alignContent: 'flex-start',*/}
          {/*    color: 'red',*/}
          {/*    marginBottom: 10,*/}
          {/*    display:*/}
          {/*      (userNameIsValid && passwordIsValid) ||*/}
          {/*      !(userName.length * password.length)*/}
          {/*        ? 'none'*/}
          {/*        : 'flex',*/}
          {/*  }}>*/}
          {/*  用户名和密码需至少6个字符*/}
          {/*</Text>*/}

          <HelperText
            type="error"
            style={{
              display: !(
                (userNameIsValid && passwordIsValid) ||
                !(userName.length * password.length)
              )
                ? 'flex'
                : 'none',
            }}>
            密码需至少6个字符
          </HelperText>

          <Text style={{alignContent: 'flex-start', paddingTop: 20}}>
            没有账号？
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              立即注册
            </Text>
          </Text>
        </View>

        <TouchableHighlight
          onPress={() => sendAjax()}
          disabled={!(userNameIsValid && passwordIsValid)}
          style={
            userNameIsValid && passwordIsValid
              ? [styles.button, {backgroundColor: 'blue'}]
              : styles.disabledButton
          }>
          {/*<Text style={[style.buttonText, {color: '#f5fcfa', fontSize: 16}]}>*/}
          <Text style={[{color: '#f5fcfa', fontSize: 16}]}>登录</Text>
        </TouchableHighlight>
        <Button
          onPress={() => {
            // await fetch(serverIPP + '/userInfo', {
            //   method: 'POST',
            //   mode: 'cors',
            //   headers: {
            //     'content-Type': 'json',
            //     Accept: 'text',
            //   },
            // })
            //   .then(res => {
            //     if (res) {
            //       res.json().then(resData => {
            //         console.log(resData);
            //       });
            //     } else {
            //       console.log('Error request');
            //     }
            //   })
            //   .catch(e => {
            //     console.log(e.message);
            //   });
            navigation.navigate('Main', {
              email: userName,
            });
          }}>
          管理员入口
        </Button>
      </View>
    </View>
  );
}
