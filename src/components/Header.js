import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/dashboardSlice';

const HeaderContainer = styled.header`
  background-color: #1a237e;
  color: white;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  padding: 5px;
  outline: none;
  width: 200px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const AddWidgetButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #43a047;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = ({ onAddWidgetClick, searchTerm, onSearch }) => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>Dashboard UI</Logo>
        <ActionContainer>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <AddWidgetButton onClick={onAddWidgetClick}>
            + Add Widget
          </AddWidgetButton>
        </ActionContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;