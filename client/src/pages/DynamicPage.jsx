import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../services/api';
import { renderSection } from '../components/library/ComponentRegistry';

const Page = styled.div`
  width: 100%;
  background: #FFFFFF;
  min-height: 80vh;
`;

const StatusWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 20px;
  text-align: center;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }

  p {
    font-size: 13px;
    color: #666666;
    max-width: 440px;
  }
`;

export default function DynamicPage() {
  const { slug } = useParams();
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function loadLayout() {
      try {
        const targetSlug = slug || 'home';
        const data = await api.getPageLayout(targetSlug);

        if (isMounted) {
          if (data && Array.isArray(data.sections) && data.sections.length > 0) {
            setLayout(data);
          } else {
            setError(`No sections configured for page: "${targetSlug}"`);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Failed to load page layout for ${slug}:`, err);
          setError('Failed to load page layout.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadLayout();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <Page>
        <StatusWrap>
          <p>Loading Experience...</p>
        </StatusWrap>
      </Page>
    );
  }

  if (error || !layout) {
    return (
      <Page>
        <StatusWrap>
          <h2>Page Not Found</h2>
          <p>{error || 'This page has not been published in the CMS yet.'}</p>
        </StatusWrap>
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
