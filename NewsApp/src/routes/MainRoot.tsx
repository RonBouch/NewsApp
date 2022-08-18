import React, { useEffect } from 'react';
import RootNavigator from './RootNavigator';
import { Platform, StyleSheet, View } from 'react-native'
import { NewsStore } from "../stores";
import isEmpty from "lodash/isEmpty";
import localData from '../assets/localData/newsLocalData.json'
const MainRoot = () => {

    useEffect(() => {
        getNewData();
    }, []);

    const getNewData = async () => {
        try {
            const API_KEY = `55a5fe016b6845c9910ab4cb328e99a9`;
            const endpoint = `http://newsapi.org/v2/top-headlines`;
            const country = 'in'
            // const url = 'https://newsapi.org/v2/top-headlines&apiKey=55a5fe016b6845c9910ab4cb328e99a9';
            // let articles = await fetch(`${endpoint}?country=${country}&category=${'general'}`, {
            //     headers: {
            //         'X-API-KEY': API_KEY,
            //         'Access-Control-Allow-Origin': '*',
            //     }
            // });

            // let result = await articles.json();
            // console.log("🚀 ~ file: MainRoot.tsx ~ line 28 ~ getNewData ~ result", result)
            // NewsStore.setNews(result?.articles || []);
            NewsStore.setNews(localData || []);
        }
        catch (ex: any) {
            NewsStore.setNews([]);
            console.log('MainRoot init Error ' + ex.message)
        }
    }

    return (
        <React.Fragment>
            <RootNavigator />
        </React.Fragment>
    )
}
export default MainRoot;

const styles = StyleSheet.create({
    toastContainer: { height: 140, width: '100%', backgroundColor: '#090d74', paddingHorizontal: 32, justifyContent: 'center', top: Platform.OS == 'android' ? -46 : 0 },
    subContainer: { justifyContent: 'space-between', flexDirection: 'row' },
})



