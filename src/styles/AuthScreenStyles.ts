import { Dimensions, Platform, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('screen');

export const AuthScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#625B71',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -4,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    justifyContent: 'center',
    flexDirection:'row',
    gap: 10
  },
  modal: {
    backgroundColor: '#B58392',
    padding: 20,
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    height: height * 0.3,
    width: width * 0.8,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  modalBtn: {
    borderColor: '#FFFFFF',
    fontSize: 14,
    width: width * 0.3,
  },
});
