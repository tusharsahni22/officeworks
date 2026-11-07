import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = styled.section`
  width: 100%;
  min-height: 500px;
  background: linear-gradient(180deg, #0f1c2e 0%, #172a44 65%, #1e3557 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  padding: 60px 48px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    min-height: 420px;
  }
`;

const HeroContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLeft = styled.div`
  span.tag {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.15);
    padding: 4px 10px;
    border-radius: 9999px;
    display: inline-block;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 44px;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -0.02em;

    @media (max-width: 600px) {
      font-size: 32px;
    }
  }

  p {
    font-size: 14px;
    opacity: 0.85;
    margin-bottom: 28px;
    max-width: 440px;
    line-height: 1.6;
  }

  a.btn {
    background: #FFFFFF;
    color: #000000;
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
      opacity: 0.9;
    }
  }
`;

const HeroRight = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  img {
    max-width: 440px;
    max-height: 380px;
    object-fit: contain;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.35));
    border-radius: 8px;
  }
`;

export default function HeroBanner({
  tag = 'Commercial Workplace 2026',
  headline = 'The Modern Office Suite',
  subtitle = 'High-performance ergonomic task chairs, dual-motor sit-stand workstations, and precision monitors engineered for commercial durability.',
  ctaText = 'Explore Workstations',
  ctaLink = '/category/furniture%20%26%20seating',
  image = '/images/ergonomic-chair.jpg'
}) {
  return (
    <HeroSection>
      <HeroContent>
        <HeroLeft>
          {tag && <span className="tag">{tag}</span>}
          <h1>{headline}</h1>
          <p>{subtitle}</p>
          {ctaText && ctaLink && (
            <Link to={ctaLink} className="btn">
              {ctaText} <ArrowRight size={13} />
            </Link>
          )}
        </HeroLeft>

        <HeroRight>
          {image && <img src={image} alt={headline} />}
        </HeroRight>
      </HeroContent>
    </HeroSection>
  );
}

