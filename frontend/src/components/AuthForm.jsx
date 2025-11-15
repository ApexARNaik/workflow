// frontend/src/components/AuthForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '', 
        role: 'Team Member'
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = 'http://localhost:3000/api/auth'; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const url = isLogin ? `${API_BASE_URL}/login` : `${API_BASE_URL}/signup`;
            
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : { email: formData.email, password: formData.password, name: formData.name, role: formData.role };

            const response = await axios.post(url, payload);

            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                onAuthSuccess();
                navigate('/dashboard'); 
            } else {
                setIsLogin(true);
                setFormData({ email: '', password: '', name: '', role: 'Team Member' });
                alert('Signup successful! Please log in.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred. Please check the backend terminal.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-blue-500/20 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </h2>
                {error && <p className="text-red-400 text-sm mb-4 bg-red-900/20 p-3 rounded-lg border border-red-500/30">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-blue-500/30 text-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                placeholder="Your Name"
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-blue-500/30 text-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-blue-500/30 text-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            placeholder="Your Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 font-semibold shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02]"
                        disabled={isLoading}
                    >
                        {isLoading ? (isLogin ? 'Logging in...' : 'Signing up...') : isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-sm text-slate-400 mt-4 text-center">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(null); }}
                        className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;