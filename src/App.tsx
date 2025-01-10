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
import Gallery from './components/Gallery';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import AdminLogin from './components/Manage/Adminlogin';
import Dashboard from './components/Manage/Bookings';
import { BASE_URL } from './components/Manage/Bookings/components/constants';

const Feedback = React.lazy(() => 
  import('./components/Feedback').then(module => ({ default: module.Feedback }))
);
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  // Simulate a loading screen for the app
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  // Home page component
  const HomePage = () => (
    <>
      <FloatingElements />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Suspense fallback={<LoadingScreen />}>
        <Feedback />
      </Suspense>
      <Contact />
      <Footer />
    </>
  );

  return (
    <Router>
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        duration={5000}
      />
      
      {loading && <LoadingScreen />}
      
      {updateAvailable && (
        <div className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <p>New version available!</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 bg-white text-blue-500 px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      )}
      
      <div className="relative min-h-screen">
        <SimpleBar style={{ maxHeight: '100vh' }}>
          <div className="relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin-signin" element={<AdminLogin />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </SimpleBar>
      </div>
    </Router>
  );
}

export default App;