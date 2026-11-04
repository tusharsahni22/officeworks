import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { dummyCategories } from '../data/dummyProducts';
import { tokens } from '../styles/theme';

const Announcement = styled.div`
  background: #000000;
  color: #FFFFFF;
  text-align: center;
  padding: 8px 16px;
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 500;
`;

const NavHeader = styled.header`
  background: #FFFFFF;
  border-bottom: 1px solid #EEEEEE;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const NavRow = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 32px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  @media (max-width: 860px) {
    display: flex;
    justify-content: space-between;
    padding: 14px 16px;
  }
`;

const LeftLinks = styled.div`
  display: flex;
  gap: 20px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;

  @media (max-width: 860px) {
    display: none;
  }

  a:hover {
    opacity: 0.6;
  }
`;

const Brand = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #000000;
  text-align: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 220px;

  @media (max-width: 600px) {
    width: 130px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px 10px 6px 28px;
  border: 1px solid #E0E0E0;
  border-radius: 9999px;
  font-size: 11px;
  outline: none;
  background: #FBFBFB;

  &:focus {
    border-color: #000000;
    background: #FFFFFF;
  }
`;

const SearchIconWrap = styled.div`
  position: absolute;
  left: 9px;
  color: #888888;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const CategoryBar = styled.nav`
  background: #FFFFFF;
  border-top: 1px solid #F5F5F5;
`;

const CategoryInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const CatLink = styled(Link)`
  padding: 10px 0;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ $active }) => ($active ? '#000000' : '#888888')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#000000' : 'transparent')};
  white-space: nowrap;

  &:hover {
    color: #000000;
  }
`;

export default function Navbar() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <>
      <Announcement>Free Next Day US Delivery On Orders Over $50+</Announcement>
      <NavHeader>
        <NavRow>
          <LeftLinks>
            <Link to="/category/deodorant">Shop All</Link>
            <Link to="/category/sets%20%26%20gifts">Gift Sets</Link>
            <Link to="/">Best Sellers</Link>
          </LeftLinks>

          <Brand to="/">SALT &amp; STONE</Brand>

          <RightSection>
            <SearchForm onSubmit={handleSearch}>
              <SearchIconWrap><Search size={13} /></SearchIconWrap>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </SearchForm>
            <span style={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}>BAG (0)</span>
          </RightSection>
        </NavRow>

        <CategoryBar>
          <CategoryInner>
            <CatLink to="/" $active={location.pathname === '/'}>All Products</CatLink>
            {dummyCategories.map((c) => (
              <CatLink
                key={c}
                to={`/category/${encodeURIComponent(c)}`}
                $active={location.pathname === `/category/${encodeURIComponent(c)}`}
              >
                {c}
              </CatLink>
            ))}
          </CategoryInner>
        </CategoryBar>
      </NavHeader>
    </>
  );
}
