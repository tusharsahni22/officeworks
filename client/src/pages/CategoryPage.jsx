import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { dummyProducts } from '../data/dummyProducts';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { api } from '../services/api';

const PageWrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 32px 64px;

  @media (max-width: 768px) {
    padding: 20px 16px 48px;
  }
`;

const BackNav = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #777777;
  margin-bottom: 24px;
  font-weight: 500;

  &:hover {
    color: #000000;
  }
`;

const CategoryHero = styled.div`
  background: #F8F8F8;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 36px;

  span.pre {
    color: #888888;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    display: block;
    margin-bottom: 8px;
  }

  h1 {
    font-size: 32px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
    color: #000000;
  }

  p {
    color: #666666;
    font-size: 13px;
    max-width: 520px;
    line-height: 1.5;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 12px;
  margin-bottom: 24px;
  margin-top: 32px;

  h2 {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  span.meta {
    font-size: 11px;
    color: #888888;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

export default function CategoryPage() {
  const { categoryName } = useParams();
  const decoded = decodeURIComponent(categoryName || '');
  const [data, setData] = useState({ topRated: [], additional: [] });

  useEffect(() => {
    async function loadCategory() {
      const res = await api.getCategoryProducts(decoded);
      if (res && res.topRated && res.topRated.length > 0) {
        setData({ topRated: res.topRated, additional: res.additional || [] });
      } else {
        const matched = dummyProducts.filter(
          (p) => p.category.toLowerCase() === decoded.toLowerCase()
        );
        const sorted = [...matched].sort((a, b) => b.rating.rate - a.rating.rate);
        const topCount = Math.min(2, Math.ceil(matched.length / 2));
        setData({
          topRated: sorted.slice(0, topCount),
          additional: sorted.slice(topCount)
        });
      }
    }
    loadCategory();
  }, [decoded]);

  return (
    <PageWrap>
      <BackNav to="/"><ArrowLeft size={13} /> Return to Shop</BackNav>

      <CategoryHero>
        <span className="pre">Collection</span>
        <h1>{decoded}</h1>
        <p>
          Formulated with active ocean botanicals, antioxidants, and restorative plant extracts for daily ritual.
        </p>
      </CategoryHero>

      <section>
        <SectionHeader>
          <h2>Top Rated in {decoded}</h2>
          <span className="meta">Customer Favorites</span>
        </SectionHeader>
        <Grid>
          {data.topRated.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </Grid>
      </section>

      {data.additional.length > 0 && (
        <section>
          <SectionHeader>
            <h2>More in this Collection</h2>
            <span className="meta">Complementary Formulations</span>
          </SectionHeader>
          <Grid>
            {data.additional.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </Grid>
        </section>
      )}
    </PageWrap>
  );
}
