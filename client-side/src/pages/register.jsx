import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { HiPhoto } from "react-icons/hi2";
import { MdPhotoLibrary } from "react-icons/md";

export const Register = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState(null);

    const handleClick =()=>{
      navigate('/login')
    }
    const submitRegister = async(data) => {
      try {
        const formData = new FormData();

        for (const key in data) {
          console.log(key, data[key])
            if (key === 'picture' && data[key].length > 0) {
                formData.append(key, data[key][0]); // Append file
            } else {
                formData.append(key, data[key]);
            }
        }
        const res = await fetch('http://192.168.0.130:6001/auth/register', {
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
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
      <form onSubmit={handleSubmit(submitRegister)} className="space-y-5">
        <input 
          type="text" name='firstname'
          {...register("firstname", { required: true, maxLength: 15 })}
          placeholder="First Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <input 
          type="text" name='lastname'
          {...register("lastname", { required: true, maxLength: 15 })}
          placeholder="Last Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <input 
          type="email" name="email"
          {...register("email", { required: true, minLength: 5 })}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <input 
          type="password" name="password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 4,
              message: "Password should be at least 4 characters."
            }
          })}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}

        <input type='file' 
        {...register("picture",{
                onChange: (e) => {
                        setFileName(e.target.value)
                  },
        })} 
          style={{display:'none'}}
          placeholder='choose a pic' id='file'
        />
        <label htmlFor='file' 
        className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center text-green-500">
            <HiPhoto className="text-2xl" />
            <span className="ml-2">Choose Avatar</span>
          </div>
          <span className="text-gray-600 text-xs">{fileName || "No file chosen"}</span>
        </label>

        <input 
          type="text" name='occupation'
          {...register("occupation")}
          placeholder="Occupation"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <input 
          type="text" name='location'
          {...register("location")}
          placeholder="Location"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 text-sm"
        >
          Register
        </button>
      </form>
      <div onClick={handleClick}
        className="mt-4 text-center text-indigo-500 hover:underline cursor-pointer text-sm"
      >
        Login
      </div>
    </div>
  </div>
</>
)
}
