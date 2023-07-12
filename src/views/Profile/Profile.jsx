import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import "./Profile.scss";
import { startRequest, getProfileSuccess, getProfileFailure, updateProfileSuccess } from '../../reducers/userReducer';

const Profile = () => {
    const dispatch = useDispatch();

    const { user, isLoading, error, token } = useSelector(state => state.user);

    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');

    useEffect(() => {
        const fetchData = async () => {
            dispatch(startRequest());
            try {
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
    }, [dispatch, token]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);

        const updatedUser = {
            ...user,
            firstName: firstName,
            lastName: lastName,
        };

        try {
            const response = await axios.put('http://localhost:3001/api/v1/user/profile', updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(updateProfileSuccess({ user: response.data.body }));
        } catch (error) {
            dispatch(getProfileFailure({ error: error.message }));
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{user && `${user.firstName} ${user.lastName}`} !</h1>
                {isEditing ? (
                    <div className='changeName'>
                        <div className='positionInput'>
                        <input placeholder={user.firstName} type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        <input  placeholder={user.lastName}type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div className='PositionButton'>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>

                    </div>
                ) : (
                    <>
                        <button onClick={handleEditClick} className="edit-button">Edit Name</button>
                    </>
                )}
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
    );
};

export default Profile;
