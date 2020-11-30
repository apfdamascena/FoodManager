import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import './BoxProduct.css';

function BoxProduct({image, nomeProduto, idProduto}) {
    const[redirect, setRedirect] = useState('');
    function handleTapAddSale(){
        setRedirect('/add-sale');
    }

    if (redirect) {
        return(
            <Redirect to = {{
                pathname: redirect,
                state: { productID: idProduto }
            }}/>
        );
    }

    return (
        <div className = "box-product-wrapper">
            <button id = 'register-button' onClick = {handleTapAddSale} >Adicionar Venda</button>
            <img src="https://diaonline.ig.com.br/wp-content/uploads/2018/10/11-restaurantes-para-comer-um-delicioso-sushi-em-goiania-11-1024x679.jpg"/>
            <div className = "box-product-content">
                <p id = "name-product">{nomeProduto}</p>
                {/* <p id="details"> Clique para detalhes</p> */}
            </div>
        </div>
    );
}

export default BoxProduct;
