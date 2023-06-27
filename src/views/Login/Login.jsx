import React from 'react';
import "./Login.scss"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () => {
    let navigate = useNavigate();

    const handleSubmit = event => {
        // event.preventDefault();

        // Récupérer les valeurs du formulaire
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        // Envoyer une requête HTTP POST à l'API de connexion
        axios.post('http://localhost:3001/api/v1/user/login', {
            email: username,
            password
        })
            .then(response => {
                const data = response.data;
                if (data.token) {
                    // Si la connexion a réussi, sauvegarder le jeton dans le stockage local
                    localStorage.setItem('token', data.token);
                    // Rediriger l'utilisateur vers la page profile
                    navigate('/profile');
                } else {
                    // Gérer les erreurs de connexion ici...
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <main className="main">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default Login;
