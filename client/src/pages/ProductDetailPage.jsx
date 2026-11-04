import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { dummyProducts } from '../data/dummyProducts';
import EnquiryModal from '../components/EnquiryModal';
import { ArrowLeft, Star, Shield, Sparkles, Heart } from 'lucide-react';
import { api } from '../services/api';

const PageWrap = styled.div`
  max-width: 1300px;
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

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ImageStage = styled.div`
  background-color: #F8F8F8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  aspect-ratio: 1 / 1.1;

  img {
    max-width: 88%;
    max-height: 88%;
    object-fit: contain;
  }
`;

const MetaPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryLabel = styled.span`
  color: #777777;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 500;
  line-height: 1.25;
  color: #000000;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
`;

const SubtitleText = styled.p`
  font-size: 13px;
  color: #666666;
  margin-bottom: 16px;
`;

const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 11px;

  span.badge {
    background: #000000;
    color: #FFFFFF;
    padding: 3px 7px;
    border-radius: 2px;
    letter-spacing: 0.06em;
  }

  span.reviews {
    color: #777777;
  }
`;

const PriceDisplay = styled.div`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #000000;
  margin-bottom: 24px;
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 16px;
`;

const DescriptionBlock = styled.div`
  margin-bottom: 28px;

  h3 {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }

  p {
    font-size: 13px;
    line-height: 1.6;
    color: #444444;
  }
`;

const EnquireCTA = styled.button`
  background-color: #000000;
  color: #FFFFFF;
  border: none;
  border-radius: 9999px;
  padding: 16px 32px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.88;
  }
`;

const RitualPoints = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border-top: 1px solid #EEEEEE;
  padding-top: 24px;

  div.point {
    font-size: 11px;
    color: #555555;
    strong {
      display: block;
      color: #000000;
      margin-bottom: 2px;
      font-size: 12px;
    }
  }
`;

export default function ProductDetailPage() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const res = await api.getProductById(id);
      if (res) {
        setProduct(res);
      } else {
        const local = dummyProducts.find((p) => p.id === parseInt(id, 10));
        setProduct(local);
      }
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <PageWrap>
        <p style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.1em' }}>Loading formulation...</p>
      </PageWrap>
    );
  }

  if (!product) {
    return (
      <PageWrap>
        <BackNav to="/"><ArrowLeft size={13} /> Return to Shop</BackNav>
        <h2>Product Item Not Found</h2>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <BackNav to="/"><ArrowLeft size={13} /> Return to Collection</BackNav>

      <DetailGrid>
        <ImageStage>
          <img src={product.image} alt={product.title} />
        </ImageStage>

        <MetaPanel>
          <CategoryLabel>{product.category}</CategoryLabel>
          <Title>{product.title}</Title>
          {product.subtitle && <SubtitleText>{product.subtitle}</SubtitleText>}

          <RatingBar>
            <span className="badge">★ {product.rating?.rate}</span>
            <span className="reviews">Verified Customer Evaluations ({product.rating?.count})</span>
          </RatingBar>

          <PriceDisplay>${product.price.toFixed(2)}</PriceDisplay>

          <DescriptionBlock>
            <h3>Formulation &amp; Ritual Notes</h3>
            <p>{product.description}</p>
          </DescriptionBlock>

          <EnquireCTA onClick={() => setModalOpen(true)}>
            Enquire for Product Allocation &amp; Gifting
          </EnquireCTA>

          <RitualPoints>
            <div className="point">
              <strong>Active Botanical Extracts</strong>
              Seaweed, hyaluronic acid, and spirulina.
            </div>
            <div className="point">
              <strong>Clean Conscious Luxury</strong>
              Cruelty-free, recyclable ocean plastics.
            </div>
          </RitualPoints>
        </MetaPanel>
      </DetailGrid>

      {modalOpen && (
        <EnquiryModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </PageWrap>
  );
}
