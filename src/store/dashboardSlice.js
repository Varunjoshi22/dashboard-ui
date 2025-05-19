import { createSlice } from '@reduxjs/toolkit';

// Initial dashboard data structure
const initialState = {
  categories: [
    {
      id: 'cnapp-dashboard',
      name: 'CNAPP Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          content: {
            type: 'donut',
            data: {
              connected: 2,
              notConnected: 2,
              total: 4
            }
          }
        },
        {
          id: 'cloud-account-risk',
          name: 'Cloud Account Risk Assessment',
          content: {
            type: 'donut',
            data: {
              failed: 1085,
              warning: 2365,
              notAvailable: 340,
              passed: 7255,
              total: 9659
            }
          }
        }
      ]
    },
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: []
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          content: {
            type: 'empty',
            message: 'No Graph data available!'
          }
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          content: {
            type: 'empty',
            message: 'No Graph data available!'
          }
        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          content: {
            type: 'bar',
            data: {
              total: 1470,
              critical: 8,
              high: 180
            }
          }
        },
        {
          id: 'image-security',
          name: 'Image Security Issues',
          content: {
            type: 'bar',
            data: {
              total: 2,
              critical: 2,
              high: 2
            }
          }
        }
      ]
    }
  ],
  searchTerm: '',
  filteredWidgets: [],
  availableWidgets: [
    { id: 'cloud-accounts', name: 'Cloud Accounts', category: 'CSPM' },
    { id: 'cloud-account-risk', name: 'Cloud Account Risk Assessment', category: 'CSPM' },
    { id: 'namespace-alerts', name: 'Top 5 Namespace Specific Alerts', category: 'CWPP' },
    { id: 'workload-alerts', name: 'Workload Alerts', category: 'CWPP' },
    { id: 'image-risk', name: 'Image Risk Assessment', category: 'Image' },
    { id: 'image-security', name: 'Image Security Issues', category: 'Image' },
    { id: 'ticket-status', name: 'Ticket Status', category: 'Ticket' }
  ]
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        // Check if widget already exists in this category
        const widgetExists = category.widgets.some(w => w.id === widget.id);
        if (!widgetExists) {
          category.widgets.push(widget);
        }
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      if (state.searchTerm) {
        // Filter widgets across all categories
        state.filteredWidgets = [];
        state.categories.forEach(category => {
          const matchingWidgets = category.widgets.filter(widget => 
            widget.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          );
          state.filteredWidgets.push(...matchingWidgets.map(widget => ({
            ...widget,
            categoryId: category.id,
            categoryName: category.name
          })));
        });
      } else {
        state.filteredWidgets = [];
      }
    }
  }
});

export const { addWidget, removeWidget, setSearchTerm } = dashboardSlice.actions;

export default dashboardSlice.reducer;