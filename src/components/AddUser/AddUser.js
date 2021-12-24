import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleUser = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = { name, email };
        fetch( 'https://warm-refuge-34383.herokuapp.com/users', {
            method: 'POST',
            headers:  {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then( res => res.json())
        .then( data => {
            if (data.insertedId) {
                alert('Successfully added the user.')
                e.target.reset();
            }
        })

        e.preventDefault();
    }

    return (
        <div>
            <h2>Add new User</h2>
            <form onSubmit={handleUser}>
                <input type="text" ref={nameRef} placeholder='Name' />
                <input type="text" ref={emailRef} placeholder='Email' />
                <input type="submit" value="Add"  />
            </form>
        </div>
    );
};

export default AddUser;





// const handleSubmit = e => {
//     e.preventDefault();
    
//     const name = nameRef.current.value;
//     const email = emailRef.current.value;

//     const newUser = { name, email };
//     fetch('https://warm-refuge-34383.herokuapp.com/users', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         }, 
//         body: JSON.stringify(newUser)
//     })
//         .then(res => res.json())
//         .then(data => {
//             if(data._id) {
//                 alert("Successfully Added user");
//                 e.target.reset();
//             }
//         })
// }