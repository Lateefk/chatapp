// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import { ChatInput } from "./components/ChatInput";
// import MessageBubble from "./components/MessageBubble";
// import { Navbar } from "./components/Navbar";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { Login } from "./pages/Login";
// import ChatScreen from "./pages/ChatScreen"
// import PrivateRoute from "./routes/PrivateRoute";
 


// function App() {

//   // const {currentUser} = useAuth();
      
//       // console.log(currentUser)

//   return (
//     <>
//      <AuthProvider>

//       <Routes>
//         <Route element = {<Login/>} path="/login"/>
//         <Route element = {<PrivateRoute>
//           <ChatScreen/>

//         </PrivateRoute>} path="/chat"/>
//       </Routes>
      
     

//      </AuthProvider>
//     </>
//   );
// }

// export default App;









import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import ChatScreen from "./pages/ChatScreen";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatScreen />
            </PrivateRoute>
          }
        />
        {/* Optional: Redirect unknown routes */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
