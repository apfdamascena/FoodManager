import React from 'react';
import { useCookies } from 'react-cookie';
import './NavBar.css';


export default function NavBar({ gerente }) {
    const [cookie, setCookie] = useCookies()

    function handleLogOut() {
        cookie.setCookie('token', null)
    }
    return (
        <div className="navbar-wrapper">
            <h2> FOOD MANAGER </h2>
            <div className="right-content-navbar">
                <h3>BEM VINDO, {gerente}</h3>
                <p onClick={handleLogOut}>Sair</p>
            </div>
        </div>
    );
}