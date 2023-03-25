import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  // Main: any;
  // Main: {
  //   email: string;
  // };
  Main: NavigatorScreenParams<MainBottomTabParamList>;
  NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainBottomTabParamList = {
  Gallery: undefined;
  Mine: undefined;
  Upload: undefined;
  Message: undefined;
  Account: undefined;
};

export type MainBottomTabScreenProps<T extends keyof MainBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type ScreenRoute = {
  name: string;
  component: any;
  options?: StackNavigationOptions;
  // headerShown?: boolean;
};

export type ScreenRoute2 = {
  name: string;
  component: any;
  options?: BottomTabNavigationOptions;
  // headerShown?: boolean;
};

export type FormData = {
  username: string;
  password: string;
  walletAddress?: string;
  checkEmailInputChange: boolean;
  checkWalletInputChange?: boolean;
  secureTextEntry: boolean;
  isValidUser: boolean;
  isValidPassword: boolean;
};

export type ImageNft = {
  certificate: string;
  id: number;
  nftname: string;
  owner: string;
  price: number;
  state: number;
  url: string;
};

export type Message = {
  address: string;
  content: string;
  id: number;
  time: string;
};
