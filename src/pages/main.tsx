import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator<MainBottomTabScreenProps<any>>();
// import { MainBottomTabScreenProps } from '../types';
const Tab = createBottomTabNavigator<any>();

import routes2 from '../config/routes2';

import { StatusBar } from 'expo-status-bar';
import { userInfo } from '../values/global';

import { RootStackScreenProps } from '../types';
import Ionicons from '@expo/vector-icons/Ionicons';
type Props = RootStackScreenProps<'Main'>;

export default function MainScreen({ route }: Props) {
  // globalVal.uploadUrl = '';
  for (let item in route.params) {
    userInfo[item] = route.params[item];
    // console.log(route.params[item]);
  }
  return (
    <>
      <StatusBar />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={
                  route.name === 'Gallery'
                    ? 'home-outline'
                    : route.name === 'Mine'
                    ? 'ios-person-outline'
                    : route.name === 'Upload'
                    ? 'cloud-upload-outline'
                    : route.name === 'Message'
                    ? 'chatbubble-ellipses-outline'
                    : 'settings-outline'
                }
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: '#6750A4',
          tabBarInactiveTintColor: '#939094',
        })}>
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
