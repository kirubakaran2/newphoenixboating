import React, { useEffect, useState, Suspense } from 'react';
import { Toaster } from 'sonner';
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
      <Toaster position="top-right" richColors />
      {loading && <LoadingScreen />}
      <div className="relative min-h-screen">
        <SimpleBar style={{ maxHeight: '100vh' }}>
          <div className="relative">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
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
                </>
              } />

              {/* Admin Routes */}
              <Route path="/admin-signin" element={<AdminLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </SimpleBar>
      </div>
    </Router>
  );
}

export default App;
