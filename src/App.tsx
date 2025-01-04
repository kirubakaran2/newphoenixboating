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
import Dashboard from './components/Manage/Bookings/index.tsx';
import { BASE_URL } from './components/Manage/Bookings/components/constants.ts';

const Feedback = React.lazy(() => import('./components/Feedback').then(module => ({ default: module.Feedback })));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Register the service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
          subscribeUserToPush(registration);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  async function subscribeUserToPush(registration: ServiceWorkerRegistration) {
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BJSGv5raHxSFIvnQB493vrLqXCtGnpLfm1Yzw4nS9X67d4nh6pktfHewpyzajnAR0VjHg8G6qrKPeldQUqf13s0',
      });
      console.log('Push subscription:', subscription);
      // Send subscription to your backend
      await fetch(`${BASE_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  }
  

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
                  <Services />
                  <About />
                  <Gallery />
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