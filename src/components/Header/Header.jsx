import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/argentBankLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const Header = () => {
    const dispatch = useDispatch();


    const { token, user } = useSelector(state => state.user);



    const handleLogout = () => {

        dispatch(logout());
        console.log(logout())

    }

    return (
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
                {token ? <> <Link className="main-nav-item" to="/profile">
                    <i className="fa fa-user-circle"></i>
                    {user.firstName}
                </Link>
                    <Link className="main-nav-item" to="/" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link> </>
                    : <Link className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>}

            </div>
        </nav>
    );
};

export default Header;
