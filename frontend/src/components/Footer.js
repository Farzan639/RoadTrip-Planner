import React from 'react';
import { Link } from 'react-router-dom';

// Simple SVG components for social icons for better readability
const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-cyan-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center">

          {/* Centered Brand */}
          <Link to="/" className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-6V4m6 16l5.447-2.724a1 1 0 00.553-.894V5.618a1 1 0 00-1.447-.894L15 7m0 13v-6m0-6V4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-100">TripVerse</span>
          </Link>
          <p className="max-w-md mb-8">
            Your travel companion — Discover new places, plan adventures, and connect with travelers worldwide.
          </p>
          
          {/* Centered Unified Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 font-medium">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link to="/trips" className="hover:text-cyan-400 transition-colors">Explore</Link>
            <Link to="/create-trip" className="hover:text-cyan-400 transition-colors">Create Trip</Link>
            <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          </div>

          {/* Centered Social Icons */}
          <div className="flex space-x-6 mb-8">
            <a href="#" className="hover:text-cyan-400 transition-colors"><TwitterIcon /></a>
            <a href="#" className="hover:text-cyan-400 transition-colors"><GitHubIcon /></a>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} TripVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;