import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { dummyProducts, dummyCategories } from '../data/dummyProducts';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShieldCheck, Truck, Headphones } from 'lucide-react';

const Page = styled.div`
  width: 100%;
  background: #FFFFFF;
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: 500px;
  background: linear-gradient(180deg, #0f1c2e 0%, #172a44 65%, #1e3557 100%);
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
    max-width: 440px;
    line-height: 1.6;
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
    max-height: 380px;
    object-fit: contain;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.35));
    border-radius: 8px;
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
  color: #FFFFFF;

  img.bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.65);
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
    }

    span.btn-pill {
      background: #FFFFFF;
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

export default function HomePage() {
  const topRated = [...dummyProducts]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  const technologyPicks = dummyProducts.filter(p => p.category === 'technology & monitors');

  return (
    <Page>
      {/* Eye-catching Hero banner with workplace items */}
      <HeroSection>
        <HeroContent>
          <HeroLeft>
            <span className="tag">Commercial Workplace 2026</span>
            <h1>The Modern Office Suite</h1>
            <p>
              High-performance ergonomic task chairs, dual-motor sit-stand workstations, and precision monitors engineered for commercial durability.
            </p>
            <Link to="/category/furniture%20%26%20seating" className="btn">
              Explore Workstations <ArrowRight size={13} />
            </Link>
          </HeroLeft>

          <HeroRight>
            <img src="/images/ergonomic-chair.jpg" alt="Ergohuman Executive Chair" />
          </HeroRight>
        </HeroContent>
      </HeroSection>

      {/* Best Sellers (5 Featured Top Rated - Acceptance Criteria) */}
      <SectionWrap>
        <SectionHeader>
          <h2>Best Sellers (Featured 5 Top Rated)</h2>
          <Link to="/category/furniture%20%26%20seating" className="view-all">Shop All Workstations</Link>
        </SectionHeader>

        <CarouselRow>
          {topRated.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </CarouselRow>
      </SectionWrap>

      {/* Dual Featured Featurettes */}
      <SectionWrap style={{ paddingTop: 0 }}>
        <DualGrid>
          <DualCard to="/product/2">
            <img src="/images/standing-desk.jpg" alt="Motorised Standing Desk" className="bg" />
            <div className="overlay-content">
              <h4>Dual-Motor Standing Desks</h4>
              <span className="btn-pill">View Specs <ArrowRight size={11} /></span>
            </div>
          </DualCard>

          <DualCard to="/product/3">
            <img src="/images/curved-monitor.jpg" alt="Curved Productivity Monitor" className="bg" />
            <div className="overlay-content">
              <h4>Dell UltraSharp 34" Monitors</h4>
              <span className="btn-pill">View Specs <ArrowRight size={11} /></span>
            </div>
          </DualCard>
        </DualGrid>

        {/* Technology Highlights */}
        <SectionHeader>
          <h2>Commercial Technology &amp; Devices</h2>
          <Link to="/category/technology%20%26%20monitors" className="view-all">View All Tech</Link>
        </SectionHeader>

        <CarouselRow>
          {technologyPicks.slice(0, 5).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </CarouselRow>

        {/* Shop By Category Visual Pill Section */}
        <SectionHeader style={{ marginTop: 48 }}>
          <h2>Shop by Category</h2>
          <span style={{ fontSize: 11, letterSpacing: '0.08em', color: '#888' }}>5 Workplace Collections</span>
        </SectionHeader>

        <CategoryPillsRow>
          <CategoryTile to="/category/furniture%20%26%20seating">
            <img src="/images/ergonomic-chair.jpg" alt="Furniture" />
            <span className="label">Furniture &amp; Seating</span>
          </CategoryTile>
          <CategoryTile to="/category/technology%20%26%20monitors">
            <img src="/images/curved-monitor.jpg" alt="Monitors" />
            <span className="label">Monitors &amp; Tech</span>
          </CategoryTile>
          <CategoryTile to="/category/printers%20%26%20machines">
            <img src="/images/laser-printer.jpg" alt="Printers" />
            <span className="label">Printers &amp; Machines</span>
          </CategoryTile>
          <CategoryTile to="/category/storage%20%26%20organisation">
            <img src="/images/filing-cabinet.jpg" alt="Storage" />
            <span className="label">Storage Units</span>
          </CategoryTile>
          <CategoryTile to="/category/stationery%20%26%20supplies">
            <img src="/images/stationery-set.jpg" alt="Stationery" />
            <span className="label">Stationery &amp; Desk</span>
          </CategoryTile>
        </CategoryPillsRow>
      </SectionWrap>
    </Page>
  );
}
