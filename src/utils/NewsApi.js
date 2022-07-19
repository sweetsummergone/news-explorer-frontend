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

    getNews({query, apiKey='04caf5ef404c43a8bbb985c915609a4d', from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA'), to = new Date(Date.now()).toLocaleDateString('en-CA'), pageSize=100}) {
        return fetch(`${this._baseUrl}/everything?q=${query}&apiKey=${apiKey}&from=${from}&to=${to}&pageSize=${pageSize}`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }
}

const api = new NewsApi({
    baseUrl: "https://nomoreparties.co/news/v2"
});
  
export default api;