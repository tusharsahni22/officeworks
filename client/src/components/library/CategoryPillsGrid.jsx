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

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryTile = styled(Link)`
  border-radius: 8px;
  overflow: hidden;
  background-color: #F5F5F5;
  aspect-ratio: 1 / 1.1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 16px;
  }

  span.label {
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.95);
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    align-self: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
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

