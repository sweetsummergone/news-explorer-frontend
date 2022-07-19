class NewsApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    }

    getNews({query}) {
        return fetch(`${this._baseUrl}/everything`, {
            headers: this._headers,
            body: JSON.stringify({query})
        })
        .then(this._checkResponse);
    }

    getSavedNews() {
        // To do
    }

    saveNews() {
        // To do
    }

    removeNews() {
        // To do
    }
}

const api = new NewsApi({
    baseUrl: "http://localhost:3001"
});
  
export default api;