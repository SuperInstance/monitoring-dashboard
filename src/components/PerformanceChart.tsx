import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PerformanceChartProps } from '../types';

/**
 * PerformanceChart Component
 *
 * Line chart for displaying time-series metrics
 */
export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  title,
  color = '#3b82f6',
  showGrid = true,
  height = 250,
  yAxisLabel,
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div
          style={{
            backgroundColor: '#1f2937',
            color: '#fff',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #374151',
          }}
        >
          <p style={{ margin: 0 }}>
            {new Date(data.payload.timestamp).toLocaleTimeString()}
          </p>
          <p style={{ margin: '5px 0 0 0' }}>
            Value: <strong>{data.value.toFixed(2)}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #374151',
      }}
    >
      {title && (
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#fff',
          }}
        >
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          )}
          <XAxis
            dataKey="timestamp"
            stroke="#9ca3af"
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9ca3af"
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: '12px', fill: '#9ca3af' },
            }}
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
