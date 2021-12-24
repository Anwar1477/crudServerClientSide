import { Container, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Users = () => {
    const [users, setUser] = useState([]);
    const [searchProducts, setSearchProducts] = useState([]);
   
    // fetching users data
    useEffect( () =>  {
        fetch('https://warm-refuge-34383.herokuapp.com/users/')
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setSearchProducts(data);
            }); 
    },[])

    // DELETE USER  
    const handleDeleteUser = id => {
        const proceed = window.confirm("Are you Sure you want to delete?");
        if( proceed ) {
            const URL = `https://warm-refuge-34383.herokuapp.com/users/${id}`
            fetch(URL, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('deleted successfully!');
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUser(remainingUsers);
                }
            })
            }
    }

    // Serach
    const handleSearch = e =>{
         const searchText = e.target.value;
         const matchedUser = users.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()));
         console.log(matchedUser.length);
         setSearchProducts(matchedUser);
    }
    
    return (
        <Container sx={{mt: 5}}>
            <h2>Available Users {users.length}</h2>
            <TextField onChange={handleSearch} id="standard-basic" label="Search" variant="standard" />
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {searchProducts.map((user) => (
                    <TableRow
                    key={user._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {user._id}
                    </TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                    <Link to={`/users/update/${user._id}`}><button> Update </button></Link>
                            <button onClick={ () => handleDeleteUser (user._id)} > Delete </button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    );
};

export default Users;
