import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { observer } from "mobx-react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../utils/Enums";
import { noImgAvailable } from "../../utils/Tools";


const RenderNews = observer(({ item }) => {
    const navigation = useNavigation()
    console.log("🚀 ~ file: RenderNews.tsx ~ line 10 ~ RenderNews ~ props", item)
    const { author, content, description, publishedAt, source, url, urlToImage, title } = item

    // const { description, image, title } = item
    return (
        <View key={item.BARCODE} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.publishedAt}>{moment(item?.publishedAt).format("YYYY/MM/DD - HH:mm")}</Text>

            <Image source={{ uri: urlToImage || noImgAvailable }} style={styles.img} onError={() => console.log("----ERR ")} />

            <Text style={styles.about}>{item?.description.slice(0, 80)}</Text>

            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(SCREENS.Details, item)} style={[styles.readMoreContainer,]}>
                    <Text style={styles.readMoreTxt}>Read More</Text>
                </TouchableOpacity>

            </View>
        </View >
    )
});

export default RenderNews;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 4,
        padding: 14,
        width: '96%',
        borderBottomWidth: 0.2,

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
        fontSize: 14,
    },
    img: { width: '100%', height: 200, alignSelf: 'center', marginVertical: 14, borderRadius: 2 },
    about: { color: 'black', opacity: 0.8 },
    bottomContainer: { flexDirection: 'row', marginTop: 10, width: '100%', alignItems: 'center' },
    publishedAt: { fontSize: 14, color: "#222223", opacity: 0.6, marginTop: 4 },
    moreInfo: { backgroundColor: '#ffa100', padding: 6, borderRadius: 20 },
    moreInfoTxt: { color: 'white', fontWeight: 'bold' },
});
