/**
 * Monitoring dashboard types for system metrics
 */

export interface MetricDataPoint {
  timestamp: Date;
  value: number;
}

export interface SystemMetrics {
  timestamp: Date;
  cpu: {
    usage: number;
    load: number[];
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  gpu?: {
    usage: number;
    memory: {
      used: number;
      total: number;
    };
  };
  network: {
    requestsPerSecond: number;
    bytesPerSecond: number;
  };
  api: {
    responseTime: number;
    errorRate: number;
    requestsPerMinute: number;
  };
}

export interface AgentMetrics {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error' | 'offline';
  tasksCompleted: number;
  tasksPerMinute: number;
  avgResponseTime: number;
  errorRate: number;
  uptime: number;
  memoryUsage: number;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  source: string;
}

export interface MonitoringDashboardProps {
  metrics?: SystemMetrics[];
  agentMetrics?: AgentMetrics[];
  alerts?: Alert[];
  refreshRate?: number;
  autoRefresh?: boolean;
  theme?: 'light' | 'dark';
  onAlertClick?: (alert: Alert) => void;
  onAgentClick?: (agent: AgentMetrics) => void;
}

export interface PerformanceChartProps {
  data: MetricDataPoint[];
  title?: string;
  color?: string;
  showGrid?: boolean;
  height?: number;
  yAxisLabel?: string;
}

export interface MetricsCardProps {
  title: string;
  value: number | string;
  unit?: string;
  trend?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  status?: 'normal' | 'warning' | 'error';
}

export interface AlertPanelProps {
  alerts: Alert[];
  maxVisible?: number;
  showSeverity?: boolean;
  onAlertClick?: (alert: Alert) => void;
  onAcknowledge?: (alertId: string) => void;
}
