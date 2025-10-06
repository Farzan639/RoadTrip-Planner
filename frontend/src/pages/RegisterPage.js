import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../api';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const { name, username, email, password, confirmPassword } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`, {
                name, username, email, password
            });
            if (response.data.token) {
                login(response.data.token);
                navigate('/trips');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error(error.response?.data);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-900">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
                         <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-6V4m6 16l5.447-2.724a1 1 0 00.553-.894V5.618a1 1 0 00-1.447-.894L15 7m0 13v-6m0-6V4" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Join TripVerse</h2>
                    <p className="text-slate-400 mt-2">Create an account to start your journey.</p>
                </div>

                {/* Form */}
                <div className="bg-slate-800/50 rounded-2xl shadow-2xl p-8 border border-slate-700 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-rose-900/50 border border-rose-500 text-rose-300 px-4 py-3 rounded-xl text-sm">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Input Fields */}
                        <input type="text" name="name" value={name} onChange={onChange} required className="input-field" placeholder="Full Name"/>
                        <input type="text" name="username" value={username} onChange={onChange} required className="input-field" placeholder="Username"/>
                        <input type="email" name="email" value={email} onChange={onChange} required className="input-field" placeholder="Email Address"/>
                        <input type="password" name="password" value={password} onChange={onChange} required minLength="6" className="input-field" placeholder="Password (min. 6 characters)"/>
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required className="input-field" placeholder="Confirm Password"/>

                        <button
                            type="submit" disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 !mt-6 ${
                                loading 
                                ? 'bg-slate-600 cursor-not-allowed' 
                                : 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 transform hover:scale-105'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-200">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;