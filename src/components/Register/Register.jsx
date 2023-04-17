import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import { Alert } from 'bootstrap';


const Register = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const auth = getAuth(app);

    const handelSubmit = (event) => {
        setError('')
        setSuccess('')

        // 1. preventDefault page refresh
        event.preventDefault()
        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log( email, name, password);

          // validation
          if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please add at one Uppercase')
            return;
        }
          else if (!/(?=.*[0-9])/.test(password)) {
              setError('Plase add a any number your password')
              return;
        }
          else if (password.length < 6) {
              setError('Plase add at least 6 characters in our password')
              return;
        }
        // 3. create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                event.target.reset();
                setError('')
                setSuccess('User has been created successfully')
                handelEmailVerification(result.user)
                updateUserData(result.user, name)
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message)
            })
    }
 
    const handelEmailVerification = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result)
                alert('Please verify your email address!!')
        })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
            console.log('user name updated');
            })
            .catch(error => {
            setError(error.message)
            })
    }
  

    const handelEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value)
    }

    const handelPasswordBlur = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h4 className='text-primary '>Please Register</h4>
            <form onSubmit={handelSubmit}>
                <input className='mb-2 w-50 p-2 rounded' type="text" name="name" id="name" placeholder='Your Name' required/>
                <br />
                <input className='w-50 mb-2 p-2 rounded' onChange={handelEmailChange} type="email" name="email" id="email" placeholder='Your email' required />
                <br />
                <input className='w-50 mb-3 p-2 rounded' onBlur={handelPasswordBlur} type="password" name="password" id="password" placeholder='Your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
                <p><small>Already have an account? please <Link to='/login'>Login</Link></small></p>
                <p>{error}</p>
                <p className='text-primary'>{ success}</p>
            </form>
        </div>
    );
};

export default Register;