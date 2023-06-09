import { Dimensions, StyleSheet, NativeModules } from 'react-native';
let deviceHeight =
  Dimensions.get('window').height / Dimensions.get('window').width > 1.8
    ? Dimensions.get('window').height + NativeModules.StatusBarManager.HEIGHT
    : Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: deviceHeight,
  },
  innerContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineFlex: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 245,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'rgba(171, 190, 215, 0.56)',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    width: 200,
    height: 50,
    fontSize: 14,
  },
  button2: {
    alignItems: 'center',
    // paddingHorizontal: 20,
    marginHorizontal: 30,
    marginVertical: 23,
    // paddingVertical: 10,
    // marginBottom: 23,
    borderRadius: 12,
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 90,
    paddingVertical: 10,
    marginBottom: 23,
    margin: 25,
    borderRadius: 10,
  },
  disabledButton: {
    alignItems: 'center',
    paddingHorizontal: 90,
    paddingVertical: 10,
    marginBottom: 23,
    margin: 25,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
  lightBackgroundColor: {
    backgroundColor: '#fcfcfc',
  },
  darkBackgroundColor: {
    backgroundColor: '#181818',
  },
  lightColor: {
    color: '#fcfcfc',
  },
  darkColor: {
    color: 'black',
  },
  lightTheme: {
    backgroundColor: '#7D5260',
    color: '#FFFFFF',
  },
  darkTheme: {
    backgroundColor: '#EFB8C8',
    color: '#492532',
  },
});

export default styles;
