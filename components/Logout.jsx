import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 90%;
  width: 300px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.p`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
`;

const YesButton = styled(Button)`
  background-color: #e53e3e;

  &:hover {
    background-color: #c53030;
  }
`;

const NoButton = styled(Button)`
  background-color: #2f855a;

  &:hover {
    background-color: #276749;
  }
`;

const Logout = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    navigate('/main');
   
  };
  const handleLogout1 = () => {
    navigate('/aa');
  
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Message>Are you really want to log out?</Message>
        <ButtonContainer>
          <YesButton onClick={handleLogout}>Yes</YesButton>
          <NoButton onClick={handleLogout1}>No</NoButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Logout;