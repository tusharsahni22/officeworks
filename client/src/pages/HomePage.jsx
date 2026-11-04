import React from 'react';
import styled from 'styled-components';
import { dummyProducts } from '../data/dummyProducts';
import ProductCard from '../components/ProductCard';
import { tokens } from '../styles/theme';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageWrap = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: ${tokens.spacing.space20} ${tokens.spacing.space20} ${tokens.spacing.space24};

  @media (max-width: 768px) {
    padding: ${tokens.spacing.space14};
  }
`;

const EditorialBanner = styled.section`
  background-color: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space23};
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: ${tokens.spacing.space21};
  align-items: center;
  margin-bottom: ${tokens.spacing.space22};

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: ${tokens.spacing.space17};
    gap: ${tokens.spacing.space17};
  }
`;

const BannerLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const Eyebrow = styled.div`
  font-size: ${tokens.typography.sizes.textXs};
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${tokens.colors.color3};
  margin-bottom: ${tokens.spacing.space14};
`;

const Heading = styled.h1`
  font-size: ${tokens.typography.sizes.textHero};
  line-height: ${tokens.typography.lineHeights.tight};
  color: ${tokens.colors.color1};
  letter-spacing: -0.03em;
  margin-bottom: ${tokens.spacing.space15};

  @media (max-width: 640px) {
    font-size: ${tokens.typography.sizes.text3xl};
  }
`;

const Subtitle = styled.p`
  font-size: ${tokens.typography.sizes.textLg};
  color: ${tokens.colors.color3};
  line-height: ${tokens.typography.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.space20};
  max-width: 560px;
`;

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${tokens.spacing.space14};
  padding-top: ${tokens.spacing.space17};
  border-top: 1px solid ${tokens.colors.color5};

  div.stat {
    span.val {
      display: block;
      font-size: ${tokens.typography.sizes.text2xl};
      letter-spacing: -0.02em;
      color: ${tokens.colors.color1};
      margin-bottom: ${tokens.spacing.space1};
    }
    span.lbl {
      font-size: ${tokens.typography.sizes.textXs};
      color: ${tokens.colors.color3};
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
  }
`;

const SpotlightCard = styled.div`
  background: ${tokens.colors.color6};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space20};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  span.badge {
    position: absolute;
    top: -10px;
    background: ${tokens.colors.color1};
    color: ${tokens.colors.color7};
    font-size: ${tokens.typography.sizes.textXs};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: ${tokens.spacing.space3} ${tokens.spacing.space11};
    border-radius: ${tokens.radii.radiusSm};
  }

  div.img-box {
    width: 240px;
    height: 240px;
    margin: ${tokens.spacing.space11} 0 ${tokens.spacing.space15};
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: ${tokens.radii.radiusSm};
    }
  }

  h3 {
    font-size: ${tokens.typography.sizes.textBase};
    letter-spacing: 0.04em;
    margin-bottom: ${tokens.spacing.space7};
  }

  span.price {
    font-size: ${tokens.typography.sizes.textXl};
    letter-spacing: 0.05em;
    margin-bottom: ${tokens.spacing.space14};
    color: ${tokens.colors.color1};
  }

  a.cta {
    background: ${tokens.colors.color1};
    color: ${tokens.colors.color7};
    padding: ${tokens.spacing.space11} ${tokens.spacing.space20};
    border-radius: ${tokens.radii.radiusSm};
    font-size: ${tokens.typography.sizes.textXs};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: ${tokens.spacing.space5};
    transition: ${tokens.motion.durationBase};

    &:hover {
      background: #333333;
    }
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid ${tokens.colors.color1};
  padding-bottom: ${tokens.spacing.space11};
  margin-bottom: ${tokens.spacing.space17};
  margin-top: ${tokens.spacing.space21};

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

const TrustRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${tokens.spacing.space17};
  margin: ${tokens.spacing.space23} 0;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const TrustCard = styled.div`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space20};

  div.icon {
    margin-bottom: ${tokens.spacing.space14};
    color: ${tokens.colors.color1};
  }

  h3 {
    font-size: ${tokens.typography.sizes.textLg};
    letter-spacing: 0.04em;
    margin-bottom: ${tokens.spacing.space7};
  }

  p {
    font-size: ${tokens.typography.sizes.textSm};
    color: ${tokens.colors.color3};
    line-height: ${tokens.typography.lineHeights.normal};
  }
`;

export default function HomePage() {
  // Acceptance criteria: GIVEN I have chosen 5 products to be "top rated", I see those 5 featured products
  const topRated = [...dummyProducts]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  const remainder = dummyProducts.filter((p) => !topRated.some((t) => t.id === p.id));
  const spotlight = topRated[0];

  return (
    <PageWrap>
      {/* Editorial Banner */}
      <EditorialBanner>
        <BannerLeft>
          <Eyebrow>SALT &amp; STONE // Performance Essentials</Eyebrow>
          <Heading>Engineered for the Modern Workspace.</Heading>
          <Subtitle>
            A curated portfolio of ergonomic workstation seating, motorized sit-stand architecture, and precision accessories built to elevate focus and productivity.
          </Subtitle>
          <StatsBar>
            <div className="stat">
              <span className="val">AFRDI 6</span>
              <span className="lbl">Durability Certified</span>
            </div>
            <div className="stat">
              <span className="val">24HR</span>
              <span className="lbl">Metro Dispatch</span>
            </div>
            <div className="stat">
              <span className="val">100%</span>
              <span className="lbl">Commercial Grade</span>
            </div>
          </StatsBar>
        </BannerLeft>

        <SpotlightCard>
          <span className="badge">Featured #1</span>
          <div className="img-box">
            <img src={spotlight.image} alt={spotlight.title} />
          </div>
          <h3>{spotlight.title}</h3>
          <span className="price">${spotlight.price.toFixed(2)}</span>
          <Link to={`/product/${spotlight.id}`} className="cta">
            View &amp; Enquire <ArrowRight size={12} />
          </Link>
        </SpotlightCard>
      </EditorialBanner>

      {/* Featured 5 Top Rated */}
      <section>
        <SectionHeader>
          <h2>Top Rated Essentials (Featured 5)</h2>
          <span className="meta">Verified Performance Ranking</span>
        </SectionHeader>
        <Grid>
          {topRated.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </Grid>
      </section>

      {/* Trust Signals First */}
      <TrustRow>
        <TrustCard>
          <div className="icon"><ShieldCheck size={20} /></div>
          <h3>Trust Signals First</h3>
          <p>Every workstation component is backed by verified commercial load certifications and direct manufacturing warranties.</p>
        </TrustCard>
        <TrustCard>
          <div className="icon"><Truck size={20} /></div>
          <h3>Clear Path to Action</h3>
          <p>Single-touch corporate enquiry routing directly connects your team with specialised commercial account managers.</p>
        </TrustCard>
        <TrustCard>
          <div className="icon"><Clock size={20} /></div>
          <h3>Speed Over Polish</h3>
          <p>Rapid dispatch schedules and transparent inventory availability across all national distribution centres.</p>
        </TrustCard>
      </TrustRow>

      {/* Complete Collection */}
      <section>
        <SectionHeader>
          <h2>All Catalogue Items</h2>
          <span className="meta">Showing {remainder.length} additional items</span>
        </SectionHeader>
        <Grid>
          {remainder.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </Grid>
      </section>
    </PageWrap>
  );
}
