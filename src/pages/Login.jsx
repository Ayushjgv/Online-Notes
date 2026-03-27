import React from 'react'

const Login = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='flex justify-center items-center'>
        <form action="/home">
          <input type="text" placeholder='Username' className='border-1 p-10 m-10' id='forminput' />
          <button type='submit' className='bg-cyan-400 w-30 cursor-pointer' id='loginbutton' >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
