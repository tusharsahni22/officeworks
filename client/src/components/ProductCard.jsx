import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  position: relative;
  text-decoration: none;
  color: #000000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #F0F0F0;
  padding-bottom: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  background-color: #FAFAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 12px;
  padding: 16px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.35s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #000000;
  background: rgba(255, 255, 255, 0.9);
  padding: 3px 7px;
  border-radius: 2px;
`;

const Category = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #777777;
  margin-bottom: 4px;
`;

const Title = styled.h3`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.3;
  margin-bottom: 4px;
  color: #000000;
`;

const Subtitle = styled.p`
  font-size: 11px;
  color: #777777;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  font-size: 12px;
  font-weight: 500;
`;

export default function ProductCard({ product }) {
  return (
    <Card to={`/product/${product.id}`}>
      <ImageContainer>
        {product.badge && <Badge>{product.badge}</Badge>}
        <img src={product.image} alt={product.title} loading="lazy" />
      </ImageContainer>
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Category>{product.category}</Category>
        <Title title={product.title}>{product.title}</Title>
        <Subtitle>{product.subtitle || product.description}</Subtitle>
        <PriceRow>
          <span style={{ fontWeight: 600 }}>${product.price.toFixed(2)}</span>
          <span style={{ color: '#888', fontSize: 11 }}>★ {product.rating?.rate}</span>
        </PriceRow>
      </div>
    </Card>
  );
}
