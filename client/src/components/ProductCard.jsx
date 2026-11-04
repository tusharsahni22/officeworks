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
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.92;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.1;
  background-color: #F8F8F8;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 12px;

  img {
    max-width: 82%;
    max-height: 82%;
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
      <Category>{product.category}</Category>
      <Title title={product.title}>{product.title}</Title>
      <Subtitle>{product.subtitle || product.description}</Subtitle>
      <PriceRow>
        <span>${product.price.toFixed(2)}</span>
        <span style={{ color: '#888', fontSize: 11 }}>★ {product.rating?.rate}</span>
      </PriceRow>
    </Card>
  );
}
