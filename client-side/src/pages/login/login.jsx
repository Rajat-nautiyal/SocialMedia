import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state/index.jsx';

export const Login = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick =()=>{
        navigate('/signup')
    }
    const submitLogin = async(data) => {
      try {
        const res = await fetch('http://localhost:6001/auth/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const logInData = await res.json();
        dispatch(setLogin({
            user:logInData.user, token:logInData.token
        }))
        localStorage.setItem('darkMode', JSON.stringify(false));
        // dispatch(setMode(false))
        console.log('form data is', logInData);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
      };
    
  return (
    <>
        <form onSubmit={handleSubmit(submitLogin)}>

            <input type='email'{...register("email",{required:true, minLength:5})}
                  placeholder='enter a email' name='email'
            />
            <input type='text'{...register("password",{required:true,})}
                 placeholder='password' name='password'
              />
           
            <button type="submit">Login</button>
        </form>
        <div onClick={handleClick}>Create an user</div>
        
    </>
)
}
