import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { dummyProducts, dummyCategories } from '../data/dummyProducts';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

const Page = styled.div`
  width: 100%;
  background: #FFFFFF;
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: 520px;
  background: linear-gradient(180deg, #0d1e33 0%, #173252 65%, #2a4e75 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  padding: 60px 48px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    min-height: 420px;
  }
`;

const HeroContent = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLeft = styled.div`
  span.tag {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.15);
    padding: 4px 10px;
    border-radius: 9999px;
    display: inline-block;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 44px;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -0.02em;

    @media (max-width: 600px) {
      font-size: 32px;
    }
  }

  p {
    font-size: 14px;
    opacity: 0.85;
    margin-bottom: 28px;
    max-width: 380px;
  }

  a.btn {
    background: #FFFFFF;
    color: #000000;
    padding: 12px 28px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const HeroRight = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  img {
    max-width: 440px;
    max-height: 400px;
    object-fit: contain;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.35));
  }
`;

const SectionWrap = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 56px 32px;

  @media (max-width: 768px) {
    padding: 40px 16px;
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

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FullBanner = styled.section`
  width: 100%;
  height: 420px;
  position: relative;
  margin: 20px 0 40px;
  background: url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }

  div.inner {
    position: relative;
    z-index: 2;
    padding: 20px;

    h3 {
      font-size: 32px;
      font-weight: 400;
      letter-spacing: -0.01em;
      margin-bottom: 20px;
    }

    a.pill {
      background: #FFFFFF;
      color: #000000;
      padding: 10px 24px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  }
`;

const DualGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 56px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DualCard = styled(Link)`
  position: relative;
  height: 380px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #F8F8F8;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  color: #000000;

  img.bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img.bg {
    transform: scale(1.03);
  }

  div.overlay-content {
    position: relative;
    z-index: 2;

    h4 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #000000;
    }

    span.btn-pill {
      background: rgba(255, 255, 255, 0.95);
      color: #000000;
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
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
  aspect-ratio: 1 / 1.2;
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
    object-fit: cover;
  }

  span.label {
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.9);
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

export default function HomePage() {
  const topRated = [...dummyProducts]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  const holidayGifts = dummyProducts.filter(p => p.category === 'sets & gifts' || p.category === 'fragrance');

  return (
    <Page>
      {/* Exact The Holiday Shop Hero banner from screenshot */}
      <HeroSection>
        <HeroContent>
          <HeroLeft>
            <span className="tag">Holiday 2026</span>
            <h1>The Holiday Shop</h1>
            <p>All wrapped up and ready to gift with complimentary bespoke packaging.</p>
            <Link to="/category/sets%20%26%20gifts" className="btn">
              Shop The Gift <ArrowRight size={13} />
            </Link>
          </HeroLeft>

          <HeroRight>
            <img src="/images/holiday-trio.jpg" alt="The Holiday Shop Trio" />
          </HeroRight>
        </HeroContent>
      </HeroSection>

      {/* Best Sellers (5 Featured Top Rated - Acceptance Criteria) */}
      <SectionWrap>
        <SectionHeader>
          <h2>Best Sellers</h2>
          <Link to="/category/deodorant" className="view-all">Shop All (5)</Link>
        </SectionHeader>

        <CarouselRow>
          {topRated.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </CarouselRow>
      </SectionWrap>

      {/* Editorial Full-width Scent banner */}
      <FullBanner>
        <div className="inner">
          <h3>Iconic Scents. Active Formulas.</h3>
          <Link to="/category/body%20wash" className="pill">
            Explore Formulas <ArrowRight size={12} />
          </Link>
        </div>
      </FullBanner>

      {/* Dual Featured Featurettes (Discovery Sets + Lily & Yuzu) */}
      <SectionWrap style={{ paddingTop: 0 }}>
        <DualGrid>
          <DualCard to="/category/sets%20%26%20gifts">
            <img src="/images/discovery-set.jpg" alt="Discovery Sets" className="bg" />
            <div className="overlay-content">
              <h4>Explore Discovery Sets</h4>
              <span className="btn-pill">Shop Now <ArrowRight size={11} /></span>
            </div>
          </DualCard>

          <DualCard to="/product/5">
            <img src="/images/perfume-lily.jpg" alt="Lily & Yuzu Perfume" className="bg" />
            <div className="overlay-content">
              <h4>Lily &amp; Yuzu Perfume</h4>
              <span className="btn-pill">Shop Now <ArrowRight size={11} /></span>
            </div>
          </DualCard>
        </DualGrid>

        {/* Holiday Gifts Row */}
        <SectionHeader>
          <h2>Holiday Gifts</h2>
          <Link to="/category/sets%20%26%20gifts" className="view-all">View All</Link>
        </SectionHeader>

        <CarouselRow>
          {holidayGifts.slice(0, 5).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </CarouselRow>

        {/* Shop By Category Visual Pill Section */}
        <SectionHeader style={{ marginTop: 48 }}>
          <h2>Shop by Category</h2>
          <span style={{ fontSize: 11, letterSpacing: '0.08em', color: '#888' }}>6 Collections</span>
        </SectionHeader>

        <CategoryPillsRow>
          <CategoryTile to="/category/deodorant">
            <img src="/images/deodorant-hero.jpg" alt="Deodorant" />
            <span className="label">Deodorant</span>
          </CategoryTile>
          <CategoryTile to="/category/body%20wash">
            <img src="/images/body-wash.jpg" alt="Body Wash" />
            <span className="label">Body Wash</span>
          </CategoryTile>
          <CategoryTile to="/category/fragrance">
            <img src="/images/perfume-lily.jpg" alt="Fragrance" />
            <span className="label">Fragrance</span>
          </CategoryTile>
          <CategoryTile to="/category/body%20mist">
            <img src="/images/body-mist.jpg" alt="Body Mist" />
            <span className="label">Body Mist</span>
          </CategoryTile>
          <CategoryTile to="/category/body%20oil">
            <img src="/images/body-oil.jpg" alt="Body Oil" />
            <span className="label">Body Oil</span>
          </CategoryTile>
        </CategoryPillsRow>
      </SectionWrap>
    </Page>
  );
}
