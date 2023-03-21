import {StackNavigationOptions} from '@react-navigation/stack';

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
