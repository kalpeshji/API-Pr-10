import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'

function SignUp() {
    const [input, setInput] = useState({});
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAlert(false);
        setInput({ ...input, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.email || !input.username || !input.password) {
            setAlert(true);
            return;
        }
        try {
            await axios.post('http://localhost:4000/users', input);
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className='content vw-100 vh-100 d-flex flex-wrap align-content-center justify-content-center'>
                <div className='w-100 d-flex flex-wrap justify-content-center'>
                    <form className='form w-25 rounded-3 p-4'>
                        {alert && (
                            <div className='alert-red bg-red-500 p-3 mb-2'>
                                <h6 className="text-zinc-100 text-danger fw-bolder fs-5 text-center">Please fill all details</h6>
                            </div>
                        )}
                        <label className='form-label text-light'>USERNAME*</label><br />
                        <input type="text" className='form-control' onChange={handleChange} id="username" placeholder='--ENTER HERE--' /><br />
                        <label className='form-label text-light'>EMAIL*</label><br />
                        <input type="email" className='form-control' onChange={handleChange} id="email" placeholder='--ENTER HERE--' /><br />
                        <label className='form-label text-light'>PASSWORD*</label><br />
                        <input type="password" className='form-control' onChange={handleChange} id="password" placeholder='--ENTER HERE--' /><br />
                        <p className="text-center text-light mt-6">Already have an account? <Link to={'/login'} className="text-indigo-600 hover:underline">Log-In</Link></p>
                        <button type="submit" className='btn btn-outline-light w-100 mt-4' onClick={handleSubmit}>SIGN UP</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;