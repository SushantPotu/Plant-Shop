import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductDetailPage from './pages/ProductDetail';
import ShopPage from './pages/Shop';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product/:plantId" element={<ProductDetailPage />} />

        <Route path="/shop" element={<ShopPage />} />
        <Route path="/" element={<ShopPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
