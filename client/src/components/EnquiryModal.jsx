import React, { useState } from 'react';
import styled from 'styled-components';
import { X, CheckCircle, Send, Loader2 } from 'lucide-react';
import { tokens } from '../styles/theme';
import { api } from '../services/api';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${tokens.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: ${tokens.spacing.space14};
`;

const ModalBox = styled.div`
  background: ${tokens.colors.surface};
  width: 100%;
  max-width: 540px;
  border-radius: ${tokens.radii.radiusSm};
  border: 1px solid ${tokens.colors.color5};
  position: relative;
`;

const ModalHeader = styled.div`
  padding: ${tokens.spacing.space15} ${tokens.spacing.space17};
  border-bottom: 1px solid ${tokens.colors.color5};
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: ${tokens.typography.sizes.textXl};
    letter-spacing: 0.08em;
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${tokens.spacing.space5};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.color1};

  &:hover {
    color: ${tokens.colors.color3};
  }
`;

const ModalBody = styled.div`
  padding: ${tokens.spacing.space17};
`;

const Summary = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.space14};
  background-color: ${tokens.colors.color6};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space11} ${tokens.spacing.space14};
  margin-bottom: ${tokens.spacing.space17};

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: ${tokens.radii.radiusSm};
  }

  div.info {
    overflow: hidden;

    h4 {
      font-size: ${tokens.typography.sizes.textSm};
      letter-spacing: 0.04em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span.price {
      font-size: ${tokens.typography.sizes.textLg};
      letter-spacing: 0.04em;
      color: ${tokens.colors.color1};
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${tokens.spacing.space14};
`;

const Label = styled.label`
  display: block;
  font-size: ${tokens.typography.sizes.textXs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${tokens.spacing.space4};
  color: ${tokens.colors.color1};
`;

const Input = styled.input`
  width: 100%;
  padding: ${tokens.spacing.space9} ${tokens.spacing.space11};
  background-color: ${tokens.colors.color6};
  border: 1px solid ${({ $error }) => ($error ? tokens.colors.color2 : tokens.colors.color5)};
  border-radius: ${tokens.radii.radiusSm};
  font-size: ${tokens.typography.sizes.textSm};
  color: ${tokens.colors.color1};
  outline: none;

  &:focus {
    border-color: ${tokens.colors.color1};
    background-color: #FFFFFF;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${tokens.spacing.space9} ${tokens.spacing.space11};
  background-color: ${tokens.colors.color6};
  border: 1px solid ${tokens.colors.color5};
  border-radius: ${tokens.radii.radiusSm};
  font-size: ${tokens.typography.sizes.textSm};
  color: ${tokens.colors.color1};
  min-height: 80px;
  outline: none;

  &:focus {
    border-color: ${tokens.colors.color1};
    background-color: #FFFFFF;
  }
`;

const ErrorMsg = styled.span`
  color: ${tokens.colors.color2};
  font-size: ${tokens.typography.sizes.textXs};
  margin-top: ${tokens.spacing.space3};
  display: block;
`;

const SubmitBtn = styled.button`
  width: 100%;
  background-color: ${tokens.colors.color1};
  color: ${tokens.colors.color7};
  border: none;
  border-radius: ${tokens.radii.radiusSm};
  padding: ${tokens.spacing.space13};
  font-size: ${tokens.typography.sizes.textXs};
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessScreen = styled.div`
  text-align: center;
  padding: ${tokens.spacing.space20} 0;

  h3 {
    font-size: ${tokens.typography.sizes.text2xl};
    margin: ${tokens.spacing.space14} 0 ${tokens.spacing.space7};
    letter-spacing: 0.08em;
  }

  p {
    font-size: ${tokens.typography.sizes.textSm};
    color: ${tokens.colors.color3};
    line-height: ${tokens.typography.lineHeights.relaxed};
    max-width: 420px;
    margin: 0 auto ${tokens.spacing.space17};
  }

  button {
    background-color: ${tokens.colors.color1};
    color: ${tokens.colors.color7};
    border: none;
    border-radius: ${tokens.radii.radiusSm};
    padding: ${tokens.spacing.space11} ${tokens.spacing.space21};
    font-size: ${tokens.typography.sizes.textXs};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

export default function EnquiryModal({ product, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: `We would like to request commercial pricing, trade terms, and delivery schedules for "${product.title}".`
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Full name is required';
    if (!formData.email.trim()) {
      err.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = 'Please provide a valid email format';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // Connects directly to backend API (or fallback)
      await api.submitEnquiry({
        productId: product.id,
        productTitle: product.title,
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        company: formData.company.trim(),
        message: formData.message.trim()
      });
      setSubmitted(true);
    } catch (err) {
      setErrors({ form: err.message || 'Error transmitting enquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Commercial Enquiry</h2>
          <CloseBtn onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </CloseBtn>
        </ModalHeader>

        <ModalBody>
          {submitted ? (
            <SuccessScreen>
              <CheckCircle size={48} color="#000000" style={{ margin: '0 auto' }} />
              <h3>Thank You</h3>
              <p>
                Your enquiry regarding <strong>{product.title}</strong> has been received by our commercial team. We have forwarded details to our sales inbox and will reply to <em>{formData.email}</em> shortly.
              </p>
              <button onClick={onClose}>Return to Catalogue</button>
            </SuccessScreen>
          ) : (
            <form onSubmit={handleSubmit}>
              <Summary>
                <img src={product.image} alt={product.title} />
                <div className="info">
                  <h4>{product.title}</h4>
                  <span className="price">${product.price.toFixed(2)}</span>
                </div>
              </Summary>

              {errors.form && <ErrorMsg style={{ marginBottom: 12 }}>{errors.form}</ErrorMsg>}

              <FormGroup>
                <Label>Your Name *</Label>
                <Input
                  type="text"
                  placeholder="e.g. Michael Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  $error={!!errors.name}
                />
                {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Business Email *</Label>
                <Input
                  type="email"
                  placeholder="e.g. michael@studio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  $error={!!errors.email}
                />
                {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Company / Organization</Label>
                <Input
                  type="text"
                  placeholder="Vance Design Group"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Enquiry Notes</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </FormGroup>

              <SubmitBtn type="submit" disabled={loading}>
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {loading ? 'Transmitting to Sales...' : 'Submit Enquiry to Sales'}
              </SubmitBtn>
            </form>
          )}
        </ModalBody>
      </ModalBox>
    </Overlay>
  );
}
