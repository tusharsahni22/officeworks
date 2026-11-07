import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DualGrid = styled.div`
  max-width: 1440px;
  margin: 0 auto 48px;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 16px;
  }
`;

const DualCard = styled(Link)`
  position: relative;
  height: 380px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #F8F8F8;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  color: #FFFFFF;

  img.bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.65);
    transition: transform 0.4s ease;
  }

  &:hover img.bg {
    transform: scale(1.03);
  }

  div.overlay-content {
    position: relative;
    z-index: 2;

    h4 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    span.btn-pill {
      background: #FFFFFF;
      color: #000000;
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  }
`;

export default function DualFeaturette({
  leftCard = {
    title: 'Dual-Motor Standing Desks',
    image: '/images/standing-desk.jpg',
    link: '/product/2',
    btnText: 'View Specs'
  },
  rightCard = {
    title: 'Dell UltraSharp 34" Monitors',
    image: '/images/curved-monitor.jpg',
    link: '/product/3',
    btnText: 'View Specs'
  }
}) {
  return (
    <DualGrid>
      <DualCard to={leftCard.link}>
        <img src={leftCard.image} alt={leftCard.title} className="bg" />
        <div className="overlay-content">
          <h4>{leftCard.title}</h4>
          <span className="btn-pill">{leftCard.btnText || 'Shop Now'} <ArrowRight size={11} /></span>
        </div>
      </DualCard>

      <DualCard to={rightCard.link}>
        <img src={rightCard.image} alt={rightCard.title} className="bg" />
        <div className="overlay-content">
          <h4>{rightCard.title}</h4>
          <span className="btn-pill">{rightCard.btnText || 'Shop Now'} <ArrowRight size={11} /></span>
        </div>
      </DualCard>
    </DualGrid>
  );
}
