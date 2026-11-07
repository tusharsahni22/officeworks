import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { dummyProducts } from '../../data/dummyProducts';

const SectionWrap = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 32px;

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  a.view-all {
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #777777;
    text-decoration: underline;

    &:hover {
      color: #000000;
    }
  }
`;

const CarouselRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

export default function ProductShelf({
  title = 'Featured Collection',
  viewAllText = 'View All',
  viewAllLink = '/category/furniture%20%26%20seating',
  mode = 'featured',
  category = '',
  limit = 5
}) {
  const numLimit = Number(limit) || 5;
  let products = [];

  if (mode === 'featured') {
    products = [...dummyProducts]
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, numLimit);
  } else if (category) {
    products = dummyProducts
      .filter((p) => p.category && p.category.toLowerCase().trim() === category.toLowerCase().trim())
      .slice(0, numLimit);
  } else {
    products = dummyProducts.slice(0, numLimit);
  }

  // Safety fallback if category filter yields no products
  if (products.length === 0) {
    products = dummyProducts.slice(0, numLimit);
  }

  return (
    <SectionWrap>
      <SectionHeader>
        <h2>{title}</h2>
        {viewAllLink && <Link to={viewAllLink} className="view-all">{viewAllText}</Link>}
      </SectionHeader>

      <CarouselRow>
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </CarouselRow>
    </SectionWrap>
  );
}

