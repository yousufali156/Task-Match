import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();

  // Dashboard route এ Header/Footer hide করবো
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="mt-18">
      {!isDashboardRoute && <Header />}
      
      <Outlet />
      
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

export default MainLayout;
