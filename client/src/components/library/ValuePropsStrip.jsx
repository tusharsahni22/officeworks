import React from 'react';
import styled from 'styled-components';
import { Truck, ShieldCheck, RefreshCw, Award } from 'lucide-react';

const Strip = styled.section`
  background: #F8F9FA;
  border-top: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
  padding: 24px 32px;
`;

const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ValueItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  div.icon-box {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111111;
    flex-shrink: 0;
  }

  div.texts {
    h5 {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 2px;
    }
    p {
      font-size: 11px;
      color: #666666;
      line-height: 1.4;
    }
  }
`;

export default function ValuePropsStrip({
  items = [
    {
      title: 'Free Metro Dispatch',
      description: 'On workplace orders over $55'
    },
    {
      title: 'Commercial Warranty',
      description: 'Up to 10-year manufacturer protection'
    },
    {
      title: 'AFRDI Certified',
      description: 'Tested for commercial durability'
    },
    {
      title: '30-Day B2B Accounts',
      description: 'Flexible business trade terms'
    }
  ]
}) {
  const icons = [
    <Truck size={17} key="truck" />,
    <ShieldCheck size={17} key="shield" />,
    <Award size={17} key="award" />,
    <RefreshCw size={17} key="refresh" />
  ];

  return (
    <Strip>
      <Inner>
        {items.map((item, idx) => (
          <ValueItem key={idx}>
            <div className="icon-box">
              {icons[idx % icons.length]}
            </div>
            <div className="texts">
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          </ValueItem>
        ))}
      </Inner>
    </Strip>
  );
}

