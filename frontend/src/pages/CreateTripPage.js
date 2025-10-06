import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../api';

const CreateTripPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDestination: '',
        finalDestination: '',
        duration: '',
        difficulty: 'Medium',
        tags: ''
    });
    const [images, setImages] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { title, description, startDestination, finalDestination, duration, difficulty, tags } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 5) {
            setError('You can upload a maximum of 5 images');
            return;
        }
        setImages(files);
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.isAuthenticated || !auth.user) {
            alert("You must be logged in to create a trip.");
            return navigate('/login');
        }
        if (!title.trim() || !description.trim() || !startDestination.trim() || !finalDestination.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');

        const formDataToSend = new FormData();
        formDataToSend.append('title', title.trim());
        formDataToSend.append('description', description.trim());
        formDataToSend.append('createdBy', auth.user.id);
        const route = [{ locationName: startDestination.trim(), description: "Starting Point" }, { locationName: finalDestination.trim(), description: "Final Destination" }];
        formDataToSend.append('route', JSON.stringify(route));
        if (duration.trim()) formDataToSend.append('duration', duration.trim());
        if (difficulty) formDataToSend.append('difficulty', difficulty);
        if (tags.trim()) {
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            formDataToSend.append('tags', JSON.stringify(tagArray));
        }
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formDataToSend.append('images', images[i]);
            }
        }

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token } };
            await axios.post(`${BASE_URL}/api/roadtrips`, formDataToSend, config);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error creating trip:', error);
            setError(error.response?.data?.message || 'Failed to create trip. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
                <div className="text-center p-12 bg-slate-800 rounded-2xl shadow-2xl max-w-md border border-slate-700">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-400 mb-4">Trip Created Successfully!</h2>
                    <p className="text-slate-400 mb-8">Your adventure has been published. What's next?</p>
                    <div className="space-y-4">
                        <Link to="/trips" className="block w-full bg-cyan-500 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors duration-200 transform hover:scale-105">
                            Explore All Trips
                        </Link>
                        <Link to="/mytrips" className="block text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
                            View My Trips
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Create Your <span className="text-cyan-400">Road Trip</span>
                    </h1>
                    <p className="text-lg text-slate-400">Share your next great adventure with the world.</p>
                </div>

                <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-rose-900/50 border border-rose-500 text-rose-300 px-4 py-3 rounded-xl text-sm">
                                <div className="flex items-center"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{error}</div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-2">Trip Title *</label>
                            <input id="title" type="text" name="title" value={title} onChange={handleChange} required className="input-field" placeholder="e.g., California Coast Adventure"/>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="startDestination" className="block text-sm font-semibold text-slate-300 mb-2">Starting Point *</label>
                                <input id="startDestination" type="text" name="startDestination" value={startDestination} onChange={handleChange} required className="input-field" placeholder="e.g., San Francisco"/>
                            </div>
                            <div>
                                <label htmlFor="finalDestination" className="block text-sm font-semibold text-slate-300 mb-2">Final Destination *</label>
                                <input id="finalDestination" type="text" name="finalDestination" value={finalDestination} onChange={handleChange} required className="input-field" placeholder="e.g., Los Angeles"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-slate-300 mb-2">Trip Description *</label>
                            <textarea id="description" name="description" rows="4" value={description} onChange={handleChange} required className="input-field resize-none" placeholder="Describe the highlights and key details of your trip..."/>
                        </div>

                        <div>
                            <label htmlFor="images" className="block text-sm font-semibold text-slate-300 mb-2">Trip Images</label>
                            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-cyan-500 transition-colors duration-200">
                                <input id="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden"/>
                                <label htmlFor="images" className="cursor-pointer">
                                    <div className="space-y-2">
                                        <svg className="w-12 h-12 text-slate-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        <div>
                                            <p className="text-slate-400">Click to upload or drag & drop</p>
                                            <p className="text-xs text-slate-500">Up to 5 images (PNG, JPG, etc.)</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            {images && images.length > 0 && <div className="mt-2 text-sm text-emerald-400">{images.length} image{images.length > 1 ? 's' : ''} selected</div>}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="duration" className="block text-sm font-semibold text-slate-300 mb-2">Estimated Duration</label>
                                <input id="duration" type="text" name="duration" value={duration} onChange={handleChange} className="input-field" placeholder="e.g., 7 days"/>
                            </div>
                            <div>
                                <label htmlFor="difficulty" className="block text-sm font-semibold text-slate-300 mb-2">Difficulty</label>
                                <select id="difficulty" name="difficulty" value={difficulty} onChange={handleChange} className="input-field">
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                    <option>Expert</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-semibold text-slate-300 mb-2">Tags</label>
                            <input id="tags" type="text" name="tags" value={tags} onChange={handleChange} className="input-field" placeholder="e.g., coast, hiking, food"/>
                            <p className="text-xs text-slate-500 mt-1">Separate tags with commas.</p>
                        </div>
                        
                        <div className="pt-6">
                            <button type="submit" disabled={loading} className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${loading ? 'bg-slate-600 cursor-not-allowed' : 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 transform hover:scale-105'}`}>
                                {loading ? (
                                    <div className="flex items-center justify-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Publishing...</div>
                                ) : ( 'Publish Trip' )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTripPage;