import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./layout/Form";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Form formType="login" />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<Form formType="register" />}>
            <Route index element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
