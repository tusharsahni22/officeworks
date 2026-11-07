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
        if (isMounted && data && Array.isArray(data.sections)) {
          setLayout(data);
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
