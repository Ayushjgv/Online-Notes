import { React, useState, useEffect } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            alert("Please enter email, password and name");
            return;
        }
        firebase.registerUser(email, password, name).then(() => {
            navigate("/home");
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className='flex w-full h-screen justify-center items-center flex-col'>
            <form action="" onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                <input type="text" placeholder='Username' className='border-1 p-10 m-10' id='forminput' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Email' className='border-1 p-10 m-10' id='forminput' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' className='border-1 p-10 m-10' id='forminput' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className='bg-cyan-400 w-30 cursor-pointer' id='registerbutton' >Register</button>
            </form>
            <p>Already have an account? <a href="/" className='text-blue-500'>Login</a></p>
        </div>
    )
}

export default Register