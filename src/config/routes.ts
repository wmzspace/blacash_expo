import { ScreenRoute } from 'src/types';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../pages/main';

const routes: ScreenRoute[] = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'LoginScreen',
    component: LoginScreen,
    options: {
      headerShown: false,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'SignupScreen',
    component: SignupScreen,
    options: {
      headerShown: false,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'Main',
    component: MainScreen,
    options: {
      headerShown: false,
      headerTitleAlign: 'center',
    },
  },
];

export default routes;
