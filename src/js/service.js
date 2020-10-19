const apiKey = '18602896-269905921176f8eb36b1925d1';

export default {
    inputValue: '',
    page: 1, 
    remainingArticles: null,
    fetchArticles(){
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.inputValue}&page=${this.page}&per_page=12&key=${apiKey}`;
        return fetch(url)
            .then(res => res.json())
            .then(data => {
                this.remainingArticles = data.total - 12 * (this.page);
                this.page += 1;
                return data;
            });
    },
    resetPage() {
        return this.page = 1;
    },
    get query() {
        return this.inputValue;
    },
    set query(value) {
        return this.inputValue = value;
    }     
};
