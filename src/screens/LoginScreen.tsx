import React from 'react';
import {
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LoginScreenStyles } from '../styles/LoginScreenStyles';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export interface ILoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FunctionComponent<ILoginScreenProps> = ({
  navigation,
}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  return (
    <View style={LoginScreenStyles.container}>
      <StatusBar backgroundColor="#625B71" barStyle="light-content" />
      <View style={LoginScreenStyles.header}>
        <Text style={LoginScreenStyles.text_header}>Welcome back! 😊</Text>
      </View>
      <View style={LoginScreenStyles.footer}>
        <Text style={LoginScreenStyles.text_footer}>邮箱:</Text>
        <View style={LoginScreenStyles.action}>
          <FontAwesome name="user-o" color="#333" size={20} />
          <TextInput
            placeholder="Email..."
            style={LoginScreenStyles.textInput}
            autoCapitalize="none"
          />
          <Feather name="check-circle" color="green" size={20} />
        </View>
        <Text style={{ ...LoginScreenStyles.text_footer, marginTop: 25 }}>
          密码:
        </Text>
        <View style={LoginScreenStyles.action}>
          <Feather name="lock" color="#333" size={20} />
          <TextInput
            placeholder="Password..."
            style={LoginScreenStyles.textInput}
            autoCapitalize="none"
          />
          <Feather name="check-circle" color="green" size={20} />
        </View>
        <View style={LoginScreenStyles.button}>
          <TouchableOpacity style={LoginScreenStyles.signIn} onPress={() => {}}>
            <LinearGradient
              colors={['#625B71', '#7D5260']}
              style={LoginScreenStyles.signIn}>
              <Text style={{ ...LoginScreenStyles.textSign, color: '#fff' }}>
                登陆
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
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
              注册
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
