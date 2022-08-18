import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, Image } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { RenderNews, Search } from '../../components';
import { debounce } from "lodash";
import { NewsStore } from '../../stores';

const News = observer(({ }) => {
    const [searchValue, setSearchValue] = useState('');

    const getDataWithFilter = (e: []) => {
        NewsStore.setNewsWithFilter(e)
        NewsStore.setLoader(false)
    }

    const handleNewDataWithDebounce: any = useCallback(debounce(getDataWithFilter, 1000), []);

    const handleChangeText = useCallback((e: any) => {
        setSearchValue(e)
        if (e.length > 2) {
            NewsStore.setLoader(true)
            handleNewDataWithDebounce(e);
        } else if (e.length == 2) {
            NewsStore.setLoader(true)
            handleNewDataWithDebounce();
        }
    }, [searchValue]);

    const onSearchClear = useCallback(() => {
        setSearchValue('')
        NewsStore.setNewsWithFilter()
    }, [searchValue]);

    return (
        <View style={styles.container}>
            <ImageBackground style={{ position: 'absolute', opacity: 0.7, height: '100%', width: '100%', zIndex: -1 }} resizeMode='cover' source={{
                uri: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000'
            }} />
            <View style={{ width: '100%', height: 150 }}>

                <Search
                    cover={searchValue}
                    onChange={handleChangeText}
                    onSearchClear={onSearchClear}
                />

            </View>
            {(!NewsStore.getLoader && NewsStore.getNews.length) ? <FlatList
                data={NewsStore.getNews.slice()}
                initialNumToRender={10}
                renderItem={(({ item }) => <RenderNews item={item} />)}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => <Text style={styles.noRes}>{searchValue && NewsStore.getLoader ? <View /> : 'No-Results'}</Text>}
            /> :
                <MaterialIndicator color='gray' />
            }
        </View>
    );
});
export default News;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(243,243,242)',
        flex: 1,
        marginVertical: 10,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
    noRes: {
        color: 'rgb(151,145,145)',
        fontSize: 28,
        alignSelf: 'center',
        marginTop: 30,
    },
});