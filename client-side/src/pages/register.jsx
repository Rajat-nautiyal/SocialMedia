import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();

    const handleClick =()=>{
      navigate('/login')
    }
    const submitRegister = async(data) => {
      try {
        const formData = new FormData();
        // Append each form field to the FormData object
        for (const key in data) {
          console.log(key, data[key])
            if (key === 'picture' && data[key].length > 0) {
                formData.append(key, data[key][0]); // Append file
            } else {
                formData.append(key, data[key]);
            }
        }
        const res = await fetch('http://localhost:6001/auth/register', {
            method: 'POST',
            body: formData
        });
        const responseData = await res.json();
        console.log('form data is', responseData);
        navigate('/login')

    } catch (error) {
        console.error('Error submitting form:', error);
    }
      };
    
  return (
    <>
        <form onSubmit={handleSubmit(submitRegister)}>
            <input type='text' {...register("firstname",{required:true, maxLength:15})}
                  placeholder='firstname' 
            />
            <input type='text' {...register("lastname",{required:true, maxLength:15})} 
                  placeholder='lastname' 
            />
            <input type='email'{...register("email",{required:true, minLength:5})}
                  placeholder='enter a email' name='email'
            />
            <input type='text'{...register("password", {
                                required: "Password is required.",
                                minLength: {
                                  value: 4,
                                  message: "Password should be at-least 4 characters."
                                }
                              })}
                 placeholder='password' name='password'
              />
            {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
            )}
            <input type='file' {...register("picture")}
                  placeholder='choose a pic' name='picture'
            />
            <input type='text' {...register("occupation")}
             placeholder='occupation'
            />
            <input type='text'{...register("location")}
             placeholder='location'/>
            <button type="submit">register</button>
        </form>
        <div onClick={handleClick}>Login</div>

    </>
)
}
