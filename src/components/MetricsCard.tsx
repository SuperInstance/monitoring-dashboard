import React from 'react';
import { MetricsCardProps } from '../types';

/**
 * MetricsCard Component
 *
 * Card displaying a single metric with value, unit, and trend
 */
export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendDirection,
  status = 'normal',
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;

    const color = trendDirection === 'up' ? '#10b981' : trendDirection === 'down' ? '#ef4444' : '#9ca3af';

    if (trendDirection === 'up') {
      return <span style={{ color, marginLeft: '8px' }}>▲</span>;
    } else if (trendDirection === 'down') {
      return <span style={{ color, marginLeft: '8px' }}>▼</span>;
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        padding: '20px',
        border: `1px solid ${getStatusColor()}`,
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: '500',
            color: '#9ca3af',
          }}
        >
          {title}
        </h4>
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          marginBottom: '8px',
        }}
      >
        <span
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#fff',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              fontSize: '16px',
              color: '#9ca3af',
              marginLeft: '4px',
            }}
          >
            {unit}
          </span>
        )}
        {getTrendIcon()}
      </div>

      {trend !== undefined && (
        <div
          style={{
            fontSize: '12px',
            color: '#9ca3af',
          }}
        >
          {trend > 0 ? '+' : ''}
          {trend.toFixed(1)}% from last period
        </div>
      )}
    </div>
  );
};

export default MetricsCard;
