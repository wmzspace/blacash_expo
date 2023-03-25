import { StyleSheet } from 'react-native';

export const galleryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
    backgroundColor: '#B58392',
    padding: 10,
    borderRadius: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});
