import React from 'react';
import styled from 'styled-components';
import Widget from './Widget';

const DashboardContainer = styled.div`
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CategorySection = styled.div`
  margin-bottom: 30px;
`;

const CategoryHeader = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchResults = styled.div`
  margin-top: 20px;
`;

const SearchResultsTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #999;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Dashboard = ({ categories, onRemoveWidget, filteredWidgets, searchTerm }) => {
  // Render search results if search term exists
  if (searchTerm && searchTerm.length > 0) {
    return (
      <DashboardContainer>
        <SearchResults>
          <SearchResultsTitle>
            Search Results for "{searchTerm}" ({filteredWidgets.length} results)
          </SearchResultsTitle>
          {filteredWidgets.length > 0 ? (
            <WidgetsGrid>
              {filteredWidgets.map((widget) => (
                <Widget
                  key={`${widget.categoryId}-${widget.id}`}
                  widget={widget}
                  onRemove={() => onRemoveWidget(widget.categoryId, widget.id)}
                  categoryName={widget.categoryName}
                />
              ))}
            </WidgetsGrid>
          ) : (
            <EmptyState>
              No widgets found matching "{searchTerm}"
            </EmptyState>
          )}
        </SearchResults>
      </DashboardContainer>
    );
  }

  // Render all categories and their widgets
  return (
    <DashboardContainer>
      {categories.map((category) => (
        <CategorySection key={category.id}>
          <CategoryHeader>{category.name}</CategoryHeader>
          {category.widgets.length > 0 ? (
            <WidgetsGrid>
              {category.widgets.map((widget) => (
                <Widget
                  key={`${category.id}-${widget.id}`}
                  widget={widget}
                  onRemove={() => onRemoveWidget(category.id, widget.id)}
                />
              ))}
            </WidgetsGrid>
          ) : (
            <EmptyState>
              No widgets in this category. Click "+ Add Widget" to add one.
            </EmptyState>
          )}
        </CategorySection>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;