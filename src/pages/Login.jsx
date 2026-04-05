import { React, useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/home");
    }
  }, [firebase.isLoggedIn]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    firebase.loginUser(email, password).then(() => {
      navigate("/home");
    }).catch((error) => {
      alert(error.message);
    });
  }

  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <form action="" onSubmit={handleSubmit} className='flex flex-col items-center'>
          <input type="text" placeholder='Email' className='border-1 p-10 m-10' id='forminput' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' className='border-1 p-10 m-10' id='forminput' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' className='bg-cyan-400 w-30 cursor-pointer' id='loginbutton' >Login</button>
          <h6>OR</h6>
        </form>
        <button className='bg-red-400 w-30 cursor-pointer' id='loginbutton' onClick={firebase.loginWithGoogle} >Google</button>
        <p>Dont Have An Acvount? <a href="/register" className='text-blue-500'>Register</a> </p>
      </div>
    </div>
  )
}

export default Login
