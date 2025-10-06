import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import WeatherWidget from "../components/WeatherWidget";
import MapComponent from "../components/MapComponent";
import SimpleImageViewer from "react-simple-image-viewer";
import { BASE_URL } from "../api";

const TripDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const [trip, setTrip] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [routeData, setRouteData] = useState(null);
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState("");

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError("");
            try {
                const token = localStorage.getItem("token");
                const config = token ? { headers: { "x-auth-token": token } } : undefined;

                const [tripRes, commentsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/roadtrips/${id}`, config),
                    axios.get(`${BASE_URL}/api/comments/${id}`, config),
                ]);

                const tripData = tripRes.data;
                setTrip(tripData);
                setComments(commentsRes.data.comments || commentsRes.data);

                if (token && tripData.route && tripData.route.length >= 2) {
                    const startDest = tripData.route[0].locationName;
                    const finalDest = tripData.route[1].locationName;
                    axios.post(`${BASE_URL}/api/route`, { startLocationName: startDest, endLocationName: finalDest }, config)
                        .then((res) => setRouteData(res.data))
                        .catch(() => console.error("Failed to load route data"));
                    axios.get(`${BASE_URL}/api/places?location=${encodeURIComponent(finalDest)}`, config)
                        .then((res) => setPlaces(res.data.places || []))
                        .catch(() => console.error("Failed to load nearby places"));
                }
            } catch (err) {
                setError("Failed to load trip details. Please try again.");
                console.error("Error fetching trip details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !auth.isAuthenticated) return;
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { "x-auth-token": token } };
            const res = await axios.post(`${BASE_URL}/api/comments/${id}`, { text: newComment.trim() }, config);
            const populatedComment = { ...res.data, user: { username: auth.user?.username || "User" } };
            setComments([populatedComment, ...comments]);
            setNewComment("");
        } catch (err) {
            console.error("Error posting comment:", err);
            alert("Failed to post comment.");
        }
    };

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
             <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 animate-spin text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-400 text-lg font-medium">Loading Trip Details...</p>
            </div>
        </div>
    );

    if (error || !trip) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-center px-4">
            <p className="text-rose-400 font-semibold text-lg">{error || "Trip not found."}</p>
        </div>
    );

    const startDest = trip.route[0]?.locationName;
    const finalDest = trip.route[1]?.locationName;

    return (
        <div className="bg-slate-900 text-slate-300 min-h-screen">
            {/* Hero Header with Background Image */}
            <div className="relative h-96 w-full flex items-center justify-center text-center px-4">
                <div className="absolute inset-0 z-0">
                    <img src={trip.coverImage || '/placeholder-image.jpg'} alt={trip.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/70"></div>
                </div>
                <div className="relative z-10">
                    <button onClick={() => navigate(-1)} className="absolute -top-28 left-4 flex items-center text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-semibold">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back to Trips
                    </button>
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">{trip.title}</h1>
                    <p className="text-xl text-slate-300 mt-2">by @{trip.user?.username || 'a traveler'}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    
                    {/* Left/Main Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-4">Trip Description</h2>
                            <p className="text-slate-400 whitespace-pre-line leading-relaxed">{trip.description}</p>
                        </section>

                        {routeData ? <MapComponent routeData={routeData} /> : <p className="text-slate-500">Login to view route map.</p>}

                        {trip.images && trip.images.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold text-white mb-4">Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {trip.images.map((img, index) => (
                                        <img key={index} src={img} alt={`Trip image ${index + 1}`} className="w-full h-40 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105" loading="lazy" onClick={() => openImageViewer(index)} />
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        <section>
                             <h2 className="text-3xl font-bold text-white mb-4">Comments ({comments.length})</h2>
                             {auth.isAuthenticated && (
                                <form onSubmit={handleCommentSubmit} className="mb-8">
                                    <textarea rows={3} placeholder="Add a public comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="input-field resize-none" />
                                    <button type="submit" disabled={!newComment.trim()} className="mt-3 bg-cyan-500 text-slate-900 py-2 px-6 rounded-lg font-semibold hover:bg-cyan-400 transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed">
                                        Post Comment
                                    </button>
                                </form>
                            )}
                             <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment._id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                        <p className="font-semibold text-cyan-400">{comment.user?.username || "User"}</p>
                                        <p className="mt-1 text-slate-300 whitespace-pre-line">{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right/Sticky Sidebar Column */}
                    <div className="lg:sticky top-24 h-fit space-y-8">
                        {routeData && (
                            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                                <h3 className="text-xl font-bold text-white mb-4">Trip Stats</h3>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-cyan-400">{routeData.distance} km</p>
                                        <p className="text-sm text-slate-400 uppercase tracking-wider">Distance</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-cyan-400">{routeData.duration} hrs</p>
                                        <p className="text-sm text-slate-400 uppercase tracking-wider">Duration</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="space-y-6">
                            {startDest && <WeatherWidget location={startDest} />}
                            {finalDest && <WeatherWidget location={finalDest} />}
                        </div>
                        
                        {places.length > 0 && (
                            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                                <h3 className="text-xl font-bold text-white mb-4">Nearby in {finalDest}</h3>
                                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                                    {places.map((place) => (
                                        <div key={place.id} className="bg-slate-700/50 rounded-lg p-3">
                                            <p className="font-bold text-cyan-400">{place.name}</p>
                                            <p className="text-sm text-slate-300">{place.category}</p>
                                            <p className="text-xs mt-1 text-slate-500">{place.address}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isViewerOpen && trip.images && (
                <SimpleImageViewer src={trip.images} currentIndex={currentImage} onClose={closeImageViewer} backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.9)" }} />
            )}
        </div>
    );
};

export default TripDetailPage;