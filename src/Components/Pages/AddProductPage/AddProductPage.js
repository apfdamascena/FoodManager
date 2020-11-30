import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import API from '../../../services/api';
import { useCookies } from "react-cookie";

import './AddProductPage.css';

export default function AddProductPage(){
    const [nome, setNome] = useState('');
    const [cost, setCost] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [cookies, setCookies] = useCookies();
    const history = useHistory();

    function handleSubmitPressed(event){
        event.preventDefault();
        API.post('api/product', {
            name : nome,
            cost: cost,
            sellPrice: sellPrice,
            restaurant_id: cookies.id
        }, { headers: {'x-access-token': cookies.token }}).then((response) => {
            console.log(response);
            redirecting();
        }).catch((error) => {
            console.log(error);
        })
    }

    function redirecting(){
        const id = cookies.id;
        const domain = `/restaurante/${id}`;
        history.push(domain);
    }

    return(
        <div className = "product-wrapper">

            <header>
                <button onClick= {redirecting}>Voltar</button>
                <h2> Adicione um novo produto</h2>
                <button onClick={handleSubmitPressed} type = "submit">Adicionar produto</button>
            </header>

            <form onSubmit = { (event) => {
                handleSubmitPressed(event);
            }}>
                <div className="label-input-wrapper">
                    <label htmlFor = "name">Nome</label>
                    <input type = "text" name = "name"  placeholder = "Digite o nome do produto"required onChange = {
                        (event) => {
                            let {value} = event.target;
                            setNome(value);
                        }
                    } ></input>
                </div>
                <div className="label-input-wrapper">
                    <label htmlFor = "cost">Custo</label>
                    <input type = "text" name = "cost"  placeholder = "Digite o custo da produção do produto"required onChange = {
                        (event) => {
                            let {value} = event.target;
                            value = parseFloat(value);
                            setCost(value);
                        }
                    }></input>
                </div>
                <div className="label-input-wrapper">
                    <label id = "preco-venda"htmlFor = "price">Preço de venda</label>
                    <input type = "text" name = "price"  placeholder = "Digite por quanto você venderá o produto"required onChange = {
                        (event) => {
                            let {value} = event.target;
                            value = parseFloat(value);
                            setSellPrice(value);
                        }
                    }></input>
                </div>
            </form>
        </div>

    );
}