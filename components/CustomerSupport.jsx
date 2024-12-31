import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  color : black;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: black;
  }
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding-bottom: 0.5rem;
`;

const SectionTitle = styled.h2`
  color: #444;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const FAQSection = styled.div`
  margin-top: 2rem;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
`;

const Question = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const Answer = styled.p`
  color: #666;
`;

const CustomerSupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Your message has been sent. We will get back to you soon!');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBack}>&larr; Back</BackButton>
      <Title>Customer Support</Title>

      <SectionTitle>Contact Us</SectionTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="subject">Subject:</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Message:</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Send Message</SubmitButton>
      </Form>

      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQItem>
          <Question>How do I reset my password?</Question>
          <Answer>You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.</Answer>
        </FAQItem>
        <FAQItem>
          <Question>What payment methods do you accept?</Question>
          <Answer>We accept various payment methods including credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.</Answer>
        </FAQItem>
        <FAQItem>
          <Question>How long does shipping take?</Question>
          <Answer>Shipping times vary depending on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days.</Answer>
        </FAQItem>
      </FAQSection>
    </PageContainer>
  );
};

export default CustomerSupportPage;