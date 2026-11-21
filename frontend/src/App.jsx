import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route
                path="/passenger/dashboard"
                element={<Dashboard />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;