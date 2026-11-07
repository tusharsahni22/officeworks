import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Menu, X } from 'lucide-react';
import { dummyCategories } from '../data/dummyProducts';

const Announcement = styled.div`
  background: #000000;
  color: #FFFFFF;
  text-align: center;
  padding: 8px 16px;
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 500;
  text-transform: uppercase;
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
  padding: 14px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  @media (max-width: 1024px) {
    padding: 12px 16px;
    gap: 12px;
  }
`;

const LeftNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const LeftLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;

  @media (max-width: 1080px) {
    display: none;
  }

  a {
    color: #333333;
    transition: color 0.15s ease;
    white-space: nowrap;
    &:hover {
      color: #000000;
    }
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #111111;

  @media (max-width: 1080px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Brand = styled(Link)`
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #000000;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 13px;
    letter-spacing: 0.08em;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  flex-shrink: 0;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 220px;

  @media (max-width: 700px) {
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

  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 16px;
  }
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

const MobileDrawer = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    background: #FFFFFF;
    border-top: 1px solid #EEEEEE;
    padding: 16px 20px 24px;
    gap: 14px;

    a {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #111111;
      padding: 6px 0;
      border-bottom: 1px solid #FAFAFA;
    }
  }
`;

export default function Navbar() {
  const [term, setTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <Announcement>Free Commercial Metro Delivery On Workstation Orders Over $55</Announcement>
      <NavHeader>
        <NavRow>
          <LeftNavGroup>
            <MobileMenuBtn onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Navigation">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </MobileMenuBtn>

            <Brand to="/">OFFICEWORKS // WORKPLACE</Brand>

            <LeftLinks>
              <Link to="/category/furniture%20%26%20seating">Workstations</Link>
              <Link to="/category/technology%20%26%20monitors">Technology</Link>
              <Link to="/pages/deals">Deals &amp; Offers</Link>
              <Link to="/pages/ergonomics">Ergonomics Guide</Link>
              <Link to="/pages/contact">Contact Us</Link>
            </LeftLinks>
          </LeftNavGroup>

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
          </RightSection>
        </NavRow>

        <MobileDrawer $open={menuOpen}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/category/furniture%20%26%20seating" onClick={() => setMenuOpen(false)}>Workstations &amp; Seating</Link>
          <Link to="/category/technology%20%26%20monitors" onClick={() => setMenuOpen(false)}>Technology &amp; Monitors</Link>
          <Link to="/pages/deals" onClick={() => setMenuOpen(false)}>Clearance &amp; Deals</Link>
          <Link to="/pages/ergonomics" onClick={() => setMenuOpen(false)}>Ergonomic Guide</Link>
          <Link to="/pages/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </MobileDrawer>

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
