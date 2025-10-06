import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import WeatherWidget from '../components/WeatherWidget';
import { BASE_URL } from '../api';

const TripsPage = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTrips, setFilteredTrips] = useState([]);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/roadtrips`);
            const tripsData = response.data.trips || response.data;
            setTrips(tripsData);
            setFilteredTrips(tripsData);
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError('Failed to load trips. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredTrips(trips);
        } else {
            const filtered = trips.filter(trip =>
                trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trip.route?.some(r => r.locationName.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredTrips(filtered);
        }
    }, [searchQuery, trips]);

    const handleDelete = async (id, tripTitle) => {
        if (!auth.isAuthenticated) return navigate('/login');
        if (window.confirm(`Are you sure you want to delete "${tripTitle}"?`)) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${BASE_URL}/api/roadtrips/${id}`, { headers: { 'x-auth-token': token } });
                setTrips(trips.filter((trip) => trip._id !== id));
            } catch (error) {
                console.error('Error deleting trip:', error);
                alert('Failed to delete trip. Please try again.');
            }
        }
    };

    const handleLike = async (id) => {
        if (!auth.isAuthenticated) return navigate('/login');
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const res = await axios.put(`${BASE_URL}/api/roadtrips/${id}/like`, null, config);
            const updatedTrips = trips.map((trip) =>
                trip._id === id ? { ...trip, likes: res.data.likes || res.data } : trip
            );
            setTrips(updatedTrips);
        } catch (err) {
            console.error('Error liking trip:', err);
            alert('Failed to like trip. Please try again.');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
             <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 animate-spin text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-400 text-lg font-medium">Loading Amazing Trips...</p>
            </div>
        </div>
    );

    if (error) return (
         <div className="min-h-screen flex items-center justify-center bg-slate-900 text-center px-4">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <svg className="w-12 h-12 text-rose-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-rose-400 font-semibold text-lg mb-6">{error}</p>
                <button onClick={fetchTrips} className="bg-cyan-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-200">
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-900 py-12 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Explore Amazing <span className="text-cyan-400">Road Trips</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Discover incredible journeys planned by fellow travelers from around the world.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-10 max-w-2xl mx-auto">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search trips by destination, title, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field w-full !pl-12 !py-4"
                        />
                    </div>
                </div>

                {/* Trips Grid */}
                {filteredTrips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTrips.map((trip) => (
                            <div key={trip._id} className="card group flex flex-col">
                                {/* Trip Image */}
                                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                    <img src={trip.coverImage || '/placeholder-image.jpg'} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <button onClick={() => handleLike(trip._id)} className="absolute top-4 right-4 p-2 bg-slate-900/50 backdrop-blur-sm rounded-full hover:bg-slate-900/80 transition-all duration-200">
                                        <svg className={`w-5 h-5 transition-colors ${auth.user && trip.likes?.includes(auth.user.id) ? 'text-rose-500' : 'text-slate-300'}`} fill={auth.user && trip.likes?.includes(auth.user.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                                        </svg>
                                    </button>
                                </div>
                                {/* Trip Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">{trip.title}</h3>
                                    <p className="text-slate-400 mb-4 line-clamp-2 flex-grow">{trip.description}</p>
                                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                        <div className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{trip.route?.length || 0} stops</div>
                                        <div className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>{trip.likes?.length || 0} likes</div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                                        <Link to={`/trips/${trip._id}`} className="bg-cyan-500 text-slate-900 px-5 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-200 text-sm">View Details</Link>
                                        {auth.isAuthenticated && trip.user && trip.user._id === auth.user?.id && (
                                            <div className="flex space-x-4">
                                                <Link to={`/edit-trip/${trip._id}`} className="text-sky-400 hover:text-sky-300 font-medium transition-colors duration-200 text-sm">Edit</Link>
                                                <button onClick={() => handleDelete(trip._id, trip.title)} className="text-rose-500 hover:text-rose-400 font-medium transition-colors duration-200 text-sm">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-slate-800 rounded-2xl p-12 max-w-md mx-auto border border-slate-700">
                            <svg className="w-16 h-16 text-slate-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.691c-2.598-2.067-4.707-4.611-6.024-7.244a1 1 0 010-.992C2.053 7.82 6.293 3.5 12 3.5s9.947 4.32 10.976 7.473a1 1 0 010 .992C21.707 14.479 17.467 18.799 12 18.799z" /></svg>
                            <h3 className="text-xl font-semibold text-white mb-2">{searchQuery ? 'No trips found' : 'No trips available'}</h3>
                            <p className="text-slate-400 mb-6">{searchQuery ? `Your search for "${searchQuery}" did not return any results.` : 'Why not be the first to share an amazing journey?'}</p>
                            {!searchQuery && (
                                <Link to="/create-trip" className="inline-flex items-center bg-cyan-500 text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition-colors duration-200">
                                    Create Your First Trip
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripsPage;