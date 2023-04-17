import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';


const auth = getAuth(app)

const Login = () => {

    const [inputType, setInputType] = useState('password')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();


    const handelLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        // validation
        setError('')
        setSuccess('')
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add at list two UPPERCASE')
            return
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add at least spacial (!@#&$*) characters')
            return
        }
        else if (password.length < 6) {
            setError('Password must be 6 characters long')
            return
        }


        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser);
                setSuccess('User login successful')
            })
            .catch(error => {
            setError(error.message)
            })
    }

    const handelForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address to reset password')
            return
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
            alert('Please check your email')
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }

    const changeInputType = () => {
        if (inputType === 'password') {
            setInputType('text')
        }
        else {
            setInputType('password')
        }
    }

    return (
        <div className='w-25 mx-auto mt-5'>
            <h3 className='text-primary'>Please Login</h3>
            <form onSubmit={handelLogin}>
                <input className='mb-2 w-100 p-2 rounded' type="email" name="email" id="email" ref={emailRef} placeholder='Your Email' required/>
                <br />
                <input  className='mb-2 w-100 p-2 rounded' type={inputType} name="password" id="password" placeholder='Your Password'/>
                <br />
                <input className='btn btn-primary' type="submit" value="Login" required/>
            </form>
             <p><small>Forget pasword ? Please <button onClick={handelForgetPassword} className='btn btn-link'>Reset password</button></small></p>
            <p><small>New to this website? please <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
            <button onClick={changeInputType}>Show password</button>
        </div>
    );
};

export default Login;