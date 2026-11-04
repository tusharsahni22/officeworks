import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { dummyProducts } from '../data/dummyProducts';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { tokens } from '../styles/theme';
import { api } from '../services/api';

const PageWrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${tokens.spacing.space20} ${tokens.spacing.space20} ${tokens.spacing.space24};
`;

const BackNav = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.space5};
  font-size: ${tokens.typography.sizes.textXs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${tokens.colors.color3};
  margin-bottom: ${tokens.spacing.space17};

  &:hover {
    color: ${tokens.colors.color1};
  }
`;

const CategoryHero = styled.div`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space21};
  margin-bottom: ${tokens.spacing.space21};

  span.pre {
    color: ${tokens.colors.color3};
    font-size: ${tokens.typography.sizes.textXs};
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  h1 {
    font-size: ${tokens.typography.sizes.text4xl};
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin: ${tokens.spacing.space7} 0 ${tokens.spacing.space11};
  }

  p {
    color: ${tokens.colors.color3};
    font-size: ${tokens.typography.sizes.textBase};
    max-width: 620px;
  }
`;

const SectionHeader = styled.div`
  border-bottom: 1px solid ${tokens.colors.color1};
  padding-bottom: ${tokens.spacing.space9};
  margin-bottom: ${tokens.spacing.space17};
  margin-top: ${tokens.spacing.space20};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h2 {
    font-size: ${tokens.typography.sizes.text2xl};
    letter-spacing: 0.06em;
  }

  span.meta {
    font-size: ${tokens.typography.sizes.textXs};
    color: ${tokens.colors.color3};
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${tokens.spacing.space17};
  margin-bottom: ${tokens.spacing.space22};
`;

export default function CategoryPage() {
  const { categoryName } = useParams();
  const decoded = decodeURIComponent(categoryName || '');
  const [data, setData] = useState({ topRated: [], additional: [] });

  useEffect(() => {
    async function loadCategory() {
      // Query backend category route
      const res = await api.getCategoryProducts(decoded);
      if (res && res.topRated) {
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
      <BackNav to="/"><ArrowLeft size={14} /> Return to All Categories</BackNav>

      <CategoryHero>
        <span className="pre">Catalogue Classification</span>
        <h1>{decoded}</h1>
        <p>
          Curated workstation items, ergonomic furniture, and precision office technology meeting commercial durability standards.
        </p>
      </CategoryHero>

      <section>
        <SectionHeader>
          <h2>Top Rated in {decoded}</h2>
          <span className="meta">Verified User Evaluations</span>
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
            <h2>Additional Products in Collection</h2>
            <span className="meta">Complementary Essentials</span>
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
