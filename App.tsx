import * as React from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/types';
// import MainScreen from './src/pages/main';
import {StatusBar} from 'expo-status-bar';
import styles from './styles';

import routes from './src/config/routes'

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar hidden={false} />
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              {routes.map((route: any, i: number) => (
                <Stack.Screen key={i} name={route.name} component={route.component} options={{ headerShown: false }} />
              ))}

              {/*TODO: Add Stack.Screen when adding pages*/}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </>
  );
}
