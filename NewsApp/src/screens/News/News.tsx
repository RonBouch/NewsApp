import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { RenderNews, Search } from '../../components';
import { debounce } from "lodash";
import { NewsStore } from '../../stores';
import { categories, getNewsFromApi } from '../../utils/Tools';
import ModalDropdown from 'react-native-modal-dropdown';
import { Categories } from '../../utils/Enums';

const News = observer(() => {
    const [searchValue, setSearchValue] = useState('');
    const [isSelectedFilter, setSelectedFilter] = useState(Categories.general);

    const getDataWithFilter = (e: string) => {
        NewsStore.setNewsWithFilter(e)
        NewsStore.setLoader(false)
    }

    const handleNewDataWithDebounce: any = useCallback(debounce(getDataWithFilter, 1000), []);

    const handleChangeText = useCallback((e: string) => {
        setSearchValue(e)
        if (e.length > 2) {
            NewsStore.setLoader(true)
            handleNewDataWithDebounce(e);
        } else if (e.length == 2) {
            NewsStore.setLoader(true)
            handleNewDataWithDebounce();
        }
    }, [searchValue]);

    const getDataByCategory = async (category: string) => {
        NewsStore.setLoader(true)
        getNewsFromApi(category);
    }

    const onSearchClear = useCallback(() => {
        setSearchValue('')
        NewsStore.setNewsWithFilter()
    }, [searchValue]);

    const RenderCategories = () => {
        return (
            <View style={styles.categoryCon}>
                <Text style={[styles.categoryTxt]}>Choose category: </Text>
                <ModalDropdown
                    style={styles.dropdown_3}
                    defaultIndex={0}
                    defaultValue={isSelectedFilter}
                    options={categories}
                    dropdownTextStyle={styles.dropdown_3_dropdownTextStyle}
                    textStyle={styles.dropdown_3_txtStyle}
                    dropdownTextHighlightStyle={styles.dropdown_3_dropdownTextHighlightStyle}
                    onSelect={(index: string, option: string) => {
                        getDataByCategory(option);
                        setSelectedFilter(option);
                    }}
                />
            </View >
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.filterCon}>
                <Search
                    value={searchValue}
                    onChange={handleChangeText}
                    onSearchClear={onSearchClear}
                />
                <RenderCategories />
            </View>
            {(!NewsStore.getLoader) ? <FlatList
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
export default (News);

const styles = StyleSheet.create({
    container: {
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
    btn: {
        padding: 10,
        backgroundColor: 'gray',
    },
    btnSelected: {
        padding: 10,
        backgroundColor: 'blue',
    },

    categoryCon: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 20,
        alignItems: 'center',
        marginTop: 20
    },
    dropdown_3: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: 210,
    },
    dropdown_3_dropdownTextStyle: {
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 16,
    },
    dropdown_3_dropdownTextHighlightStyle: {
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdown_3_txtStyle: {
        fontSize: 16,
        fontWeight: 'bold'

    },
    categoryTxt: {
        fontSize: 16,
        color: 'black',
    },
    filterCon: { width: '100%', height: 120 },
});