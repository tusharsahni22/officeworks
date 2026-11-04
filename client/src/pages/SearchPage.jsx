import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { dummyProducts } from '../data/dummyProducts';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Search } from 'lucide-react';
import { tokens } from '../styles/theme';

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

const SearchHeader = styled.div`
  border-bottom: 1px solid ${tokens.colors.color1};
  padding-bottom: ${tokens.spacing.space14};
  margin-bottom: ${tokens.spacing.space20};

  h1 {
    font-size: ${tokens.typography.sizes.text3xl};
    letter-spacing: 0.04em;
  }

  p {
    color: ${tokens.colors.color3};
    font-size: ${tokens.typography.sizes.textSm};
    margin-top: ${tokens.spacing.space3};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${tokens.spacing.space17};
`;

const NoResult = styled.div`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space23} ${tokens.spacing.space20};
  text-align: center;

  h3 {
    font-size: ${tokens.typography.sizes.textXl};
    letter-spacing: 0.04em;
    margin: ${tokens.spacing.space14} 0 ${tokens.spacing.space7};
  }

  p {
    font-size: ${tokens.typography.sizes.textSm};
    color: ${tokens.colors.color3};
  }
`;

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim();

  const matched = query
    ? dummyProducts.filter((p) => {
        const text = `${p.title} ${p.description} ${p.category}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
    : [];

  return (
    <PageWrap>
      <BackNav to="/"><ArrowLeft size={14} /> Return to Catalogue Overview</BackNav>

      <SearchHeader>
        <h1>Search Results</h1>
        <p>
          Found {matched.length} result(s) matching keyword: <strong>"{query}"</strong>
        </p>
      </SearchHeader>

      {matched.length > 0 ? (
        <Grid>
          {matched.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </Grid>
      ) : (
        <NoResult>
          <Search size={36} color="#000000" style={{ margin: '0 auto' }} />
          <h3>No matching products found</h3>
          <p>Please check your spelling or browse our workstation categories.</p>
        </NoResult>
      )}
    </PageWrap>
  );
}
