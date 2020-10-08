const apiKey = '18602896-269905921176f8eb36b1925d1';

export default {
    inputValue: '',
    page: 1, 
    remainingArticles: null,
    fethcArticles(){
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.inputValue}&page=${this.page}&per_page=12&key=${apiKey}`;
        console.log(url);
        return fetch(url)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                console.log(this.page);
                this.remainingArticles = data.total - 12*(this.page-1);
                console.log(this.remainingArticles);
                this.page +=1;
                return data;
            });
    },
    resetPage() {
        return this.page = 1;
    },
    get querry() {
        return this.inputValue;
    },
    set querry(value) {
        return this.inputValue = value;
    }     
};
