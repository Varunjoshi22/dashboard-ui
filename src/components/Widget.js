import React from 'react';
import styled from 'styled-components';

const WidgetCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #eaeaea;
`;

const WidgetTitle = styled.h3`
  font-weight: 500;
  color: #333;
  font-size: 16px;
  margin: 0;
`;

const CategoryTag = styled.span`
  font-size: 12px;
  color: #666;
  background-color: #eaeaea;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
`;

const WidgetRemoveBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #f44336;
  }
`;

const WidgetContent = styled.div`
  padding: 15px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DonutChart = styled.div`
  position: relative;
  width: 100%;
  max-width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const DonutCenter = styled.div`
  position: absolute;
  text-align: center;
`;

const DonutTotal = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const DonutLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 5px;
  background-color: ${props => props.color};
`;

const BarChart = styled.div`
  width: 100%;
  height: 20px;
  background-color: #eaeaea;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
`;

const BarFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color};
`;

const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  text-align: center;
`;

// Helper function to render different widget content types
const renderWidgetContent = (content) => {
  if (!content) {
    return <EmptyContent>No content available</EmptyContent>;
  }

  switch (content.type) {
    case 'donut':
      return (
        <>
          <DonutChart>
            <svg viewBox="0 0 100 100">
              {/* Improved donut chart with multiple segments */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e0e0e0" strokeWidth="15" />
              
              {/* Calculate and render each segment */}
              {(() => {
                const segments = [];
                let cumulativePercent = 0;
                const circumference = 2 * Math.PI * 40; // 2πr
                
                // Connected segment
                if (content.data.connected) {
                  const percent = content.data.connected / content.data.total;
                  segments.push(
                    <circle 
                      key="connected"
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#3f51b5" 
                      strokeWidth="15" 
                      strokeDasharray={`${percent * circumference} ${circumference}`} 
                      strokeDashoffset={`${-cumulativePercent * circumference}`}
                      transform="rotate(-90 50 50)"
                    />
                  );
                  cumulativePercent += percent;
                }
                
                // Failed segment
                if (content.data.failed) {
                  const percent = content.data.failed / content.data.total;
                  segments.push(
                    <circle 
                      key="failed"
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#f44336" 
                      strokeWidth="15" 
                      strokeDasharray={`${percent * circumference} ${circumference}`} 
                      strokeDashoffset={`${-cumulativePercent * circumference}`}
                      transform="rotate(-90 50 50)"
                    />
                  );
                  cumulativePercent += percent;
                }
                
                // Warning segment
                if (content.data.warning) {
                  const percent = content.data.warning / content.data.total;
                  segments.push(
                    <circle 
                      key="warning"
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#ff9800" 
                      strokeWidth="15" 
                      strokeDasharray={`${percent * circumference} ${circumference}`} 
                      strokeDashoffset={`${-cumulativePercent * circumference}`}
                      transform="rotate(-90 50 50)"
                    />
                  );
                  cumulativePercent += percent;
                }
                
                // Passed segment
                if (content.data.passed) {
                  const percent = content.data.passed / content.data.total;
                  segments.push(
                    <circle 
                      key="passed"
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#4caf50" 
                      strokeWidth="15" 
                      strokeDasharray={`${percent * circumference} ${circumference}`} 
                      strokeDashoffset={`${-cumulativePercent * circumference}`}
                      transform="rotate(-90 50 50)"
                    />
                  );
                  cumulativePercent += percent;
                }
                
                // Not Available segment
                if (content.data.notAvailable) {
                  const percent = content.data.notAvailable / content.data.total;
                  segments.push(
                    <circle 
                      key="notAvailable"
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#9e9e9e" 
                      strokeWidth="15" 
                      strokeDasharray={`${percent * circumference} ${circumference}`} 
                      strokeDashoffset={`${-cumulativePercent * circumference}`}
                      transform="rotate(-90 50 50)"
                    />
                  );
                }
                
                return segments;
              })()}
            </svg>
            <DonutCenter>
              <DonutTotal>{content.data.total}</DonutTotal>
              <DonutLabel>Total</DonutLabel>
            </DonutCenter>
          </DonutChart>
          <Legend>
            {content.data.connected && (
              <LegendItem>
                <LegendColor color="#3f51b5" />
                Connected ({content.data.connected})
              </LegendItem>
            )}
            {content.data.notConnected && (
              <LegendItem>
                <LegendColor color="#e0e0e0" />
                Not Connected ({content.data.notConnected})
              </LegendItem>
            )}
            {content.data.failed && (
              <LegendItem>
                <LegendColor color="#f44336" />
                Failed ({content.data.failed})
              </LegendItem>
            )}
            {content.data.warning && (
              <LegendItem>
                <LegendColor color="#ff9800" />
                Warning ({content.data.warning})
              </LegendItem>
            )}
            {content.data.notAvailable && (
              <LegendItem>
                <LegendColor color="#9e9e9e" />
                Not Available ({content.data.notAvailable})
              </LegendItem>
            )}
            {content.data.passed && (
              <LegendItem>
                <LegendColor color="#4caf50" />
                Passed ({content.data.passed})
              </LegendItem>
            )}
          </Legend>
        </>
      );
    
    case 'bar':
      return (
        <div style={{ width: '100%' }}>
          {content.data.critical && (
            <>
              <BarLabel>
                <span>Critical</span>
                <span>{content.data.critical}</span>
              </BarLabel>
              <BarChart>
                <BarFill 
                  width={(content.data.critical / content.data.total) * 100} 
                  color="#f44336" 
                />
              </BarChart>
            </>
          )}
          {content.data.high && (
            <>
              <BarLabel>
                <span>High</span>
                <span>{content.data.high}</span>
              </BarLabel>
              <BarChart>
                <BarFill 
                  width={(content.data.high / content.data.total) * 100} 
                  color="#ff9800" 
                />
              </BarChart>
            </>
          )}
          <Legend>
            <LegendItem>
              <LegendColor color="#f44336" />
              Critical
            </LegendItem>
            <LegendItem>
              <LegendColor color="#ff9800" />
              High
            </LegendItem>
            <LegendItem>
              <LegendColor color="#9e9e9e" />
              Total: {content.data.total}
            </LegendItem>
          </Legend>
        </div>
      );
    
    case 'empty':
      return (
        <EmptyContent>
          {content.message || 'No data available'}
        </EmptyContent>
      );
    
    default:
      return (
        <EmptyContent>
          {typeof content === 'string' ? content : 'Widget content'}
        </EmptyContent>
      );
  }
};

const Widget = ({ widget, onRemove, categoryName }) => {
  return (
    <WidgetCard>
      <WidgetHeader>
        <div>
          <WidgetTitle>{widget.name}</WidgetTitle>
          {categoryName && <CategoryTag>{categoryName}</CategoryTag>}
        </div>
        <WidgetRemoveBtn onClick={onRemove}>✕</WidgetRemoveBtn>
      </WidgetHeader>
      <WidgetContent>
        {renderWidgetContent(widget.content)}
      </WidgetContent>
    </WidgetCard>
  );
};

export default Widget;