import React from 'react';
import {
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { LoginScreenStyles } from '../styles/LoginScreenStyles';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
  BounceIn,
  FadeInDown,
  FadeInLeft,
} from 'react-native-reanimated';
import { FormData } from '../types';

export interface ISignUpScreenProps {
  navigation: any;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const SignUpScreen: React.FunctionComponent<ISignUpScreenProps> = ({
  navigation,
}) => {
  const [formData, setFormData] = React.useState<FormData>({
    username: '',
    password: '',
    walletAddress: '',
    checkEmailInputChange: false,
    checkWalletInputChange: false,
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

  const keyboardVerticalOffset = 40;

  return (
    <View style={LoginScreenStyles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
      <StatusBar backgroundColor="#625B71" barStyle="light-content" />
      <View style={LoginScreenStyles.header}>
        <Text style={LoginScreenStyles.text_header}>Register now! 😎</Text>
      </View>
      <AnimatedView
        style={{ ...LoginScreenStyles.footer, flex: 4 }}
        entering={FadeInDown.duration(500)}>
       
          <Text style={LoginScreenStyles.text_footer}>邮箱:</Text>
          <View style={LoginScreenStyles.action}>
            <FontAwesome name="user-o" color="#333" size={20} />
            <TextInput
              placeholder="Email..."
              style={LoginScreenStyles.textInput}
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
              <Text style={LoginScreenStyles.errorMsg}>
                用户名最短要2个字符
              </Text>
            </AnimatedView>
          )}
          <Text style={{ ...LoginScreenStyles.text_footer, marginTop: 25 }}>
            密码:
          </Text>
          <View style={LoginScreenStyles.action}>
            <Feather name="lock" color="#333" size={20} />
            <TextInput
              placeholder="Password..."
              style={LoginScreenStyles.textInput}
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
              <Text style={LoginScreenStyles.errorMsg}>密码最短要6个字符</Text>
            </AnimatedView>
          )}
          <Text style={{ ...LoginScreenStyles.text_footer, marginTop: 25 }}>
            钱包地址:
          </Text>
          <View style={LoginScreenStyles.action}>
            <Feather name="lock" color="#333" size={20} />
            <TextInput
              placeholder="Wallet address..."
              style={LoginScreenStyles.textInput}
              onChangeText={val => handleWalletInputChange(val)}
            />
            {formData.checkWalletInputChange ? (
              <AnimatedView entering={BounceIn.duration(500)}>
                <Feather name="check-circle" color="green" size={20} />
              </AnimatedView>
            ) : null}
          </View>
          <View style={LoginScreenStyles.button}>
            <TouchableOpacity
              style={LoginScreenStyles.signIn}
              onPress={() => {}}>
              <LinearGradient
                colors={['#625B71', '#7D5260']}
                style={LoginScreenStyles.signIn}>
                <Text style={{ ...LoginScreenStyles.textSign, color: '#fff' }}>
                  注册
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={[
                LoginScreenStyles.signIn,
                {
                  borderColor: '#625B71',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  LoginScreenStyles.textSign,
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
    </View>
  );
};

export default SignUpScreen;
