import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowUpRight } from 'lucide-react';
import { tokens } from '../styles/theme';

const Card = styled(Link)`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: ${tokens.motion.durationBase};

  &:hover {
    border-color: ${tokens.colors.color1};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }
`;

const ImageArea = styled.div`
  width: 100%;
  height: 240px;
  background-color: #FAFAFA;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${tokens.colors.color5};
  position: relative;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: transform 0.25s ease-out;
  }

  ${Card}:hover & img {
    transform: scale(1.03);
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${tokens.colors.color1};
  color: ${tokens.colors.color7};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 2px;
  z-index: 2;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;

const Content = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h3`
  font-family: ${tokens.typography.fontFamilies.oracle};
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${tokens.colors.color1};
  line-height: 1.35;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 38px;
`;

const Description = styled.p`
  font-size: 12px;
  color: ${tokens.colors.color3};
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardBottom = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid ${tokens.colors.color5};
`;

const Price = styled.span`
  font-family: ${tokens.typography.fontFamilies.oracle};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${tokens.colors.color1};
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: ${tokens.colors.color1};

  span.rating {
    color: ${tokens.colors.color3};
    border-right: 1px solid ${tokens.colors.color5};
    padding-right: 8px;
  }
`;

export default function ProductCard({ product }) {
  return (
    <Card to={`/product/${product.id}`}>
      <ImageArea>
        <CategoryBadge>{product.category}</CategoryBadge>
        <img src={product.image} alt={product.title} loading="lazy" />
      </ImageArea>
      <Content>
        <Title title={product.title}>{product.title}</Title>
        <Description>{product.description}</Description>
        <CardBottom>
          <Price>${product.price.toFixed(2)}</Price>
          <Action>
            <span className="rating">★ {product.rating?.rate}</span>
            <ArrowUpRight size={15} />
          </Action>
        </CardBottom>
      </Content>
    </Card>
  );
}
