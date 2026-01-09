/**
 * @luciddreamer/monitoring-dashboard
 *
 * Real-time monitoring dashboard for AI agent systems
 */

// Main components
export { MonitoringDashboard } from './components/MonitoringDashboard';
export { PerformanceChart } from './components/PerformanceChart';
export { MetricsCard } from './components/MetricsCard';
export { AlertPanel } from './components/AlertPanel';
export { AgentStatusGrid } from './components/AgentStatusGrid';

// Types
export type {
  MetricDataPoint,
  SystemMetrics,
  AgentMetrics,
  Alert,
  MonitoringDashboardProps,
  PerformanceChartProps,
  MetricsCardProps,
  AlertPanelProps,
} from './types';
