import React, { Fragment, useReducer, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNews from "../SavedNews/SavedNews";
import Main from "../Main/Main";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import * as AuthReducer from "../../store/reducers/authReducer";
import * as ACTIONS from "../../store/actions/actions";
import * as auth from "../../utils/auth";

export default function App() {
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer.AuthReducer,
    AuthReducer.initialState
  );

  const checkToken = (token) => {
    return auth.checkToken(token);
  };

  const handleLogin = (token) => {
    checkToken(token)
    .then((user) => {
      if (user.email) {
        dispatchAuthReducer(ACTIONS.login({ user, token }));
      }
    })
    .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.logout());
    auth.logout();
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      checkToken(token)
        .then((user) => {
          console.log(user);
          if (user.email) {
            dispatchAuthReducer(ACTIONS.login({ user, token }));
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        isAuth: stateAuthReducer.isAuth,
        currentUser: stateAuthReducer.currentUser,
        token: stateAuthReducer.token,
        handleUserLogin: (token) => handleLogin(token),
        handleUserLogout: () => handleLogout(),
      }}
    >
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route exact path='/main' element={<Main />} />
            <Route path='/saved-news' element={
              <ProtectedRoute
                loggedIn={stateAuthReducer.isAuth}
                component={SavedNews}
              />
            } />
            <Route path='/*' element={<Navigate to='/main' />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}
