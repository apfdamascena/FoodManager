import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthenticationPage.css';
import { Redirect } from 'react-router-dom';
import API from '../../../services/api';
import { useCookies } from "react-cookie";

export default function AuthenticationPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');
    const [id, setId] = useState('');
    const [cookie, setCookie] = useCookies(["id"])

    useEffect(() => {
        const token = cookie.token
        const id = cookie.id
        API.post('/api/auth/verifytoken', {}, { headers: {'x-access-token': token }}).then(response => {
            if (response.status === 200) {
                handleSignIn(id)
            }
        })
    }, [])

    function onSubmit(event) {
        event.preventDefault();
        login(username, password);
    }

    function login(username, password) {
        API.post('api/auth/signin', {
            username : username,
            password : password
        }).then((response) => {
            console.log(response)
            const { id, accessToken } = response.data;
            setCookie("id", id)
            setCookie("token", accessToken)
            handleSignIn(id);
            setId(id);
        }).catch((error) => {
            console.log(error);
        })
    }

    function handleSignIn(userID) {
        setRedirect(`/restaurante/${userID}`)
    }

    function handleNewUser(){
        setRedirect('/sign-up');
    }

    if (redirect) {
        return(
            <Redirect to={redirect} />
        );
    }

    return (
        <div className="authentication-wrapper">
            <div className="title-page">
                <h1>Food Manager</h1>
            </div>
            <Form onSubmit={(event) => {
                onSubmit(event);
            }}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={(event) => {
                        const { value } = event.target;
                        setUsername(value);
                    }} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onChange={(event) => {
                        const { value } = event.target;
                        setPassword(value);
                    }} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enter
                </Button>
            </Form>

            <div className="new-user">
                <p onClick = {handleNewUser} >Novo na página? Clique aqui!</p>
            </div>


        </div>
    );

}