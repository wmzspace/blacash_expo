import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const imageWidth = width * 0.7
const imageHeight = imageWidth * 1.54


export const mineScreenStyles = StyleSheet.create({
    img: {
        width: imageWidth,
        height: imageHeight,
        resizeMode: 'cover',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        marginBottom: 10,
    },
    absoluteFillObject: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
    }
})