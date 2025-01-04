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

const Feedback = React.lazy(() => 
  import('./components/Feedback').then(module => ({ default: module.Feedback }))
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        try {
          // Use the correct path and ensure MIME type is set correctly
          const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
          });
          
          console.log('Service Worker registered with scope:', registration.scope);
          
          // Request notification permission
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            try {
              const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                // Make sure to use your actual VAPID key here
                applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
              });
              console.log('Push notification subscription:', subscription);
            } catch (pushError) {
              console.error('Push subscription failed:', pushError);
            }
          }
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();
  }, []);

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
      <Toaster position="top-right" richColors />
      {loading && <LoadingScreen />}
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