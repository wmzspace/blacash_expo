import React from 'react';
import {
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
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

  return (
    <KeyboardAvoidingView behavior='height' style={AuthScreenStyles.container}>
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
              <Text style={AuthScreenStyles.errorMsg}>
                用户名最短要2个字符
              </Text>
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
          <View style={AuthScreenStyles.button}>
            <TouchableOpacity
              style={AuthScreenStyles.signIn}
              onPress={() => {}}>
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
