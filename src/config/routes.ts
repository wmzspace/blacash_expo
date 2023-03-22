import { ScreenRoute } from 'src/types';
import HomeScreen from '../pages/home';
import LoginScreen from '../pages/login';
import SignupScreen from '../pages/signup';
import MainScreen from '../pages/main';

const routes: ScreenRoute[] = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'Signup',
    component: SignupScreen,
    options: {
      headerShown: true,
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
