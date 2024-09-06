import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', values);
            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg px-8 py-5 border w-72'>
                <h2 className='text-lg font-bold mb-4 text-center'>Login</h2>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className="mb-4">
                        <label htmlFor="email" className='block text-gray-700'>Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            className='w-full px-3 py-2 border rounded-md'
                            name="email"
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className='block text-gray-700'>Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className='w-full px-3 py-2 border rounded-md'
                            name="password"
                            onChange={handleChanges}
                        />
                    </div>
                    <Link to='/home'
                        type="submit"
                        className="w-full bg-[#d84e55] text-white text-center py-2 rounded-md mb-4"
                    >
                        Submit
                    </Link>
                </form>
                <div className="text-center">
                    <span>Don't Have an Account?</span>
                    <Link to='/register' className='text-red-500 ml-0.9'>Signup</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
