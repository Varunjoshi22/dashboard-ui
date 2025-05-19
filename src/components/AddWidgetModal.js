import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eaeaea;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalFooter = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
`;

const FormControl = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
`;

const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #333;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #1a237e;
  color: white;
  
  &:hover {
    background-color: #151d69;
  }
`;

const CheckboxGroup = styled.div`
  margin-top: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 15px;
`;

const Tab = styled.button`
  padding: 10px 15px;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#1a237e' : 'transparent'};
  color: ${props => props.active ? '#1a237e' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1a237e;
  }
`;

const AddWidgetModal = ({ isOpen, onClose, onAddWidget, categories }) => {
  const [activeTab, setActiveTab] = useState('add');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');
  const [widgetName, setWidgetName] = useState('');
  const [widgetContent, setWidgetContent] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState({});
  
  const { availableWidgets } = useSelector(state => state.dashboard);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleWidgetCheckboxChange = (widgetId) => {
    setSelectedWidgets(prev => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }));
  };

  const handleAddWidget = () => {
    if (!selectedCategory || !widgetName) return;

    const newWidget = {
      id: `widget-${Date.now()}`,
      name: widgetName,
      content: widgetContent || 'Widget content goes here'
    };

    onAddWidget(selectedCategory, newWidget);
    resetForm();
  };

  const handleAddExistingWidgets = () => {
    const selectedWidgetIds = Object.keys(selectedWidgets).filter(id => selectedWidgets[id]);
    
    if (selectedWidgetIds.length === 0 || !selectedCategory) return;

    selectedWidgetIds.forEach(widgetId => {
      const widgetTemplate = availableWidgets.find(w => w.id === widgetId);
      if (widgetTemplate) {
        const newWidget = {
          id: widgetId,
          name: widgetTemplate.name,
          content: {
            type: 'empty',
            message: 'Widget content placeholder'
          }
        };
        onAddWidget(selectedCategory, newWidget);
      }
    });

    resetForm();
  };

  const resetForm = () => {
    setWidgetName('');
    setWidgetContent('');
    setSelectedWidgets({});
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Add Widget</ModalTitle>
          <ModalCloseBtn onClick={onClose}>×</ModalCloseBtn>
        </ModalHeader>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'add'} 
            onClick={() => handleTabChange('add')}
          >
            Create New
          </Tab>
          <Tab 
            active={activeTab === 'existing'} 
            onClick={() => handleTabChange('existing')}
          >
            Add Existing
          </Tab>
        </TabContainer>
        
        <ModalBody>
          <FormGroup>
            <FormLabel>Select Category</FormLabel>
            <FormSelect 
              value={selectedCategory} 
              onChange={handleCategoryChange}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          
          {activeTab === 'add' ? (
            <>
              <FormGroup>
                <FormLabel>Widget Name</FormLabel>
                <FormControl 
                  type="text" 
                  placeholder="Enter widget name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Widget Content</FormLabel>
                <FormTextarea 
                  placeholder="Enter widget content or description"
                  value={widgetContent}
                  onChange={(e) => setWidgetContent(e.target.value)}
                />
              </FormGroup>
            </>
          ) : (
            <FormGroup>
              <FormLabel>Available Widgets</FormLabel>
              <CheckboxGroup>
                {availableWidgets.map(widget => (
                  <CheckboxLabel key={widget.id}>
                    <Checkbox 
                      type="checkbox"
                      checked={!!selectedWidgets[widget.id]}
                      onChange={() => handleWidgetCheckboxChange(widget.id)}
                    />
                    {widget.name} <small>({widget.category})</small>
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </FormGroup>
          )}
        </ModalBody>
        
        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          {activeTab === 'add' ? (
            <ConfirmButton onClick={handleAddWidget}>Add Widget</ConfirmButton>
          ) : (
            <ConfirmButton onClick={handleAddExistingWidgets}>Add Selected</ConfirmButton>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddWidgetModal;