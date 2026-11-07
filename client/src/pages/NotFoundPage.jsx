import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFoundWrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 120px 24px;
  text-align: center;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span.badge {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888888;
    background: #F4F4F4;
    padding: 6px 14px;
    border-radius: 9999px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  h1 {
    font-size: 40px;
    font-weight: 400;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    color: #111111;
  }

  p {
    font-size: 14px;
    color: #666666;
    max-width: 460px;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  div.actions {
    display: flex;
    gap: 16px;
  }

  a.btn {
    background: #000000;
    color: #FFFFFF;
    padding: 12px 28px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }

  a.btn-outline {
    background: transparent;
    color: #000000;
    border: 1px solid #CCCCCC;
    padding: 12px 28px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:hover {
      border-color: #000000;
    }
  }
`;

export default function NotFoundPage({ message }) {
  return (
    <NotFoundWrap>
      <span className="badge">404 Error</span>
      <h1>Page Not Found</h1>
      <p>
        {message || 'The page you are looking for does not exist, has been removed, or is not yet published in the CMS.'}
      </p>
      <div className="actions">
        <Link to="/" className="btn">
          <Home size={14} /> Back to Home
        </Link>
        <Link to="/category/furniture%20%26%20seating" className="btn-outline">
          Browse Catalogue
        </Link>
      </div>
    </NotFoundWrap>
  );
}
