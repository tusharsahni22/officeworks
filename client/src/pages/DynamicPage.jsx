import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../services/api';
import { renderSection } from '../components/library/ComponentRegistry';
import NotFoundPage from './NotFoundPage';

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
  color: #777;
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export default function DynamicPage() {
  const { slug } = useParams();
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);

    async function loadLayout() {
      try {
        const targetSlug = slug || 'home';
        const data = await api.getPageLayout(targetSlug);

        if (isMounted) {
          if (data && Array.isArray(data.sections) && data.sections.length > 0) {
            setLayout(data);
          } else {
            setNotFound(true);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Failed to load page layout for ${slug}:`, err);
          setNotFound(true);
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

  if (notFound || !layout || !layout.sections || layout.sections.length === 0) {
    return <NotFoundPage message={`The page "/pages/${slug}" could not be found or has no published sections in Contentful.`} />;
  }

  const sections = layout.sections;

  return (
    <Page>
      {sections.map((section, idx) => renderSection(section, idx))}
    </Page>
  );
}

