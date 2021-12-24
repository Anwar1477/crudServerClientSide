import './Header.css';

import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <nav>
                {/* <Link to="/">Home</Link> */}
                <Link to="/users">Users</Link>
                <Link to="/users/add">Add User</Link>
            </nav>
        </div>
    );
};

export default Header;