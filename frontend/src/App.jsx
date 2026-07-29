import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AuthSuccess from "./pages/AuthSuccess";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <Routes>

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/auth/success"
                element={<AuthSuccess />}
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default App;