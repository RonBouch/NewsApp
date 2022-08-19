import { NewsStore } from "../stores";
import localeData from '../assets/localData/newsLocalData.json'

export const noImgAvailable = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg';

export const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

export const getNewsFromApi = async (category: string = 'general') => {
    try {
        const API_KEY = `55a5fe016b6845c9910ab4cb328e99a9`;
        const endpoint = `http://newsapi.org/v2/top-headlines`;
        const country = 'in'
        let articles = await fetch(`${endpoint}?country=${country}&category=${category}`, {
            headers: {
                'X-API-KEY': API_KEY,
                'Access-Control-Allow-Origin': '*',
            }
        });

        let result = await articles.json();
        NewsStore.setNews(result?.articles.length ? result?.articles : localeData || []);
        NewsStore.setLoader(false)
    }
    catch (ex: any) {
        NewsStore.setNews(localeData);
        console.log('MainRoot init Error ' + ex.message)
    }
}