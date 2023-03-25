import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator<MainBottomTabScreenProps<any>>();
const Tab = createBottomTabNavigator<any>();

import routes2 from '../config/routes2';

import { StatusBar } from 'expo-status-bar';
import { userInfo } from '../values/global';

import { RootStackScreenProps } from '../types';
import { MainBottomTabScreenProps } from '../types';
import Ionicons from '@expo/vector-icons/Ionicons'
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
            let iconName;
            if (route.name === 'gallery') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }
            // if (route.name === 'gallery') {
              //   iconName = focused
              //     ? 'ios-information-circle'
            //     : 'ios-information-circle-outline';
            // } else if (route.name === 'Settings') {
            //   iconName = focused ? 'ios-list' : 'ios-list-outline';
            // }
            if (route.name === 'Gallery') {
              iconName = 'home-outline'
            } else if (route.name === 'Mine' ){
              iconName = 'ios-person-outline'
            } else if (route.name === 'Upload') {
              iconName = 'cloud-upload-outline'
            } else if (route.name === 'Message') {
              iconName = 'chatbubble-ellipses-outline'
            } else {
              iconName = 'settings-outline'
            }
            //@ts-ignore
            return <Ionicons name={iconName} size={size} color={color} />;
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
