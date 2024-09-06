import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        mobile: '',
        gender: '',
        dateOfBirth: ''
    });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/register', values);
            if (response.status === 201) {
                alert('Your registration is complete');
                setTimeout(() => {
                    navigate('/login');
                }, 1000); 
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='shadow-lg px-8 py-6 border w-96 h-auto'>
                <h2 className='text-lg font-bold mb-4 text-center'>Register</h2>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className="mb-4">
                        <label htmlFor="username" className='block text-gray-700'>Username</label>
                        <input
                            type="text"
                            placeholder='Enter Username'
                            className='w-full px-3 py-2 border rounded-md'
                            name="username"
                            onChange={handleChanges}
                        />
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="mobileNumber" className='block text-gray-700'>Mobile Number</label>
                        <input
                            type="tel"
                            placeholder='Enter Mobile Number'
                            className='w-full px-3 py-2 border rounded-md'
                            name="mobileNumber"
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className='block text-gray-700'>Gender</label>
                        <select
                            name="gender"
                            className='w-full px-3 py-2 border rounded-md'
                            onChange={handleChanges}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dateOfBirth" className='block text-gray-700'>Date of Birth</label>
                        <input
                            type="date"
                            className='w-full px-3 py-2 border rounded-md'
                            name="dateOfBirth"
                            onChange={handleChanges}
                        />
                    </div>
                    <Link to='/login'
                        type="submit"
                        className="w-full bg-[#d84e55] text-white text-center py-2 rounded-md"
                    >
                        Submit
                    </Link>
                </form>
                <div className="text-center mt-4">
                    <span>Already have an account?</span>
                    <Link to='/login' className='text-red-500 ml-2'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
