import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    // Helper to determine if a link is active
    const isActive = (path) => location.pathname === path;

    // Base classes for nav links for consistency
    const navLinkClasses = "font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-300";
    const activeLinkClasses = "text-cyan-400";

    return (
        <nav className="sticky top-0 z-50 bg-cyan-800 border-b border-cyan-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                            {/* Road Icon  */}
                            <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-6V4m6 16l5.447-2.724a1 1 0 00.553-.894V5.618a1 1 0 00-1.447-.894L15 7m0 13v-6m0-6V4" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-slate-100 tracking-wide">
                            TripVerse
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`${navLinkClasses} ${isActive('/') && activeLinkClasses}`}>
                            Home
                        </Link>
                        <Link to="/trips" className={`${navLinkClasses} ${isActive('/trips') && activeLinkClasses}`}>
                            Explore
                        </Link>
                        {auth.isAuthenticated && (
                            <Link to="/mytrips" className={`${navLinkClasses} ${isActive('/mytrips') && activeLinkClasses}`}>
                                My Trips
                            </Link>
                        )}
                    </div>

                    {/* Auth Buttons & User Profile */}
                    <div className="hidden md:flex items-center space-x-4">
                        {auth.isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/create-trip" className="bg-cyan-500 text-slate-900 px-4 py-2 rounded-md font-semibold hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105">
                                    Create Trip
                                </Link>
                                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-cyan-400 font-bold text-sm">
                                        {auth.user?.name?.charAt(0).toUpperCase() || '👤'}
                                    </span>
                                </div>
                                <button onClick={handleLogout} className="text-slate-300 hover:text-rose-500 font-medium transition-colors duration-300">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className={navLinkClasses}>
                                    Login
                                </Link>
                                <Link to="/register" className="bg-cyan-500 text-slate-900 px-4 py-2 rounded-md font-semibold hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-cyan-400 transition-colors duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 border-t border-slate-800">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${isActive('/') ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'}`}>
                            Home
                        </Link>
                        <Link to="/trips" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${isActive('/trips') ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'}`}>
                            Explore
                        </Link>
                        {auth.isAuthenticated ? (
                            <>
                                <Link to="/mytrips" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${isActive('/mytrips') ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'}`}>
                                    My Trips
                                </Link>
                                <Link to="/create-trip" onClick={() => setIsMenuOpen(false)} className="block bg-cyan-500 text-slate-900 px-4 py-2 rounded-md font-semibold text-center mt-2">
                                    Create Trip
                                </Link>
                                <button onClick={handleLogout} className="block w-full text-left font-medium text-rose-500 px-3 py-2 mt-2">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className='pt-2 space-y-2 border-t border-slate-500'>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md font-medium text-slate-300`}>
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block bg-cyan-500 text-slate-900 px-4 py-2 rounded-md font-semibold text-center">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;