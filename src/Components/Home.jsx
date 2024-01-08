import Layout from "./Layout";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Login";

export default function Home(){
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

      return (
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? '/home' : '/login'} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Layout />} />
          </Routes>
        </Router>
        )
}