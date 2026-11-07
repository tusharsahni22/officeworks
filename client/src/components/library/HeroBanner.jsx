import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = styled.section`
  width: 100%;
  min-height: 480px;
  background: linear-gradient(135deg, #09131f 0%, #0f1f33 50%, #152b47 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  padding: 64px 32px;

  @media (max-width: 900px) {
    padding: 48px 20px;
    min-height: auto;
  }
`;

const HeroContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 36px;
    text-align: center;
  }
`;

const HeroLeft = styled.div`
  span.tag {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 5px 12px;
    border-radius: 9999px;
    display: inline-block;
    margin-bottom: 24px;
    font-weight: 500;
  }

  h1 {
    font-size: 46px;
    font-weight: 300;
    line-height: 1.15;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
    color: #FFFFFF;

    @media (max-width: 900px) {
      font-size: 34px;
    }
    @media (max-width: 480px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 15px;
    opacity: 0.85;
    margin-bottom: 32px;
    max-width: 520px;
    line-height: 1.65;
    font-weight: 300;

    @media (max-width: 900px) {
      margin-left: auto;
      margin-right: auto;
      font-size: 14px;
    }
  }

  a.btn {
    background: #FFFFFF;
    color: #000000;
    padding: 14px 32px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);

    &:hover {
      background: #F0F0F0;
      transform: translateY(-1px);
    }
  }
`;

const HeroRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  div.image-frame {
    width: 100%;
    max-width: 420px;
    aspect-ratio: 1 / 1.05;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 70%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    backdrop-filter: blur(8px);

    @media (max-width: 480px) {
      max-width: 300px;
      padding: 16px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.45));
    transition: transform 0.4s ease;

    &:hover {
      transform: scale(1.03);
    }
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
          {image && (
            <div className="image-frame">
              <img src={image} alt={headline} />
            </div>
          )}
        </HeroRight>
      </HeroContent>
    </HeroSection>
  );
}

