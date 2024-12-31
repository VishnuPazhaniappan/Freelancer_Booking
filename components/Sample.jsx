import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import AcDetails from './AcDetails';

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  @media print {
    display: none;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  @media print {
    margin-top: 0;
    display: block;
  }
`;

const Sidebar = styled.nav`
  width: 250px;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 2px 0 4px rgba(0,0,0,0.1);
  @media print {
    display: none;
  }
`;

const SidebarButton = styled.button`
  padding: 0.75rem 1rem;
  text-align: left;
  border: none;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  width: 100%;
  background-color: ${props => props.$active ? '#3b82f6' : '#f3f4f6'};
  color: ${props => props.$active ? 'white' : '#374151'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#2563eb' : '#e5e7eb'};
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #fff;
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  @media print {
    margin: 0;
    padding: 0;
    box-shadow: none;
  }
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  color: #111827;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
`;

// Pages Configuration
const pages = [
  { id: 1, title: 'Account Details', content: <AcDetails /> },
  { id: 2, title: 'Transaction History', content: 'Your transaction history will appear here.' },
  { id: 3, title: 'LogOut', content: <Logout /> },
  { id: 4, title: 'Services', content: 'Check out our available services.' },
];

// Sidebar Item Component
const SidebarItem = ({ page, activePage, setActivePage }) => (
  <SidebarButton
    onClick={() => setActivePage(page)}
    $active={activePage.id === page.id}
    aria-pressed={activePage.id === page.id}
  >
    {page.title}
  </SidebarButton>
);

// Main Profile Component
const ProfileWorker = () => {
  const [activePage, setActivePage] = useState(pages[0]);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Freelancer Booking</Title>
          <NavContainer>
            <NavButton onClick={() => handleNavigation('/aa')}>Home</NavButton>
            <NavButton onClick={() => handleNavigation('/boat')}>Bot</NavButton>
            <NavButton onClick={() => handleNavigation('/activity')}>Your Activities</NavButton>
            <NavButton onClick={() => handleNavigation('/profile')}>Profile</NavButton>
          </NavContainer>
        </HeaderContent>
      </Header>

      <LayoutContainer>
        <Sidebar>
          {pages.map((page) => (
            <SidebarItem
              key={page.id}
              page={page}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          ))}
        </Sidebar>

        <MainContent>
          <PageTitle>{activePage.title}</PageTitle>
          {React.isValidElement(activePage.content) 
            ? activePage.content 
            : <p>{activePage.content}</p>}
        </MainContent>
      </LayoutContainer>
    </Container>
  );
};

export default ProfileWorker;
