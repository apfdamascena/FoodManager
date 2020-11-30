import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import './Updates.css'; 
import BoxUpdates from '../BoxUpdates/BoxUpdates';
import '../Button/Button.css'

export default function Updates(props){
    const { restaurantData } = props;
    const products = restaurantData?.products

    const [redirect, setRedirect] = useState('');

    function handleRestaurantSales() {
        const todayDate = new Date().toLocaleDateString()
        let salesToday = 0;
        let salesGeneral = 0;
        let profitToday = 0;
        let profitGeneral = 0;

        for (let i = 0; i < products?.length; i++) {
            for (let j = 0; j < products[i]?.sales?.length; j++) {
                salesGeneral += products[i]?.sales[j].quantity
                profitGeneral += products[i]?.profitMargin * products[i]?.sales[j].quantity
                const restauranteDate = new Date(products[i]?.sales[j].createdAt).toLocaleDateString()
                if (todayDate === restauranteDate) {
                    salesToday += products[i]?.sales[j].quantity
                    profitToday += products[i]?.profitMargin * products[i]?.sales[j].quantity
                }
            }
        }
        profitToday = String(parseInt(profitToday / salesToday * 100)) + "%"
        profitGeneral = String(parseInt(profitGeneral / salesGeneral * 100)) + "%"
        return [salesToday, salesGeneral, profitToday, profitGeneral]
    }

    if(redirect){
        return(
            <Redirect to = {redirect} />
        );
    }

    const sales = handleRestaurantSales()

    return(
        <div className = 'updates-wrapped'>
 
            <div className = 'update-boxes'>
                <BoxUpdates title = "Vendas hoje" content = {sales[0]} />
                <BoxUpdates title = "Margem hoje" content = {sales[2]} />
                <BoxUpdates title = "Vendas no geral" content = {sales[1]} />
                <BoxUpdates title = "Margem no geral" content = {sales[3]} />
            </div>
        </div>
    );
}