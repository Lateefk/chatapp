// import React from 'react'
// import {useAuth} from '../context/AuthContext'
// import { Navigate } from 'react-router-dom';

// export const PrivateRoute = ({children}) => {

//     const {currentUser} = useAuth();
//     if(!currentUser){
//         return <Navigate to="/login" replace={true}/>
//     }
//   return children
// }

// export default PrivateRoute




import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // While checking auth state, show loading or nothing
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!currentUser) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is logged in, show the protected content
  return children;
};

export default PrivateRoute;
