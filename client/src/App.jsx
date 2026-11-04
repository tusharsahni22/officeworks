import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { tokens, GlobalStyle } from './styles/theme';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import styled from 'styled-components';

const Footer = styled.footer`
  background-color: ${tokens.colors.surface};
  border-top: 1px solid ${tokens.colors.color5};
  padding: ${tokens.spacing.space24} ${tokens.spacing.space20} ${tokens.spacing.space21};
  margin-top: auto;
`;

const FooterInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${tokens.spacing.space21};

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: ${tokens.spacing.space17};
  }

  div.brand-col {
    h4 {
      font-size: ${tokens.typography.sizes.textXl};
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${tokens.colors.color1};
      margin-bottom: ${tokens.spacing.space7};
    }
    p {
      font-size: ${tokens.typography.sizes.textSm};
      color: ${tokens.colors.color3};
      line-height: ${tokens.typography.lineHeights.relaxed};
      max-width: 360px;
    }
  }

  div.link-col {
    h5 {
      font-size: ${tokens.typography.sizes.textXs};
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: ${tokens.spacing.space14};
      color: ${tokens.colors.color1};
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: ${tokens.spacing.space9};
      font-size: ${tokens.typography.sizes.textSm};
      color: ${tokens.colors.color3};

      li a:hover {
        color: ${tokens.colors.color1};
      }
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1440px;
  margin: ${tokens.spacing.space22} auto 0;
  padding-top: ${tokens.spacing.space14};
  border-top: 1px solid ${tokens.colors.color5};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${tokens.typography.sizes.textXs};
  color: ${tokens.colors.color3};
  letter-spacing: 0.05em;
  text-transform: uppercase;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: ${tokens.spacing.space7};
    text-align: center;
  }
`;

export default function App() {
  return (
    <ThemeProvider theme={tokens}>
      <GlobalStyle />
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </main>
          <Footer>
            <FooterInner>
              <div className="brand-col">
                <h4>SALT &amp; STONE // WORKPLACE</h4>
                <p>
                  High-performance ergonomic furniture, motorized sit-stand desks, and workstation essentials engineered with minimalist architectural restraint.
                </p>
              </div>

              <div className="link-col">
                <h5>Categories</h5>
                <ul>
                  <li><Link to="/category/furniture%20%26%20seating">Furniture &amp; Seating</Link></li>
                  <li><Link to="/category/technology%20%26%20monitors">Technology &amp; Monitors</Link></li>
                  <li><Link to="/category/printers%20%26%20machines">Printers &amp; Machines</Link></li>
                  <li><Link to="/category/storage%20%26%20organisation">Storage &amp; Organisation</Link></li>
                  <li><Link to="/category/stationery%20%26%20supplies">Stationery &amp; Supplies</Link></li>
                </ul>
              </div>

              <div className="link-col">
                <h5>Commercial</h5>
                <ul>
                  <li><a href="#fitouts">Architectural Fitouts</a></li>
                  <li><a href="#accounts">Corporate Accounts</a></li>
                  <li><a href="#durability">AFRDI Certification</a></li>
                  <li><a href="#dispatch">Metro Freight</a></li>
                </ul>
              </div>

              <div className="link-col">
                <h5>Inquiries</h5>
                <ul>
                  <li><a href="#desk">Commercial Desk</a></li>
                  <li><a href="#support">Order Tracking</a></li>
                  <li><a href="#warranty">Warranty Guidelines</a></li>
                  <li><a href="#spec">Product Spec Sheets</a></li>
                </ul>
              </div>
            </FooterInner>

            <FooterBottom>
              <span>© {new Date().getFullYear()} SALT &amp; STONE. All rights reserved.</span>
              <span>Design System: #F5F5F5 · #000000 · #989898 · #E3E3E3</span>
            </FooterBottom>
          </Footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
