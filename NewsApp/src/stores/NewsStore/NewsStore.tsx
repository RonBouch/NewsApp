import { makeAutoObservable, makeObservable, observable, action, computed } from 'mobx'
class NewsStore {
    news: any[] = [];
    loader: boolean = false;
    newsWithFilter: any[] = [];


    constructor() {
        // makeAutoObservable(this)
        makeObservable(this, {
            news: observable,
            loader: observable,
            newsWithFilter: observable,

            setNews: action,
            setLoader: action,
            setNewsWithFilter: action,

            getNews: computed,
            getLoader: computed,
            getNewsWithFilter: computed,
            getOriginalNews: computed,
        });
    }

    setNewsWithFilter(searchValue?: string) {
        if (searchValue)
            this.newsWithFilter = this.news.slice().filter(item => (item.title.toUpperCase().includes(searchValue.toUpperCase())))
        else {
            this.newsWithFilter = this.news.slice();
        }
    }


    setNews(data: any[]) {
        this.news = data;
        this.newsWithFilter = data;
    }

    setLoader(data: boolean) {
        this.loader = data;
    }

    get getLoader() {
        return this.loader
    }

    get getNews() {
        return this.newsWithFilter
    }
    get getOriginalNews() {
        return this.news;
    }

    get getNewsWithFilter() {
        return this.newsWithFilter;
    }
}

const newsStore = new NewsStore();
export default newsStore;
