import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { tokens, GlobalStyle } from './styles/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import DynamicPage from './pages/DynamicPage';
import NotFoundPage from './pages/NotFoundPage';
import { api } from './services/api';

export default function App() {
  const [navData, setNavData] = useState(null);

  useEffect(() => {
    async function loadNavigation() {
      try {
        const data = await api.getNavigation();
        if (data) setNavData(data);
      } catch (err) {
        console.warn('Could not fetch dynamic navigation from CMS:', err);
      }
    }
    loadNavigation();
  }, []);

  return (
    <ThemeProvider theme={tokens}>
      <GlobalStyle />
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar navData={navData?.header} />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pages/:slug" element={<DynamicPage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer footerData={navData?.footer} />
        </div>
      </Router>
    </ThemeProvider>
  );
}
