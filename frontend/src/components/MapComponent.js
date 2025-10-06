import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom SVG-based icons for a modern, themeable look
const startIcon = new L.divIcon({
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-cyan-400 drop-shadow-lg">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
        </svg>`,
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const endIcon = new L.divIcon({
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-rose-500 drop-shadow-lg">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
        </svg>`,
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const MapComponent = ({ routeData, className = "" }) => {
    if (!routeData || !routeData.polyline || routeData.polyline.length === 0) {
        return (
            <div className={`bg-slate-800 rounded-xl flex items-center justify-center h-96 ${className}`}>
                <div className="text-center text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-3 animate-spin text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="font-medium">Generating Route Map...</p>
                </div>
            </div>
        );
    }

    const startPosition = routeData.polyline[0];
    const endPosition = routeData.polyline[routeData.polyline.length - 1];
    
    // Calculate bounds to auto-fit the map
    const bounds = L.latLngBounds(routeData.polyline);

    return (
        <div className={`rounded-xl overflow-hidden shadow-lg border border-slate-700 ${className}`}>
            <MapContainer 
                bounds={bounds}
                scrollWheelZoom={false}
                style={{ height: '400px', width: '100%' }} 
                className="z-10"
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {/* Glow effect for the polyline */}
                <Polyline pathOptions={{ color: '#06B6D4', weight: 8, opacity: 0.4 }} positions={routeData.polyline} />
                {/* Main polyline */}
                <Polyline pathOptions={{ color: '#67E8F9', weight: 4 }} positions={routeData.polyline} />

                <Marker position={startPosition} icon={startIcon}>
                    <Popup className="popup-dark">
                        <p className="font-semibold text-cyan-400">Starting Point</p>
                        {routeData.startLocation && <p className="text-sm">{routeData.startLocation.name}</p>}
                    </Popup>
                </Marker>

                <Marker position={endPosition} icon={endIcon}>
                    <Popup className="popup-dark">
                        <p className="font-semibold text-rose-500">Destination</p>
                        {routeData.endLocation && <p className="text-sm">{routeData.endLocation.name}</p>}
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Route Info */}
            <div className="bg-slate-800 p-4 border-t border-slate-700">
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
        </div>
    );
};

export default MapComponent;