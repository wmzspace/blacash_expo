import {View} from "react-native";
import styles from "../../../styles";
import {Button, Divider, Text} from "react-native-paper";
import * as React from "react";

<View style={[styles.container]}>
  <View style={styles.innerContainer}>
    <Text style={{margin: 30, fontSize: 30}}>
      Main Page
    </Text>
    <Button mode="contained" onPress={() => navigation.navigate('Home')}>
      返回
    </Button>
    <Divider style={{marginVertical: 10}} />
    <Button
        mode="text"
        onPress={() => {
          toggleTheme();
        }}>
      切换深浅主题色
    </Button>
  </View>
</View>
