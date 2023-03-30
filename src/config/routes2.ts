import { ScreenRoute2 } from 'src/types';
import GalleryScreen from '../pages/gallery';
import AccountScreen from '../pages/account';
import UploadScreen from '../pages/upload';
import MineScreen from '../pages/mine';
import MessageScreen from '../pages/message';

const routes2: ScreenRoute2[] = [
  {
    name: 'Gallery',
    component: GalleryScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#958DA5',
        height: 100,
      },
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'monospace',
        letterSpacing: 1,
        fontWeight: 'bold',
        paddingBottom: 10,
      }
    },
  },
  {
    name: 'Mine',
    component: MineScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#958DA5',
        height: 100,
      },
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'monospace',
        letterSpacing: 1,
        fontWeight: 'bold',
        paddingBottom: 10,
      }
    },
  },
  {
    name: 'Upload',
    component: UploadScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#958DA5',
        height: 100,
      },
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'monospace',
        letterSpacing: 1,
        fontWeight: 'bold',
        paddingBottom: 10,
      }
    },
  },
  {
    name: 'Message',
    component: MessageScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#958DA5',
        height: 100,
      },
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'monospace',
        letterSpacing: 1,
        fontWeight: 'bold',
        paddingBottom: 10,
      }
    },
  },
  {
    name: 'Account',
    component: AccountScreen,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#958DA5',
        height: 100,
      },
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'monospace',
        letterSpacing: 1,
        fontWeight: 'bold',
        paddingBottom: 10,
      }
    },
  },
];

export default routes2;
