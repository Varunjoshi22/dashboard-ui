import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addWidget, removeWidget, setSearchTerm } from './store/dashboardSlice';
import './App.css';

// Components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddWidgetModal from './components/AddWidgetModal';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { categories, searchTerm, filteredWidgets } = useSelector(state => state.dashboard);

  const handleAddWidget = (categoryId, widget) => {
    dispatch(addWidget({ categoryId, widget }));
    setIsModalOpen(false);
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  return (
    <AppContainer>
      <Header 
        onAddWidgetClick={() => setIsModalOpen(true)} 
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      <Dashboard 
        categories={categories} 
        onRemoveWidget={handleRemoveWidget}
        filteredWidgets={filteredWidgets}
        searchTerm={searchTerm}
      />
      {isModalOpen && (
        <AddWidgetModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAddWidget={handleAddWidget}
          categories={categories}
        />
      )}
    </AppContainer>
  );
};

export default App;