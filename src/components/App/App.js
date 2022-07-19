import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';

export default function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route
            exact
            path='/main'
            element={ <Main /> }
          />
          <Route
            path='/saved-news'
            element={ <SavedNews /> }
          />
          <Route
            path='/*'
            element={ <Navigate to='/main' /> }
          />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}
