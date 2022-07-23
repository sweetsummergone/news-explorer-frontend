export const BASE_URL = "https://api.coolnews.students.nomoredomainssbs.ru";

const _checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }

  return Promise.reject(`Error ${res.status}: ${res.statusText}`);
}

const customFetch = ({ path, method, data }) => {
  return fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(_checkResponse);
};

export const register = (email, password, username) => {
  return customFetch({
    path: "/signup",
    method: "POST",
    data: { email, password, name: username },
  })
};

export const authorize = (email, password) => {
  return customFetch({
    path: "/signin",
    method: "POST",
    data: { email, password },
  }).then((data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    return data;
  });
};

export const logout = () => {
  localStorage.removeItem("jwt");
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
};