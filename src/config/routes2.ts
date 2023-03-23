import {ScreenRoute2} from 'src/types';
import GalleryScreen from '../pages/gallery';
import AccountScreen from '../pages/account';
import UploadScreen from '../pages/upload';
import MineScreen from '../pages/mine';

const routes2: ScreenRoute2[] = [
  {
    name: 'Gallery',
    component: GalleryScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'Mine',
    component: MineScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'Upload',
    component: UploadScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
  {
    name: 'Account',
    component: AccountScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
    },
  },
];

export default routes2;
