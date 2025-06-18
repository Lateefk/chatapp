import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import ChatScreen from "./pages/ChatScreen";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatScreen />
            </PrivateRoute>
          }
        />
        {/* Optional: Redirect unknown paths to login too */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
