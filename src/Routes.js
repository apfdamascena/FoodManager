import React from 'react';
import { withCookies } from 'react-cookie';
import { BrowserRouter, Route } from 'react-router-dom';


import MainPage from './Components/Pages/MainPage/MainPage';
import AddSalePage from './Components/Pages/AddSalePage/AddSalePage';
import AddProductPage from './Components/Pages/AddProductPage/AddProductPage';
import AuthenticationPage from './Components/Pages/AuthenticationPage/AuthenticationPage';
import NewUserPage from './Components/Pages/NewUserPage/NewUserPage';



function Routes(props) {
    return (
        <BrowserRouter>
            <Route path='/' exact component={AuthenticationPage} />
            <Route path='/restaurante/:id' component={MainPage} />
            <Route path='/sign-up' component={NewUserPage} />
            <Route path='/add-sale' component={AddSalePage} />
            <Route path='/add-product' component={AddProductPage} />
        </BrowserRouter>
    );
}

export default withCookies(Routes)