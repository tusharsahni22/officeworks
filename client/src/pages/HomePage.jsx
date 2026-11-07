import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';
import { renderSection } from '../components/library/ComponentRegistry';

const Page = styled.div`
  width: 100%;
  background: #FFFFFF;
  min-height: 80vh;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 20px;
  font-size: 14px;
  color: #777;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export default function HomePage() {
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadLayout() {
      try {
        const data = await api.getPageLayout('home');
        console.log('[HomePage] Loaded SDUI layout:', data);
        if (isMounted && data && Array.isArray(data.sections) && data.sections.length > 0) {
          setLayout(data);
        } else if (isMounted) {
          console.warn('[HomePage] No sections returned from CMS, using fallback');
          setLayout({
            sections: [
              {
                id: 'fb-hero',
                type: 'HeroBanner',
                props: {
                  tag: 'Commercial Workplace 2026',
                  headline: 'The Modern Office Suite',
                  subtitle: 'High-performance ergonomic task chairs, dual-motor sit-stand workstations, and precision monitors.',
                  ctaText: 'Explore Workstations',
                  ctaLink: '/category/furniture%20%26%20seating',
                  image: '/images/ergonomic-chair.jpg'
                }
              },
              {
                id: 'fb-shelf',
                type: 'ProductShelf',
                props: {
                  title: 'Best Sellers (Top Rated)',
                  mode: 'featured',
                  limit: 5
                }
              }
            ]
          });
        }
      } catch (err) {
        console.error('Failed to load page layout:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadLayout();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Page>
        <LoadingWrap>Loading Experience...</LoadingWrap>
      </Page>
    );
  }

  const sections = layout?.sections || [];

  return (
    <Page>
      {sections.map((section, idx) => renderSection(section, idx))}
    </Page>
  );
}
