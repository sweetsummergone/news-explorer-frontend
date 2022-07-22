class MainApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    customFetch = ({ path, method, data }) => {
        return fetch(`${this._baseUrl}${path}`, {
          method,
          headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(this._checkResponse);
    };

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    saveArticle({ keyword, title, text, date, source, link, image }) {
        return this.customFetch({
            path: "/articles",
            method: "POST",
            data: { keyword, title, text, date, source, link, image },
        })
        .then((data) => {
            return data;
        })
    }

    removeArticle(articleId) {
        return fetch(`${this._baseUrl}/articles/${articleId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    removeByLink(link) {
        return this.customFetch({
            path: "/articles",
            method: "DELETE",
            data: { url: link },
        })
        .then((data) => {
            return data;
        })
    }

    getArticles() {
        return fetch(`${this._baseUrl}/articles`, {
            headers: this._headers,
        })
        .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    }
}

const mainApi = new MainApi({
    baseUrl: "http://localhost:3001", 
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});
  
export default mainApi;