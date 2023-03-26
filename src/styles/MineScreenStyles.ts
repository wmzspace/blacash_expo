import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const imageWidth = width * 0.7
const imageHeight = imageWidth * 1.54


export const mineScreenStyles = StyleSheet.create({
    img: {
        width: imageWidth,
        height: imageHeight,
        resizeMode: 'cover',
    }
})