import * as React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PreferencesContext } from './src/context/preference';
import { Provider as PaperProvider } from 'react-native-paper';
// import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles';

// import { RootStackParamList } from './src/types';
// import routes from './src/config/routes';
// const Stack = createStackNavigator<RootStackParamList>();

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD2DarkTheme,
  MD2LightTheme,
  MD3LightTheme,
  MD3DarkTheme,
  // DefaultTheme,
  // MD2Theme,
  // MD3Theme,
} from 'react-native-paper';
import merge from 'deepmerge';
const CombinedDefaultTheme = merge(MD3LightTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, NavigationDarkTheme);
const CombinedDefaultMD2Theme = merge(MD2LightTheme, NavigationDefaultTheme);
const CombinedDarkMD2Theme = merge(MD2DarkTheme, NavigationDarkTheme);

// ==============
// ==============
import { NavigationContainer } from '@react-navigation/native';
import {
  RootStackScreen,
  RootStackScreenHasLogin,
} from './src/screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [isMD2Theme, setIsMD2Theme] = React.useState(false);
  // let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  let theme = isThemeDark
    ? isMD2Theme
      ? CombinedDarkMD2Theme
      : CombinedDarkTheme
    : isMD2Theme
    ? CombinedDefaultMD2Theme
    : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const toggleThemeStyle = React.useCallback(() => {
    return setIsMD2Theme(!isMD2Theme);
  }, [isMD2Theme]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      toggleThemeStyle,
      isMD2Theme,
    }),
    [toggleTheme, isThemeDark, toggleThemeStyle, isMD2Theme],
  );

  const [loginState, setLoginState] = React.useState(false);
  React.useEffect(() => {
    AsyncStorage.getItem('@userInfo').then(value => {
      if (value) {
        setLoginState(true);
      }
    });
  }, []);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              {loginState ? <RootStackScreenHasLogin /> : <RootStackScreen />}
            </NavigationContainer>
          </PaperProvider>
        </PreferencesContext.Provider>
      </GestureHandlerRootView>
    </>
  );
}
