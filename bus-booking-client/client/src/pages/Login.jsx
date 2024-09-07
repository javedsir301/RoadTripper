import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IMAGES from '../assets/login-bus.png';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};

        if (!values.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!values.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length > 0 
            ? 'Please fill all details correctly' 
            : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const generalErrorMessage = validate();
        if (generalErrorMessage) {
            setErrors(prevErrors => ({ ...prevErrors, general: generalErrorMessage }));
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/login', values);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.name); 
                navigate('/');
            } else {
                console.log('Login failed:', response.data.message);
            }
        } catch (err) {
            console.error('Login error:', err.message);
            setErrors({ ...errors, general: 'Login failed. Please check your credentials.' });
        }
    };

    return (
        <div className='relative min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${IMAGES})` }}>
            <nav className='fixed top-0 left-0 w-full bg-gray-900 text-white pt-1 pb-2 shadow-md'>
                <div className='container mx-auto flex justify-between items-center'>
                    <div className='text-2xl font-bold text-blue-400 ml-4'>RoadTripper</div>
                    <div className='space-x-6'>
                        <a href="#" className='text-sm hover:text-red-400'>BUS TICKET</a>
                        <a href="#" className='text-sm hover:text-red-400'>LIVE TRACKING</a>
                        <a href="#" className='text-sm hover:text-red-400'>OFFERS</a>
                        <a href="#" className='text-sm hover:text-red-400'>CONTACT US</a>
                    </div>
                    <Link to='/register' className='bg-yellow-400 text-black px-7 py-2 rounded hover:bg-yellow-500 mr-4'>
                        REGISTER 
                    </Link>
                </div>
            </nav>
            <div className='flex justify-center items-center min-h-screen pt-16'>
                <div className='bg-white p-4 rounded-lg shadow-lg w-full max-w-sm'>
                    <h2 className='text-lg font-bold mb-4 text-center'>Login</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div className="mb-4">
                            <label htmlFor="email" className='block text-gray-700'>Email</label>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                className='w-full px-3 py-2 border rounded-md'
                                name="email"
                                value={values.email}
                                onChange={handleChanges}
                            />
                            {errors.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className='block text-gray-700'>Password</label>
                            <input
                                type="password"
                                placeholder='Enter Password'
                                className='w-full px-3 py-2 border rounded-md'
                                name="password"
                                value={values.password}
                                onChange={handleChanges}
                            />
                            {errors.password && <p className='text-red-500'>{errors.password}</p>}
                        </div>
                        {errors.general && <p className='text-red-500 mb-4'>{errors.general}</p>}
                        <button
                            type="submit"
                            className="w-full bg-[#d84e55] text-white text-center py-2 rounded-md mb-4"
                        >
                            Submit
                        </button>
                    </form>
                    <div className="text-center">
                        <span>Don't Have an Account?</span>
                        <Link to='/register' className='text-red-500 ml-1'>Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
