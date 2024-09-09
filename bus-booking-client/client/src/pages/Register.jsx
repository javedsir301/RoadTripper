import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IMAGES from '../assets/register-bus.png'; 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        gender: '',
        dob: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        let errorMessage = '';
        
        let anyFieldFilled = false;
        if (formData.name) anyFieldFilled = true;
        if (formData.email) anyFieldFilled = true;
        if (formData.password) anyFieldFilled = true;
        if (formData.mobile) anyFieldFilled = true;
        if (formData.gender) anyFieldFilled = true;
        if (formData.dob) anyFieldFilled = true;
    
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        if (!formData.mobile) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number should be 10 digits';
        }
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }
        if (!formData.dob) {
            newErrors.dob = 'Date of Birth is required';
        }
    
        if (!anyFieldFilled) {
            errorMessage = 'Please fill all details';
        } else {
            const errorMessages = Object.values(newErrors).join(', ');
            if (errorMessages) {
                errorMessage = `Please correct the following: ${errorMessages}`;
            }
        }
    
        setError(errorMessage);
        return errorMessage;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            return;
        }
        try {
            await axios.post('http://localhost:5000/auth/register', formData);
            navigate('/login'); 
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
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
                            <label htmlFor="name" className='block text-gray-700'>Name</label>
                            <input
                                type="text"
                                placeholder='Enter Name'
                                className='w-full px-3 py-2 border rounded-md'
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className='block text-gray-700'>Email</label>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                className='w-full px-3 py-2 border rounded-md'
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className='block text-gray-700'>Password</label>
                            <input
                                type="password"
                                placeholder='Enter Password'
                                className='w-full px-3 py-2 border rounded-md'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className='block text-gray-700'>Mobile Number</label>
                            <input
                                type="tel"
                                placeholder='Enter Mobile Number'
                                className='w-full px-3 py-2 border rounded-md'
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className='block text-gray-700'>Gender</label>
                            <select
                                name="gender"
                                className='w-full px-3 py-2 border rounded-md'
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className='block text-gray-700'>Date of Birth</label>
                            <input
                                type="date"
                                className='w-full px-3 py-2 border rounded-md'
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
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
