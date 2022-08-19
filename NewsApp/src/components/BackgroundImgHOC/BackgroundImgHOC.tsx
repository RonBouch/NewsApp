import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";

const BackgroundImgHOC = (OriginalComponent: FC) => {
    const NewComponent: FC = (props: any) => {
        return (
            <View style={styles.container}>
                <OriginalComponent {...props} />
                <Image style={styles.img} resizeMode='cover' source={{
                    uri: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000'
                }} />
            </View>
        )
    }
    return NewComponent;

}


export default BackgroundImgHOC;

const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', zIndex: -1, },
    img: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
})
