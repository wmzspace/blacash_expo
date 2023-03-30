import React, {useState, useEffect} from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';

import * as Location from 'expo-location';
import styles from '../../styles/SplashScreenStyle';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else {
        console.log('Granted!');
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.innerContainer}>
      <Text>{text}</Text>
    </View>
  );
}
