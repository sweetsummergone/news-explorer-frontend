class MainApi {
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

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }
}

const api = new MainApi({
    baseUrl: "http://localhost:3001", 
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json"
    }
});
  
export default api;