import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrap = styled.footer`
  background-color: #FAFAFA;
  border-top: 1px solid #EEEEEE;
  padding: 60px 32px 32px;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: 40px 16px 24px;
  }
`;

const FooterGrid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 28px;
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
    font-size: 12px;
    color: #666;
    margin-bottom: 16px;
    line-height: 1.5;
    max-width: 380px;
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
    li a {
      color: #666;
      transition: color 0.15s ease;
      &:hover { color: #000; }
    }
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

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

export default function Footer({ footerData }) {
  const columns = footerData?.columns || [
    {
      title: 'Workplace Categories',
      links: [
        { label: 'Ergonomic Task Chairs', url: '/category/furniture%20%26%20seating' },
        { label: 'Motorised Standing Desks', url: '/category/furniture%20%26%20seating' },
        { label: 'Curved USB-C Monitors', url: '/category/technology%20%26%20monitors' },
        { label: 'Laser Printers & Scanners', url: '/category/printers%20%26%20machines' }
      ]
    },
    {
      title: 'Customer Services',
      links: [
        { label: 'Request Corporate Quote', url: '/pages/contact' },
        { label: 'Commercial Clearance & Deals', url: '/pages/deals' },
        { label: 'AFRDI Certification Guidelines', url: '/pages/ergonomics' },
        { label: 'Commercial Returns & Service', url: '/pages/contact' }
      ]
    },
    {
      title: 'Account & Legal',
      links: [
        { label: '30-Day B2B Trade Accounts', url: '/pages/contact' },
        { label: 'Supply Chain Compliance', url: '/pages/ergonomics' },
        { label: 'Circular Furniture Recycling', url: '/pages/ergonomics' },
        { label: 'Terms & Warranties', url: '/pages/contact' }
      ]
    }
  ];

  const newsletter = footerData?.newsletter || {
    title: 'Corporate Trade Updates',
    description: 'Receive updates on volume workstation fitouts, ergonomic certifications, and stock releases.'
  };

  const copyright = footerData?.copyright || `© ${new Date().getFullYear()} Officeworks Workplace Catalogue MVP.`;

  return (
    <FooterWrap>
      <FooterGrid>
        <NewsletterCol>
          <h4>{newsletter.title}</h4>
          <p>{newsletter.description}</p>
          <div className="input-wrap">
            <input type="email" placeholder="Enter corporate email" />
            <button>JOIN</button>
          </div>
        </NewsletterCol>

        {columns.map((col, idx) => (
          <LinkCol key={idx}>
            <h5>{col.title}</h5>
            <ul>
              {col.links?.map((lnk, lIdx) => (
                <li key={lIdx}>
                  {lnk.url?.startsWith('http') ? (
                    <a href={lnk.url} target="_blank" rel="noopener noreferrer">{lnk.label}</a>
                  ) : (
                    <Link to={lnk.url || '/'}>{lnk.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </LinkCol>
        ))}
      </FooterGrid>

      <BottomLegal>
        <span>{copyright}</span>
        <span>Commercial Terms · Warranty Information · Trade Inquiries</span>
      </BottomLegal>
    </FooterWrap>
  );
}

