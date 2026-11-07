import React, { useState } from 'react';
import styled from 'styled-components';
import { Mail, Phone, MapPin, CheckCircle, Send } from 'lucide-react';
import { api } from '../../services/api';

const SectionWrap = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 32px 80px;

  @media (max-width: 768px) {
    padding: 40px 16px 60px;
  }
`;

const HeaderArea = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 56px;

  span.badge {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: #F4F4F4;
    padding: 6px 14px;
    border-radius: 9999px;
    display: inline-block;
    margin-bottom: 16px;
    font-weight: 600;
  }

  h2 {
    font-size: 36px;
    font-weight: 400;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
    color: #111;

    @media (max-width: 600px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const InfoCard = styled.div`
  background: #FAFAFA;
  border: 1px solid #EEEEEE;
  border-radius: 8px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  div.info-row {
    display: flex;
    gap: 16px;
    align-items: flex-start;

    div.icon-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1px solid #E0E0E0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    div.details {
      h4 {
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 4px;
      }
      p {
        font-size: 13px;
        color: #666;
        line-height: 1.5;
      }
    }
  }
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  div.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #333;

    input, textarea {
      padding: 12px 14px;
      border: 1px solid #CCCCCC;
      border-radius: 6px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #000000;
      }
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }
  }

  button.submit-btn {
    background: #000000;
    color: #FFFFFF;
    border: none;
    padding: 14px 28px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover:not(:disabled) {
      opacity: 0.85;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  div.success-feedback {
    background: #F0FDF4;
    border: 1px solid #BBF7D0;
    color: #166534;
    padding: 16px 20px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 500;
  }

  div.error-feedback {
    background: #FEF2F2;
    border: 1px solid #FECACA;
    color: #991B1B;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 12px;
  }
`;

export default function ContactFormSection({
  tag = 'Direct Enquiry',
  title = 'Contact Corporate Sales',
  description = 'Speak with our workplace specialists regarding volume commercial quotes, ergonomic workstation assessments, or ongoing procurement accounts.',
  email = 'sales@officeworks-workplace.com.au',
  phone = '1300 000 890 (Mon-Fri 8am-6pm AEST)',
  address = '236 Bourke Street, Melbourne VIC 3000'
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.submitEnquiry({
        productId: 'general',
        productName: 'General Corporate Consultation',
        customerName: formData.name,
        customerEmail: formData.email,
        company: formData.company,
        message: formData.message
      });
      setSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionWrap>
      <HeaderArea>
        {tag && <span className="badge">{tag}</span>}
        <h2>{title}</h2>
        <p>{description}</p>
      </HeaderArea>

      <ContentGrid>
        <InfoCard>
          <div className="info-row">
            <div className="icon-circle"><Mail size={18} /></div>
            <div className="details">
              <h4>Sales Inbox</h4>
              <p>{email}</p>
            </div>
          </div>

          <div className="info-row">
            <div className="icon-circle"><Phone size={18} /></div>
            <div className="details">
              <h4>Direct Telephone</h4>
              <p>{phone}</p>
            </div>
          </div>

          <div className="info-row">
            <div className="icon-circle"><MapPin size={18} /></div>
            <div className="details">
              <h4>Commercial Showroom</h4>
              <p>{address}</p>
            </div>
          </div>
        </InfoCard>

        <FormWrap onSubmit={handleSubmit}>
          {success ? (
            <div className="success-feedback">
              <CheckCircle size={20} />
              <span>Thank you! Your enquiry has been received by our commercial sales inbox. We will contact you within 2 business hours.</span>
            </div>
          ) : (
            <>
              {error && <div className="error-feedback">{error}</div>}
              <div className="form-row">
                <label>
                  Full Name *
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                  />
                </label>
                <label>
                  Business Email *
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                  />
                </label>
              </div>

              <label>
                Company / Organisation
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Jenkins Architecture Pty Ltd"
                />
              </label>

              <label>
                Enquiry Details *
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your team size, workstation requirements, or specific products..."
                />
              </label>

              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : <>Submit Enquiry <Send size={13} /></>}
              </button>
            </>
          )}
        </FormWrap>
      </ContentGrid>
    </SectionWrap>
  );
}
