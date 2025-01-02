import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingElements } from './components/FloatingElements';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import AdminLogin from './components/Manage/Adminlogin';
import Dashboard from './components/Manage/Bookings/index.tsx';

const Feedback = React.lazy(() => import('./components/Feedback').then(module => ({ default: module.Feedback })));

// Auth guard component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken'); // Or your auth check
  return isAuthenticated ? children : <Navigate to="/admin-signin" replace />;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading && <LoadingScreen />}
      <div className="relative min-h-screen">
        <SimpleBar style={{ maxHeight: '100vh' }}>
          <Routes>
            {/* Public home route */}
            <Route 
              path="/" 
              element={
                <div className="relative">
                  <FloatingElements />
                  <Navbar />
                  <Hero />
                  <About />
                  <Services />
                  <Suspense fallback={<div>Loading...</div>}>
                    <Feedback />
                  </Suspense>
                  <Contact />
                  <Footer />
                </div>
              } 
            />

            {/* Admin routes */}
            <Route path="/admin-signin" element={<Adminlogin />} />
            <Route 
              path="/dashboard/*" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SimpleBar>
      </div>
    </Router>
  );
}

export default App;
