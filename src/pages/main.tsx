import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import routes2 from '../config/routes2';

import {StatusBar} from 'expo-status-bar';
import {globalVal, userInfo} from '../values/global';

import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../types';
type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({route}: Props) {
  globalVal.uploadUrl = '';
  for (let item in route.params) {
    userInfo[item] = route.params[item];
    // console.log(route.params[item]);
  }
  return (
    <>
      <StatusBar />
      <Tab.Navigator>
        {routes2.map((route2: any, i: number) => (
          <Tab.Screen
            key={i}
            name={route2.name}
            component={route2.component}
            options={route2.options}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}
