import * as React from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

import HomeScreen from './src/pages/home';
import SignupScreen from './src/pages/signup';
import LoginScreen from './src/pages/login';
// import MainScreen from './src/pages/main';

import styles from './styles';

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                  headerShown: false,
                }}
              />

              {/*TODO: Add Stack.Screen when adding pages*/}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </>
  );
}
