import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { dummyProducts } from '../data/dummyProducts';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Search } from 'lucide-react';
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

const SearchHeader = styled.div`
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 16px;
  margin-bottom: 28px;

  h1 {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  p {
    color: #777777;
    font-size: 12px;
    margin-top: 4px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 280px));
  gap: 24px;
  justify-content: start;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const NoResult = styled.div`
  background: #F8F8F8;
  border-radius: 8px;
  padding: 48px 24px;
  text-align: center;

  h3 {
    font-size: 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 16px 0 6px;
  }

  p {
    font-size: 12px;
    color: #777777;
  }
`;

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim();
  const [matched, setMatched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setMatched([]);
        setLoading(false);
        return;
      }
      setLoading(true);

      const results = await api.getProducts({ search: query });
      if (results && results.length > 0) {
        setMatched(results);
      } else {
        const local = dummyProducts.filter((p) => {
          const text = `${p.title} ${p.description} ${p.category}`.toLowerCase();
          return text.includes(query.toLowerCase());
        });
        setMatched(local);
      }
      setLoading(false);
    }
    performSearch();
  }, [query]);

  return (
    <PageWrap>
      <BackNav to="/"><ArrowLeft size={13} /> Return to Shop</BackNav>

      <SearchHeader>
        <h1>Search Results</h1>
        <p>
          Found {matched.length} result(s) for <strong>"{query}"</strong>
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
          <Search size={32} color="#000000" style={{ margin: '0 auto' }} />
          <h3>No products found</h3>
          <p>Please check your spelling or explore our fragrance and body care collections.</p>
        </NoResult>
      )}
    </PageWrap>
  );
}
