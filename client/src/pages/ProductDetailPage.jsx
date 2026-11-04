import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { dummyProducts } from '../data/dummyProducts';
import EnquiryModal from '../components/EnquiryModal';
import { ArrowLeft, ShieldCheck, Truck, Clock } from 'lucide-react';
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

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${tokens.spacing.space21};
  background-color: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space21};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: ${tokens.spacing.space14};
  }
`;

const ImageStage = styled.div`
  background-color: ${tokens.colors.color6};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing.space21};
  min-height: 480px;

  img {
    max-width: 100%;
    max-height: 440px;
    object-fit: cover;
    border-radius: ${tokens.radii.radiusSm};
  }
`;

const MetaPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryLabel = styled.span`
  color: ${tokens.colors.color3};
  font-size: ${tokens.typography.sizes.textXs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: ${tokens.spacing.space7};
`;

const Title = styled.h1`
  font-size: ${tokens.typography.sizes.text3xl};
  line-height: ${tokens.typography.lineHeights.tight};
  color: ${tokens.colors.color1};
  letter-spacing: -0.01em;
  margin-bottom: ${tokens.spacing.space14};
`;

const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.space9};
  margin-bottom: ${tokens.spacing.space17};
  font-size: ${tokens.typography.sizes.textXs};

  span.badge {
    background: ${tokens.colors.color1};
    color: ${tokens.colors.color7};
    padding: ${tokens.spacing.space3} ${tokens.spacing.space7};
    border-radius: ${tokens.radii.radiusSm};
    letter-spacing: 0.08em;
  }

  span.reviews {
    color: ${tokens.colors.color3};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const PriceDisplay = styled.div`
  font-size: ${tokens.typography.sizes.text4xl};
  letter-spacing: 0.03em;
  color: ${tokens.colors.color1};
  margin-bottom: ${tokens.spacing.space17};
  border-bottom: 1px solid ${tokens.colors.color5};
  padding-bottom: ${tokens.spacing.space14};
`;

const DescriptionBlock = styled.div`
  margin-bottom: ${tokens.spacing.space20};

  h3 {
    font-size: ${tokens.typography.sizes.textBase};
    letter-spacing: 0.08em;
    margin-bottom: ${tokens.spacing.space9};
  }

  p {
    font-size: ${tokens.typography.sizes.textBase};
    line-height: ${tokens.typography.lineHeights.relaxed};
    color: #444444;
  }
`;

const EnquireCTA = styled.button`
  background-color: ${tokens.colors.color1};
  color: ${tokens.colors.color7};
  border: none;
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space15} ${tokens.spacing.space21};
  font-size: ${tokens.typography.sizes.textSm};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing.space7};
  transition: ${tokens.motion.durationBase};

  &:hover {
    background-color: #262626;
  }
`;

const TrustGrid = styled.div`
  margin-top: ${tokens.spacing.space21};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${tokens.spacing.space14};

  div.trust-box {
    border: 1px solid ${tokens.colors.color5};
    background-color: ${tokens.colors.color6};
    border-radius: ${tokens.radii.radiusSm};
    padding: ${tokens.spacing.space11} ${tokens.spacing.space14};
    font-size: ${tokens.typography.sizes.textXs};

    strong {
      display: flex;
      align-items: center;
      gap: ${tokens.spacing.space4};
      color: ${tokens.colors.color1};
      margin-bottom: ${tokens.spacing.space2};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    span {
      color: ${tokens.colors.color3};
    }
  }
`;

export default function ProductDetailPage() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const product = dummyProducts.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <PageWrap>
        <BackNav to="/"><ArrowLeft size={14} /> Return to Catalogue</BackNav>
        <h2>Product Item Not Found</h2>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <BackNav to="/"><ArrowLeft size={14} /> Return to Catalogue Overview</BackNav>

      <DetailGrid>
        <ImageStage>
          <img src={product.image} alt={product.title} />
        </ImageStage>

        <MetaPanel>
          <CategoryLabel>{product.category}</CategoryLabel>
          <Title>{product.title}</Title>

          <RatingBar>
            <span className="badge">★ {product.rating?.rate}</span>
            <span className="reviews">Verified Commercial Reviews ({product.rating?.count})</span>
          </RatingBar>

          <PriceDisplay>${product.price.toFixed(2)}</PriceDisplay>

          <DescriptionBlock>
            <h3>Commercial Specifications</h3>
            <p>{product.description}</p>
          </DescriptionBlock>

          {/* Principle: Clear path to action — one primary CTA per view, never stacked */}
          <EnquireCTA onClick={() => setModalOpen(true)}>
            Enquire for Commercial Pricing
          </EnquireCTA>

          <TrustGrid>
            <div className="trust-box">
              <strong><ShieldCheck size={14} /> Commercial Certified</strong>
              <span>AFRDI Level 6 rated durability</span>
            </div>
            <div className="trust-box">
              <strong><Truck size={14} /> Metro Pallet Freight</strong>
              <span>Priority commercial dispatch</span>
            </div>
          </TrustGrid>
        </MetaPanel>
      </DetailGrid>

      {modalOpen && (
        <EnquiryModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </PageWrap>
  );
}
