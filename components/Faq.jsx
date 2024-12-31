import React from 'react';

const Faq = () => {
  const faqs = [
    {
      question: "How do I register as a freelancer or labourer?",
      answer: "Click on the 'Register' button on the homepage and fill in the required details in the registration form."
    },
    {
      question: "How can I post a job request?",
      answer: "Once you are logged in as a client, navigate to the 'Post Job' section and provide the job details."
    },
    {
      question: "How are payments handled?",
      answer: "Payments are securely processed through our integrated payment gateway. The platform takes a commission before transferring funds."
    },
    {
      question: "How do I communicate with service providers?",
      answer: "You can use our in-platform messaging and calling system to communicate securely without revealing personal information."
    },
    {
      question: "What should I do if I encounter an issue?",
      answer: "You can reach out to our support team by using the contact form below or via email at support@labourplatform.com. We are also available at +1-800-123-4567."
    }
  ];

  return (
    <div className="container">
      <h2 className="title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h4 className="question">{faq.question}</h4>
          <p className="answer">{faq.answer}</p>
        </div>
      ))}
      <div className="contact-container">
        <h4 className="contact-title">Need more help? Contact Us:</h4>
        <p className="contact-info">
          Email: <a href="mailto:support@labourplatform.com" className="link">support@labourplatform.com</a>
        </p>
        <p className="contact-info">
          Phone: <a href="tel:+18001234567" className="link">+1-800-123-4567</a>
        </p>
        <p className="contact-info">Live Chat: Available 24/7 in the bottom right corner of the screen.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '40px',
  },
  faqItem: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e0e0e0'
  },
  question: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: '10px',
    textAlign: 'left',
  },
  answer: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.6',
    textAlign: 'left',
  },
  contactContainer: {
    marginTop: '50px',
    padding: '30px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
  },
  contactTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '20px',
  },
  contactInfo: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  link: {
    color: '#2980b9',
    textDecoration: 'none',
  },
};

export default Faq;