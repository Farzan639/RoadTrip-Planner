import React from 'react';
import { Link } from 'react-router-dom';

// Simple SVG components for the features section for better readability
const FeatureMapIcon = () => (
    <svg className="w-full h-full text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 200 200">
        <path strokeWidth="2" strokeLinecap="round" d="M20 100 L80 120 L140 80 L180 100" />
        <path strokeWidth="1" strokeDasharray="4" d="M20 100 Q100 20 180 100" />
        <circle cx="20" cy="100" r="6" fill="#06B6D4" stroke="none" />
        <circle cx="180" cy="100" r="6" fill="#06B6D4" stroke="none" />
        <circle cx="100" cy="55" r="4" fill="#334155" stroke="none" />
    </svg>
);

const FeatureCommunityIcon = () => (
    <svg className="w-full h-full text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="70" strokeWidth="2"/>
        <circle cx="100" cy="100" r="10" fill="#06B6D4" stroke="none"/>
        <path strokeWidth="2" d="M100 90 A 40 40 0 0 1 150 125"/>
        <path strokeWidth="2" d="M100 90 A 40 40 0 0 0 50 125"/>
        <path strokeWidth="2" d="M75 60 A 30 30 0 0 1 125 60"/>
    </svg>
);

const FeatureShareIcon = () => (
    <svg className="w-full h-full text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 200 200">
        <rect x="30" y="50" width="140" height="100" rx="10" strokeWidth="2" />
        <path strokeWidth="2" d="M60 80 L90 110 L140 70" />
        <circle cx="150" cy="65" r="5" fill="#06B6D4" stroke="none" />
    </svg>
);


const HomePage = () => {
    return (
        <div className="bg-slate-900 text-slate-300">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <video autoPlay loop muted className="w-full h-full object-cover">
                        <source src="/background-video.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40 "></div>
                </div>

                {/* Hero Content - Two Column Layout */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Design Your Perfect
                                <span className="block text-cyan-400">
                                    Road Trip.
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto md:mx-0">
                                Ditch the endless spreadsheets. Our intuitive planner helps you craft, organize, and navigate your next great adventure with ease.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link to="/create-trip" className="bg-cyan-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105 inline-flex items-center justify-center text-lg">
                                    Start Planning
                                </Link>
                                <Link to="/trips" className="bg-slate-700 border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-600 hover:text-white transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center text-lg">
                                    Explore Trips
                                </Link>
                            </div>
                        </div>
                        {/* The right column can be used for a visual, but we'll leave it empty for a minimalist look */}
                    </div>
                </div>
            </div>

            {/* Features Section - Alternating Layout */}
            <div className="py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            The Ultimate Road Trip Toolkit
                        </h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                            From route optimization to discovering hidden gems, we've got you covered.
                        </p>
                    </div>

                    {/* Feature 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <div className="p-8 bg-slate-800/50 rounded-2xl">
                            <FeatureMapIcon />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-cyan-400 mb-4">Intelligent Route Planning</h3>
                            <p className="text-lg text-slate-400">
                                Build your route with our smart map. Add waypoints, see real-time distance and duration calculations, and get weather forecasts for your destinations.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <div className="md:order-2 p-8 bg-slate-800/50 rounded-2xl">
                            <FeatureCommunityIcon />
                        </div>
                        <div className="md:order-1">
                            <h3 className="text-3xl font-bold text-cyan-400 mb-4">Discover & Collaborate</h3>
                            <p className="text-lg text-slate-400">
                                Get inspired by trips from our community. Invite friends to collaborate on your plan in real-time and share your masterpiece with the world.
                            </p>
                        </div>
                    </div>

                     {/* Feature 3 */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="p-8 bg-slate-800/50 rounded-2xl">
                           <FeatureShareIcon />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-cyan-400 mb-4">Preserve Your Memories</h3>
                            <p className="text-lg text-slate-400">
                                Document your journey as it happens. Upload photos, write notes, and create a beautiful, shareable travelogue of your adventure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-slate-800">
                <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Start Your Engine.
                    </h2>
                    <p className="text-xl text-slate-300 mb-10">
                        Your next great story is just a few clicks away. Sign up for free and begin your adventure today.
                    </p>
                    <Link to="/register" className="bg-cyan-500 text-slate-900 px-10 py-4 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105 inline-flex items-center justify-center text-xl shadow-2xl">
                        Get Started - It's Free
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;