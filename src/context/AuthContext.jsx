import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  signInWithPopup, // Alternative to redirect
} from 'firebase/auth';
import { auth } from '../authentication/Firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Try popup instead of redirect (more reliable for debugging)
  const signInWithGoogle = async () => {
    try {
      setError(null);
      console.log('🚀 Starting Google sign-in...');
      
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      // Try popup first (easier to debug)
      const result = await signInWithPopup(auth, provider);
      console.log('✅ Popup sign-in successful:', result.user);
      
      return result;
    } catch (error) {
      console.error('❌ Popup sign-in failed, trying redirect:', error);
      setError(error.message);
      
      // Fallback to redirect if popup fails
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      signInWithRedirect(auth, provider);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out...');
      await signOut(auth);
      setCurrentUser(null);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout Error:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    console.log('🔄 AuthProvider useEffect running...');
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔍 Checking for redirect result...');
        const result = await getRedirectResult(auth);
        
        if (result?.user && mounted) {
          console.log('✅ Redirect result found:', result.user);
          setCurrentUser(result.user);
        } else {
          console.log('ℹ️ No redirect result found');
        }
      } catch (error) {
        console.error('❌ Redirect result error:', error);
        if (mounted) {
          setError(error.message);
        }
      }
    };

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (mounted) {
        console.log('🔄 Auth state changed:', user ? `User: ${user.email}` : 'No user');
        console.log('📄 Full user object:', user);
        
        setCurrentUser(user);
        setLoading(false);
        
        if (user) {
          console.log('✅ User authenticated:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
        }
      }
    }, (error) => {
      console.error('❌ Auth state change error:', error);
      if (mounted) {
        setError(error.message);
        setLoading(false);
      }
    });

    // Check current auth state immediately
    const currentAuthUser = auth.currentUser;
    console.log('🔍 Current auth user on mount:', currentAuthUser);

    // Initialize auth check
    initializeAuth();

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up auth listener...');
      mounted = false;
      unsubscribe();
    };
  }, []);

  // Debug effect to track state changes
  useEffect(() => {
    console.log('📊 Auth state summary:', {
      currentUser: currentUser ? currentUser.email : 'null',
      loading,
      error,
      authCurrentUser: auth.currentUser ? auth.currentUser.email : 'null'
    });
  }, [currentUser, loading, error]);

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};