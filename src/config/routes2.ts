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
      headerShown: false,
      // headerTitleAlign: 'center',
    },
  },
  {
    name: 'Upload',
    component: UploadScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Account',
    component: AccountScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Mine',
    component: MineScreen,
    options: {
      headerShown: false,
    },
  },
];

export default routes2;
