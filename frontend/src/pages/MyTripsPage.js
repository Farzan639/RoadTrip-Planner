import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../api';

const MyTripsPage = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyTrips = async () => {
            if (auth.isAuthenticated) {
                try {
                    const token = localStorage.getItem('token');
                    const config = { headers: { 'x-auth-token': token } };
                    const response = await axios.get(`${BASE_URL}/api/roadtrips/user/mytrips`, config);
                    setTrips(response.data);
                } catch (error) {
                    console.error("Error fetching my trips:", error);
                    setError("Failed to load your trips. Please try again.");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError("You must be logged in to view your trips.");
            }
        };
        fetchMyTrips();
    }, [auth.isAuthenticated]);

    const handleDelete = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${BASE_URL}/api/roadtrips/${id}`, { headers: { 'x-auth-token': token } });
                setTrips(trips.filter(trip => trip._id !== id));
            } catch (error) {
                console.error("Error deleting trip:", error);
                alert("Failed to delete trip. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-4 animate-spin text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="text-slate-400 text-lg font-medium">Loading Your Trips...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">My Road Trips</h1>
                            <p className="text-lg text-slate-400">Manage and track your amazing journeys.</p>
                        </div>
                        <Link to="/create-trip" className="inline-flex items-center justify-center bg-cyan-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-200 transform hover:scale-105 shadow-lg">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Create New Trip
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="text-center py-16">
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md mx-auto">
                            <svg className="w-12 h-12 text-rose-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <p className="text-rose-400 font-semibold text-lg">{error}</p>
                        </div>
                    </div>
                )}

                {!error && trips.length > 0 ? (
                    <>
                        {/* Stats Panel */}
                        <div className="mb-10 bg-slate-800 rounded-2xl p-6 border border-slate-700">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-cyan-400 mb-1">{trips.length}</div>
                                    <div className="text-slate-400 uppercase tracking-wider text-sm">Total Trips</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-cyan-400 mb-1">{trips.reduce((sum, trip) => sum + (trip.likes?.length || 0), 0)}</div>
                                    <div className="text-slate-400 uppercase tracking-wider text-sm">Total Likes</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-cyan-400 mb-1">{trips.reduce((sum, trip) => sum + (trip.views || 0), 0)}</div>
                                    <div className="text-slate-400 uppercase tracking-wider text-sm">Total Views</div>
                                </div>
                            </div>
                        </div>

                        {/* Trips Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trips.map(trip => (
                                <div key={trip._id} className="card group flex flex-col">
                                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                        <img src={trip.coverImage || '/placeholder-image.jpg'} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${trip.isPublic ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'}`}>
                                                {trip.isPublic ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">{trip.title}</h3>
                                        <p className="text-slate-400 mb-4 line-clamp-2 flex-grow">{trip.description}</p>
                                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                            <div className="flex items-center"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>{trip.likes?.length || 0} likes</div>
                                            <div className="flex items-center"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{new Date(trip.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                                            <Link to={`/trips/${trip._id}`} className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-200 text-sm">View Details</Link>
                                            <div className="flex space-x-4">
                                                <Link to={`/edit-trip/${trip._id}`} className="text-sky-400 hover:text-sky-300 font-medium transition-colors duration-200 text-sm">Edit</Link>
                                                <button onClick={() => handleDelete(trip._id, trip.title)} className="text-rose-500 hover:text-rose-400 font-medium transition-colors duration-200 text-sm">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    !error && (
                        <div className="text-center py-16">
                            <div className="bg-slate-800 rounded-2xl p-12 max-w-md mx-auto border border-slate-700">
                                <svg className="w-16 h-16 text-slate-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                <h3 className="text-2xl font-bold text-white mb-4">No Trips Yet</h3>
                                <p className="text-slate-400 mb-8">You haven't created any road trips. Start planning your first adventure!</p>
                                <Link to="/create-trip" className="inline-flex items-center bg-cyan-500 text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition-colors duration-200">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    Create Your First Trip
                                </Link>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default MyTripsPage;