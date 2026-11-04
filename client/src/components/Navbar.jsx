import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { dummyCategories } from '../data/dummyProducts';
import { tokens } from '../styles/theme';

const Header = styled.header`
  background-color: ${tokens.colors.surface};
  border-bottom: 1px solid ${tokens.colors.color5};
  position: sticky;
  top: 0;
  z-index: 50;
`;

const AnnouncementBar = styled.div`
  background-color: ${tokens.colors.color1};
  color: ${tokens.colors.color7};
  font-size: 11px;
  text-align: center;
  padding: 8px 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const NavMain = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 860px) {
    flex-wrap: wrap;
    padding: 14px 16px;
  }
`;

const Brand = styled(Link)`
  font-family: ${tokens.typography.fontFamilies.oracle};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.colors.color1};
  white-space: nowrap;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  max-width: 440px;

  @media (max-width: 860px) {
    order: 3;
    max-width: 100%;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 85px 10px 38px;
  background-color: ${tokens.colors.color6};
  border: 1px solid ${tokens.colors.color5};
  border-radius: 2px;
  font-size: 13px;
  color: ${tokens.colors.color1};
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${tokens.colors.color1};
    background-color: ${tokens.colors.surface};
  }

  &::placeholder {
    color: ${tokens.colors.color3};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.05em;
  }
`;

const SearchIconWrap = styled.div`
  position: absolute;
  left: 12px;
  color: ${tokens.colors.color3};
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchSubmit = styled.button`
  position: absolute;
  right: 4px;
  top: 4px;
  bottom: 4px;
  background-color: ${tokens.colors.color1};
  color: ${tokens.colors.color7};
  border: none;
  border-radius: 2px;
  padding: 0 16px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333333;
  }
`;

const CategoryBar = styled.nav`
  border-top: 1px solid ${tokens.colors.color5};
  background-color: ${tokens.colors.surface};
`;

const CategoryInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const CategoryLink = styled(Link)`
  padding: 14px 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? tokens.colors.color1 : tokens.colors.color3)};
  border-bottom: 2px solid ${({ $active }) => ($active ? tokens.colors.color1 : 'transparent')};
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: ${tokens.colors.color1};
  }
`;

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Header>
      <AnnouncementBar>
        Complimentary Delivery On Commercial Workstation Orders · Trust Signals First
      </AnnouncementBar>

      <NavMain>
        <Brand to="/">
          SALT &amp; STONE // WORKPLACE
        </Brand>

        <SearchForm onSubmit={handleSearch}>
          <SearchIconWrap>
            <Search size={14} />
          </SearchIconWrap>
          <SearchInput
            type="text"
            placeholder="Search chairs, desks, monitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchSubmit type="submit">Search</SearchSubmit>
        </SearchForm>
      </NavMain>

      <CategoryBar>
        <CategoryInner>
          <CategoryLink to="/" $active={location.pathname === '/'}>
            All Products
          </CategoryLink>
          {dummyCategories.map((cat) => {
            const active = location.pathname === `/category/${encodeURIComponent(cat)}`;
            return (
              <CategoryLink key={cat} to={`/category/${encodeURIComponent(cat)}`} $active={active}>
                {cat}
              </CategoryLink>
            );
          })}
        </CategoryInner>
      </CategoryBar>
    </Header>
  );
}
