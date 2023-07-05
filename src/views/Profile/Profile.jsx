import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import "./Profile.scss";
import { Link } from "react-router-dom";
import { startRequest, getProfileSuccess, getProfileFailure } from '../../reducers/userReducer';
import { logout } from '../../reducers/userReducer';
import logo from '../../assets/img/argentBankLogo.png';


const Profile = () => {
    const dispatch = useDispatch();

    const { user, isLoading, error } = useSelector(state => state.user);


    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
    }

    useEffect(() => {

        const fetchData = async () => {
            dispatch(startRequest());
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.body);
                dispatch(getProfileSuccess({ user: response.data.body }));

            } catch (error) {
                dispatch(getProfileFailure({ error: error.message }));
            }
        };
        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const firstName = user?.user?.firstName;
    const lastName = user?.user?.lastName;


    return (
        <>
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link className="main-nav-item" to="/profile">
                        <i className="fa fa-user-circle"></i>
                        {firstName}
                    </Link>
                    <Link className="main-nav-item" to="/login" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </div>
            </nav>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user && `${firstName} ${lastName}`}!</h1>
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Profile;
