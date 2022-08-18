import { makeAutoObservable, makeObservable, observable, action, computed } from 'mobx'
class NewsStore {
    news: any[] = [];
    user: any = [];
    loader: boolean = false;
    newsWithFilter: any[] = [];


    constructor() {
        // makeAutoObservable(this)
        makeObservable(this, {
            news: observable,
            user: observable,
            loader: observable,

            setUser: action,
            setNews: action,
            setLoader: action,
            setNewsWithFilter: action,

            getUser: computed,
            getNews: computed,
            getLoader: computed,
            getNewsWithFilter: computed,
        });
    }

    setNewsWithFilter(data?: any) {
        this.newsWithFilter = data;
    }


    setUser(data: object) {
        this.user = data;
    }

    setNews(data: any[]) {
        this.news = data;
    }

    setLoader(data: boolean) {
        this.loader = data;
    }

    get getLoader() {
        return this.loader
    }

    get getUser() {
        return this.user
    }

    get getNews() {
        return this.news
    }

    get getNewsWithFilter() {
        return this.newsWithFilter;
    }
    // setProducts(data) {
    //     this.products = data;
    //     this.originalProducts = data;
    //     this.loader = false;
    // }

    // setProductsWithFilter(searchValue) {
    //     if (searchValue)
    //         this.products = this.originalProducts.slice().filter(item => (item.PARTDES.includes(searchValue) || item.PARTNAME.includes(searchValue)))
    //     else {
    //         this.products = this.originalProducts.slice();
    //     }
    // }

    // setLoader(data) {
    //     this.loader = data
    // }

    // get getProducts() {
    //     return this.products;
    // }

    // get getOriginalProducts() {
    //     return this.originalProducts;
    // }

    // get isLoaderVisible() {
    //     return this.loader;
    // }


}

const newsStore = new NewsStore();
export default newsStore;
