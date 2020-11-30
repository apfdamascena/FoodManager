import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import './AddSalePage.css';
import API from '../../../services/api';
import { useCookies } from "react-cookie";

export default function AddSalePage(props){
    const [cookie, setCookie] = useCookies()
    const [quantity, setQuantity] = useState(0)
    const productID = props.location.state.productID;

    const history = useHistory();

    function handleSubmitPressed(event){
        event.preventDefault();
        API.post(`api/sale/${productID}`, {
            quantity: quantity
        }, { headers: {'x-access-token': cookie.token }}).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
        redirecting()
    }

    function handleTapComeBack(){
        redirecting()
    }

    function redirecting(){
        const id = cookie.id;
        const domain = `/restaurante/${id}`;
        history.push(domain);
    }

    function handleChange(e) {
        setQuantity(e.target.value)
    }

    return(
        <div className = "sale-wrapper">

            <header>
                <button onClick = {handleTapComeBack} >Voltar</button>
                <h2>Adicione nova venda</h2>
                <button onClick = {handleSubmitPressed}>Adicione uma venda</button> 
            </header> 

            <form>
                <div className="label-input-wrapper">
                    <label  id = "label-quantidade" for = "quantity">Quantidade</label>
                    <input 
                        type="text"
                        name = "quantity"
                        placeholder = "Digite a quantidade"
                        onChange={handleChange}
                        value={quantity}
                        required
                    />
                
                </div>
            </form>

        </div>
    );
}