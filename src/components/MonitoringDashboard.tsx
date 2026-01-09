import React, { useEffect, useState } from 'react';
import { MonitoringDashboardProps, SystemMetrics } from '../types';
import { PerformanceChart } from './PerformanceChart';
import { MetricsCard } from './MetricsCard';
import { AlertPanel } from './AlertPanel';
import { AgentStatusGrid } from './AgentStatusGrid';

/**
 * MonitoringDashboard Component
 *
 * Comprehensive real-time monitoring dashboard for AI agent systems
 * Features:
 * - Real-time metrics display
 * - Multiple metric types (CPU, memory, GPU, network, API)
 * - Performance charts
 * - Alert management
 * - Agent status tracking
 */
export const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({
  metrics = [],
  agentMetrics = [],
  alerts = [],
  refreshRate = 5000,
  autoRefresh = true,
  theme = 'dark',
  onAlertClick,
  onAgentClick,
}) => {
  const [currentMetrics, setCurrentMetrics] = useState<SystemMetrics | null>(
    metrics.length > 0 ? metrics[metrics.length - 1] : null
  );

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // In a real application, this would fetch new metrics
      // For now, we just use the latest provided metrics
      if (metrics.length > 0) {
        setCurrentMetrics(metrics[metrics.length - 1]);
      }
    }, refreshRate);

    return () => clearInterval(interval);
  }, [metrics, refreshRate, autoRefresh]);

  const getCpuData = () => {
    return metrics.map((m) => ({
      timestamp: m.timestamp,
      value: m.cpu.usage,
    }));
  };

  const getMemoryData = () => {
    return metrics.map((m) => ({
      timestamp: m.timestamp,
      value: m.memory.percentage,
    }));
  };

  const getResponseTimeData = () => {
    return metrics.map((m) => ({
      timestamp: m.timestamp,
      value: m.api.responseTime,
    }));
  };

  const getRequestsPerMinuteData = () => {
    return metrics.map((m) => ({
      timestamp: m.timestamp,
      value: m.api.requestsPerMinute,
    }));
  };

  const getStatusColor = (value: number, thresholds: { warning: number; error: number }) => {
    if (value >= thresholds.error) return 'error';
    if (value >= thresholds.warning) return 'warning';
    return 'normal';
  };

  return (
    <div
      className={`monitoring-dashboard ${theme}`}
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '24px',
          borderBottom: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`,
          paddingBottom: '16px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          System Monitoring Dashboard
        </h1>
        <p style={{ margin: '8px 0 0 0', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
          Real-time metrics and alerts
        </p>
      </div>

      {/* Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <MetricsCard
          title="CPU Usage"
          value={currentMetrics?.cpu.usage.toFixed(1) || '0'}
          unit="%"
          trend={2.5}
          trendDirection="up"
          status={getStatusColor(currentMetrics?.cpu.usage || 0, { warning: 70, error: 90 })}
        />
        <MetricsCard
          title="Memory Usage"
          value={currentMetrics?.memory.percentage.toFixed(1) || '0'}
          unit="%"
          trend={-1.2}
          trendDirection="down"
          status={getStatusColor(currentMetrics?.memory.percentage || 0, { warning: 75, error: 90 })}
        />
        <MetricsCard
          title="Response Time"
          value={currentMetrics?.api.responseTime.toFixed(0) || '0'}
          unit="ms"
          trend={-5.3}
          trendDirection="down"
          status={getStatusColor(currentMetrics?.api.responseTime || 0, { warning: 500, error: 1000 })}
        />
        <MetricsCard
          title="Requests/min"
          value={currentMetrics?.api.requestsPerMinute.toFixed(0) || '0'}
          trend={8.7}
          trendDirection="up"
        />
      </div>

      {/* Performance Charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <PerformanceChart
          data={getCpuData()}
          title="CPU Usage Over Time"
          color="#3b82f6"
          height={250}
          yAxisLabel="Usage %"
        />
        <PerformanceChart
          data={getMemoryData()}
          title="Memory Usage Over Time"
          color="#10b981"
          height={250}
          yAxisLabel="Usage %"
        />
        <PerformanceChart
          data={getResponseTimeData()}
          title="API Response Time"
          color="#f59e0b"
          height={250}
          yAxisLabel="Time (ms)"
        />
        <PerformanceChart
          data={getRequestsPerMinuteData()}
          title="Requests Per Minute"
          color="#8b5cf6"
          height={250}
          yAxisLabel="Requests/min"
        />
      </div>

      {/* Agent Status and Alerts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '16px',
        }}
      >
        <AgentStatusGrid
          agents={agentMetrics}
          onAgentClick={onAgentClick}
          theme={theme}
        />
        <AlertPanel
          alerts={alerts}
          maxVisible={5}
          showSeverity={true}
          onAlertClick={onAlertClick}
        />
      </div>
    </div>
  );
};

export default MonitoringDashboard;
