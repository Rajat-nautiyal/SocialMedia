import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state/index.jsx';

export const Login = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [inputValue, setInputValue] = useState('demo@gmail.com');
    const [passwordValue, setPasswordValue] = useState('123456');

    const handleClick =()=>{
        navigate('/signup')
    }
    const submitLogin = async(data) => {
      try {
        console.log(data)
        const res = await fetch('https://socialera.us.to/auth/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const logInData = await res.json();
        if(logInData.message){
            setMessage(logInData.message)
        }
        dispatch(setLogin(logInData.user))
        localStorage.setItem('darkMode', JSON.stringify(false));
    } catch (error) {
        console.error('Error submitting form:', error);
    }
      };
    
  return (
    <>
    <div className="flex items-center justify-center min-h-[100dvh] bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit(submitLogin)} className="space-y-5">
            <input 
              type="email" name="email"
              {...register("email", { required: true, minLength: 5 })}
              placeholder="Enter your email"
              value={inputValue}
              onChange={(e)=>{setMessage(null),setInputValue(e.target.value)}}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
                type="password" name="password"
                {...register("password", { required: true })}
                placeholder="Password"
                value={passwordValue}
                onChange={(e)=>{setMessage(null),setPasswordValue(e.target.value)}}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" 
             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Login
            </button>
        </form>
        <div onClick={handleClick}
          className="mt-6 text-center text-blue-500 hover:underline cursor-pointer"
        >
            Create a new user
        </div>
        <div className=" mt-2 text-center text-sm text-red-500">
            {message}
        </div>
        </div>
    </div>
    </>
)
}
