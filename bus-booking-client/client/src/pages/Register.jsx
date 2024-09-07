import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IMAGES from '../assets/register-bus.png'; 

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        mobile: '',
        gender: '',
        dateOfBirth: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        let errorMessage = '';
        
        let anyFieldFilled = false;
        if (values.username) anyFieldFilled = true;
        if (values.email) anyFieldFilled = true;
        if (values.password) anyFieldFilled = true;
        if (values.mobile) anyFieldFilled = true;
        if (values.gender) anyFieldFilled = true;
        if (values.dateOfBirth) anyFieldFilled = true;
    
        if (!values.username) {
            newErrors.username = 'Username is required';
        }
        if (!values.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!values.password) {
            newErrors.password = 'Password is required';
        } else if (values.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        if (!values.mobile) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(values.mobile)) {
            newErrors.mobile = 'Mobile number should be 10 digits';
        }
        if (!values.gender) {
            newErrors.gender = 'Gender is required';
        }
        if (!values.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of Birth is required';
        }
    
        if (!anyFieldFilled) {
            errorMessage = 'Please fill all details';
        } else {
            const errorMessages = Object.values(newErrors).join(', ');
            if (errorMessages) {
                errorMessage = `Please correct the following: ${errorMessages}`;
            }
        }
    
        setErrors(newErrors);
        return errorMessage;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const generalErrorMessage = validate();
        if (generalErrorMessage) {
            alert(generalErrorMessage);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/register', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                alert('Your registration is complete');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        } catch (err) {
            console.error('Registration error:', err.response?.data?.message || err.message);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className='relative min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${IMAGES})` }}>
            <nav className='fixed top-0 left-0 w-full bg-gray-900 text-white pt-1 pb-2 shadow-md'>
                <div className='container mx-auto flex justify-between items-center'>
                    <div className='text-2xl font-bold text-blue-400 ml-4 '>RoadTripper</div>
                    <div className='space-x-6'>
                        <a href="#" className='text-sm hover:text-red-400'>BUS TICKET</a>
                        <a href="#" className='text-sm hover:text-red-400'>LIVE TRACKING</a>
                        <a href="#" className='text-sm hover:text-red-400'>OFFERS</a>
                        <a href="#" className='text-sm hover:text-red-400'>CONTACT US</a>
                    </div>
                    <Link to='/login' className='bg-yellow-400 text-black px-7 py-2 rounded hover:bg-yellow-500 mr-4'>
                        LOGIN 
                    </Link>
                </div>
            </nav>
            <div className='flex justify-center items-center min-h-screen pt-24'>
                <div className='bg-white p-4 rounded-lg shadow-lg w-full max-w-sm'>
                    <h2 className='text-lg font-bold mb-4 text-center'>Register</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div className="mb-3">
                            <label htmlFor="username" className='block text-gray-700'>Username</label>
                            <input
                                type="text"
                                placeholder='Enter Username'
                                className='w-full px-3 py-2 border rounded-md'
                                name="username"
                                value={values.username}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className='block text-gray-700'>Email</label>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                className='w-full px-3 py-2 border rounded-md'
                                name="email"
                                value={values.email}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className='block text-gray-700'>Password</label>
                            <input
                                type="password"
                                placeholder='Enter Password'
                                className='w-full px-3 py-2 border rounded-md'
                                name="password"
                                value={values.password}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className='block text-gray-700'>Mobile Number</label>
                            <input
                                type="tel"
                                placeholder='Enter Mobile Number'
                                className='w-full px-3 py-2 border rounded-md'
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className='block text-gray-700'>Gender</label>
                            <select
                                name="gender"
                                className='w-full px-3 py-2 border rounded-md'
                                value={values.gender}
                                onChange={handleChanges}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dateOfBirth" className='block text-gray-700'>Date of Birth</label>
                            <input
                                type="date"
                                className='w-full px-3 py-2 border rounded-md'
                                name="dateOfBirth"
                                value={values.dateOfBirth}
                                onChange={handleChanges}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#d84e55] text-white text-center py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <span>Already have an account?</span>
                        <Link to='/login' className='text-red-500 ml-2'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
