import {StackNavigationOptions} from '@react-navigation/stack';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  // Main: any;
  Main: {
    email: string;
  };
  NotFound: undefined;
};

export type RootBottomTabParamList = {
  Gallery: undefined;
  Upload: undefined;
  Account: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

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
