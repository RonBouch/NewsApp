import { observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { noImgAvailable } from "../../utils/Tools";

const Details = observer(({ route }: any) => {
    const details = route?.params

    const { author, content, description, publishedAt, source, url, urlToImage, title } = details

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.publishedAt}>{moment(publishedAt).format("YYYY/MM/DD - HH:mm")}</Text>
            <Text style={styles.author}>{author}</Text>

            <Image source={{ uri: urlToImage || noImgAvailable }} style={styles.img} onError={() => console.log("----ERR ")} />
            <Text style={styles.about}>{description}</Text>
            <View style={styles.middleBorder} />
            <Text style={styles.content}>{content}</Text>

        </View >
    )
})


export default (Details);


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 4,
        padding: 14,
        width: '96%',

    },
    readMoreTxt: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },

    widthWithImg: { maxWidth: 210 },
    readMoreContainer: {
        backgroundColor: '#FFDC2D',
        padding: 6,
        borderRadius: 20
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    img: { width: '100%', height: 200, alignSelf: 'center', marginVertical: 14, borderRadius: 2 },
    about: { color: 'black', fontSize: 16, opacity: 0.8 },
    content: { color: 'black', fontSize: 14 },
    bottomContainer: { flexDirection: 'row', marginTop: 10, width: '100%', alignItems: 'center' },
    publishedAt: { fontSize: 14, color: "#222223", opacity: 0.6, marginTop: 4 },
    author: { fontSize: 14, color: "#222223", opacity: 0.8, marginTop: 4 },
    moreInfo: { backgroundColor: '#ffa100', padding: 6, borderRadius: 20 },
    moreInfoTxt: { color: 'white', fontWeight: 'bold' },
    middleBorder: { borderWidth: 0.5, alignSelf: 'center', width: 100, borderColor: 'gray', marginVertical: 10 },
});
