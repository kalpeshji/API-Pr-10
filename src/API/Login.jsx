import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css'
export default function Login() {
    const [input, setInput] = useState({});
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAlert(false);
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.email || !input.password) {
            setAlert(true);
            return;
        }
        const res = await axios.get(' http://localhost:4000/users');
        const users = res.data;
        users.forEach((user) => {
            if (user.email === input.email && user.password === input.password) {
                localStorage.setItem("loginFlag", "true");
                setTimeout(() => {
                    navigate('/home');
                }, 500);
            } else {
                setAlert(true);
            }
        });
    };
    return (
        <>
            <div className='content vw-100 vh-100 d-flex flex-wrap align-content-center justify-content-center'>
                <div className='w-100 d-flex flex-wrap justify-content-center'>
                    <form onSubmit={handleSubmit} className='form w-25 rounded-3 p-4'>
                        {alert && <h5 className="text-center text-danger">Invalid</h5>}
                        <label className='form-label text-light'>EMAIL*</label><br />
                        <input type="email" className='form-control' onChange={handleChange} name="email" id="email" placeholder='--ENTER HERE--' /><br />
                        <label className='form-label text-light'>PASSWORD*</label><br />
                        <input type="password" className='form-control' onChange={handleChange} name="password" id="password" placeholder='--ENTER HERE--' /><br />
                        <p className="text-center text-light mt-6">Don't have an account? <Link to={'/'} className="text-indigo-600 hover:underline">Sign Up</Link></p>
                        <button className='btn btn-outline-light w-100'>LOG IN</button>
                    </form>
                </div>
            </div>
        </>
    );
}
