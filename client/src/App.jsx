import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { tokens, GlobalStyle } from './styles/theme';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import DynamicPage from './pages/DynamicPage';
import NotFoundPage from './pages/NotFoundPage';
import styled from 'styled-components';

const Footer = styled.footer`
  background-color: #FAFAFA;
  border-top: 1px solid #EEEEEE;
  padding: 60px 32px 32px;
  margin-top: auto;
`;

const FooterGrid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const NewsletterCol = styled.div`
  h4 {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }
  p {
    font-size: 11px;
    color: #666;
    margin-bottom: 16px;
  }
  div.input-wrap {
    display: flex;
    max-width: 320px;
    input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid #CCC;
      border-radius: 9999px 0 0 9999px;
      font-size: 11px;
      outline: none;
    }
    button {
      background: #000;
      color: #FFF;
      border: none;
      padding: 0 16px;
      border-radius: 0 9999px 9999px 0;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

const LinkCol = styled.div`
  h5 {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 16px;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 11px;
    color: #666;
    li a:hover { color: #000; }
  }
`;

const BottomLegal = styled.div`
  max-width: 1440px;
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid #EBEBEB;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #888888;
  letter-spacing: 0.05em;
  text-transform: uppercase;
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
              <Route path="/pages/:slug" element={<DynamicPage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer>
            <FooterGrid>
              <NewsletterCol>
                <h4>Corporate Trade Updates</h4>
                <p>Receive updates on volume workstation fitouts, ergonomic certifications, and stock releases.</p>
                <div className="input-wrap">
                  <input type="email" placeholder="Enter corporate email" />
                  <button>JOIN</button>
                </div>
              </NewsletterCol>

              <LinkCol>
                <h5>Workplace Categories</h5>
                <ul>
                  <li><Link to="/category/furniture%20%26%20seating">Ergonomic Task Chairs</Link></li>
                  <li><Link to="/category/furniture%20%26%20seating">Motorised Standing Desks</Link></li>
                  <li><Link to="/category/technology%20%26%20monitors">Curved USB-C Monitors</Link></li>
                  <li><Link to="/category/printers%20%26%20machines">Laser Printers &amp; Scanners</Link></li>
                </ul>
              </LinkCol>

              <LinkCol>
                <h5>Customer Services</h5>
                <ul>
                  <li><a href="#quote">Request Corporate Quote</a></li>
                  <li><a href="#delivery">Same-Day Metro Dispatch</a></li>
                  <li><a href="#warranty">AFRDI Certification Guidelines</a></li>
                  <li><a href="#returns">Commercial Returns &amp; Service</a></li>
                </ul>
              </LinkCol>

              <LinkCol>
                <h5>Account &amp; Legal</h5>
                <ul>
                  <li><a href="#trade">30-Day B2B Trade Accounts</a></li>
                  <li><a href="#compliance">Supply Chain Compliance</a></li>
                  <li><a href="#sustainability">Circular Furniture Recycling</a></li>
                  <li><a href="#terms">Terms &amp; Warranties</a></li>
                </ul>
              </LinkCol>
            </FooterGrid>

            <BottomLegal>
              <span>© {new Date().getFullYear()} Officeworks Workplace Catalogue MVP.</span>
              <span>Commercial Terms · Warranty Information · Trade Inquiries</span>
            </BottomLegal>
          </Footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
