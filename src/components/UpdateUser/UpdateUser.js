import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import { CircularProgress } from '@mui/material';

const UpdateUser = () => {
    const [ user, setUser ] = useState({});
    const [ isloading, setIsloading ] = useState(false);
    const {id} = useParams();

    // single user fetching
    useEffect(() => {
        const URL = `https://warm-refuge-34383.herokuapp.com/users/${id}`;
        fetch(URL)
            .then( res => res.json())
            .then( data =>  setUser(data));
    }, []);


    // update information
    // update name
    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedUser = { name: updatedName, email: user.email }
        setUser(updatedUser);
    }
    // update email
    const handleEmailChange = e =>{
        const updatedEmail = e.target.value;
        const updatedUser = { name: user.name, email: updatedEmail };
        // const updateUser = { ...user };
        // updatedUser.email = updatedEmail;
        setUser(updatedUser);
    }

    const handleUpdateUser = e => {
        setIsloading(true);
        const URL = `https://warm-refuge-34383.herokuapp.com/users/${id}`;
        fetch(URL, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then( res => res.json()) 
        .then( data => {
            setIsloading(false);
            if ( data.modifiedCount > 0) {
                alert('Are you sure to update the data!!');
                // setUser({});
            }
        }) 
        e.preventDefault();
        
    }


    

    return (
        <div>
            <h2>Update User: </h2>
            <h4>Name: {user.name}</h4>
            <h5>Email: {user.email}</h5>
            {!isloading ?  
                <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} value={user.name || ''} />
                <input type="text" onChange={handleEmailChange} value={user.email || ''} />
                <input type="submit" value="Update"  />
            </form>
            :
            <CircularProgress color="success" /> 
        }
        </div>
    );
};

export default UpdateUser;