import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import routes2 from '../config/routes2';

import {StatusBar} from 'expo-status-bar';

export default function MainScreen() {
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
