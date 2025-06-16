import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import pic from '../assets/img.png';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { signInWithGoogle, currentUser, loading } = useAuth();

  // Debug logging
  useEffect(() => {
    console.log('Login component - currentUser:', currentUser);
    console.log('Login component - loading:', loading);
  }, [currentUser, loading]);

  // Show loading screen while Firebase checks auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-amber-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  // Redirect to chat if already authenticated
  if (currentUser) {
    console.log('Redirecting to chat, user:', currentUser);
    return <Navigate to="/chat" replace />;
  }

  // Handle Google sign-in
  const handleLogin = async () => {
    try {
      console.log('Initiating Google sign-in...');
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image/Animation Section */}
      <div
        className="w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${pic})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-8">
            <TypeAnimation
              sequence={[
                "Welcome back to Banter",
                1000,
                "Have meaningful convos",
                1000,
                "Developed by NIIT React Class.",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{
                fontSize: "2.5em",
                display: "inline-block",
                fontWeight: "bold",
                color: "#fff",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                lineHeight: "1.2",
              }}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="flex w-1/2 items-center justify-center bg-amber-100">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Welcome back <span className="text-amber-400">Banter Buddy!</span>
          </h2>

          <p className="text-gray-600 mb-8">
            Sign in to continue your conversations
          </p>

          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};