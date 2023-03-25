import { StyleSheet } from 'react-native';

export const galleryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  item: {
    margin: 10,
    backgroundColor: '#B58392',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#939094',
  },
  itemDetail: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#B58392',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#939094',
    gap: 20,
  },
  itemGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  itemPhoto: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
    fontWeight: '600'
  },
});
