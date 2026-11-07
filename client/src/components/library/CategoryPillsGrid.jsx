import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrap = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px 56px;

  @media (max-width: 768px) {
    padding: 0 16px 40px;
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

  span.sub {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: #888888;
  }
`;

const CategoryPillsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const CategoryTile = styled(Link)`
  border-radius: 8px;
  overflow: hidden;
  background-color: #F8F8F8;
  aspect-ratio: 1 / 1.1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  border: 1px solid #EEEEEE;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 20px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  span.label {
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.95);
    padding: 6px 12px;
    border-radius: 9999px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    align-self: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    text-align: center;
    white-space: nowrap;
    border: 1px solid #ECECEC;
  }
`;

export default function CategoryPillsGrid({
  title = 'Shop by Category',
  subtitle = '5 Workplace Collections',
  categories = []
}) {
  return (
    <Wrap>
      <SectionHeader>
        <h2>{title}</h2>
        {subtitle && <span className="sub">{subtitle}</span>}
      </SectionHeader>

      <CategoryPillsRow>
        {categories.map((cat) => (
          <CategoryTile key={cat.slug || cat.name} to={`/category/${encodeURIComponent(cat.slug || cat.name)}`}>
            {cat.image && <img src={cat.image} alt={cat.name} />}
            <span className="label">{cat.name}</span>
          </CategoryTile>
        ))}
      </CategoryPillsRow>
    </Wrap>
  );
}

