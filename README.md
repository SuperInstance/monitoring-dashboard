# @luciddreamer/monitoring-dashboard

[![npm version](https://badge.fury.io/js/%40luciddreamer%2Fmonitoring-dashboard.svg)](https://www.npmjs.com/package/@luciddreamer/monitoring-dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Real-time monitoring dashboard for AI agent systems with comprehensive metrics, alerts, and agent status tracking.

## Features

- **Real-time Metrics** - Live system metrics with auto-refresh
- **Performance Charts** - Time-series visualization for CPU, memory, API response times
- **Metrics Cards** - At-a-glance status indicators with trends
- **Alert Management** - Severity-based alert system with acknowledgment
- **Agent Status Grid** - Multi-agent monitoring with detailed metrics
- **Responsive Design** - Adapts to any screen size
- **Dark/Light Theme** - Built-in theme support
- **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install @luciddreamer/monitoring-dashboard
# or
yarn add @luciddreamer/monitoring-dashboard
# or
pnpm add @luciddreamer/monitoring-dashboard
```

## Quick Start

```tsx
import React, { useState, useEffect } from 'react';
import { MonitoringDashboard } from '@luciddreamer/monitoring-dashboard';

function App() {
  const [metrics, setMetrics] = useState([]);
  const [agentMetrics, setAgentMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch metrics from your monitoring API
    const fetchMetrics = async () => {
      const response = await fetch('/api/metrics');
      const data = await response.json();
      setMetrics(data);
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MonitoringDashboard
      metrics={metrics}
      agentMetrics={agentMetrics}
      alerts={alerts}
      refreshRate={5000}
      autoRefresh={true}
      theme="dark"
      onAlertClick={(alert) => console.log('Alert clicked:', alert)}
      onAgentClick={(agent) => console.log('Agent clicked:', agent)}
    />
  );
}
```

## Components

### MonitoringDashboard

Main dashboard component aggregating all monitoring features.

**Props:**

- `metrics?: SystemMetrics[]` - Array of system metric snapshots
- `agentMetrics?: AgentMetrics[]` - Array of agent performance data
- `alerts?: Alert[]` - Array of system alerts
- `refreshRate?: number` - Auto-refresh interval in ms (default: 5000)
- `autoRefresh?: boolean` - Enable auto-refresh (default: true)
- `theme?: 'light' | 'dark'` - Color theme (default: 'dark')
- `onAlertClick?: (alert: Alert) => void` - Alert click handler
- `onAgentClick?: (agent: AgentMetrics) => void` - Agent click handler

### PerformanceChart

Line chart for time-series metric visualization.

**Props:**

- `data: MetricDataPoint[]` - Time-series data points
- `title?: string` - Chart title
- `color?: string` - Line color (default: '#3b82f6')
- `showGrid?: boolean` - Show grid lines (default: true)
- `height?: number` - Chart height in px (default: 250)
- `yAxisLabel?: string` - Y-axis label

### MetricsCard

Card displaying a single metric with trend indicator.

**Props:**

- `title: string` - Metric title
- `value: number | string` - Metric value
- `unit?: string` - Unit suffix
- `trend?: number` - Trend percentage
- `trendDirection?: 'up' | 'down' | 'neutral'` - Trend direction
- `status?: 'normal' | 'warning' | 'error'` - Status indicator

### AlertPanel

Alert list with severity indicators and actions.

**Props:**

- `alerts: Alert[]` - Array of alerts
- `maxVisible?: number` - Maximum alerts to show (default: 5)
- `showSeverity?: boolean` - Show severity icons (default: true)
- `onAlertClick?: (alert: Alert) => void` - Click handler
- `onAcknowledge?: (alertId: string) => void` - Acknowledge handler

### AgentStatusGrid

Grid view of agent statuses and metrics.

**Props:**

- `agents: AgentMetrics[]` - Array of agent metrics
- `onAgentClick?: (agent: AgentMetrics) => void` - Click handler
- `theme?: 'light' | 'dark'` - Color theme

## Type Definitions

```typescript
interface SystemMetrics {
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
    memory: { used: number; total: number };
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

interface AgentMetrics {
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

interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  source: string;
}
```

## Customization

### Styling

Components use inline styles and can be customized through props. For deeper customization, you can override styles using CSS:

```css
.monitoring-dashboard {
  --primary-color: #3b82f6;
  --background: #111827;
  --text-color: #ffffff;
}
```

### Custom Metrics Cards

```tsx
import { MetricsCard } from '@luciddreamer/monitoring-dashboard';

<MetricsCard
  title="Custom Metric"
  value="42"
  unit="requests"
  trend={12.5}
  trendDirection="up"
  status="normal"
/>
```

### Custom Performance Charts

```tsx
import { PerformanceChart } from '@luciddreamer/monitoring-dashboard';

<PerformanceChart
  data={myData}
  title="Custom Chart"
  color="#ff6b6b"
  height={300}
  yAxisLabel="Value"
/>
```

## Integration Examples

### With WebSocket

```tsx
import { MonitoringDashboard } from '@luciddreamer/monitoring-dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/metrics');

    ws.onmessage = (event) => {
      const newMetric = JSON.parse(event.data);
      setMetrics((prev) => [...prev.slice(-100), newMetric]);
    };

    return () => ws.close();
  }, []);

  return <MonitoringDashboard metrics={metrics} />;
}
```

### With REST API Polling

```tsx
import { MonitoringDashboard } from '@luciddreamer/monitoring-dashboard';

function App() {
  const [metrics, setMetrics] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [metricsRes, agentsRes] = await Promise.all([
        fetch('/api/metrics').then((r) => r.json()),
        fetch('/api/agents').then((r) => r.json()),
      ]);

      setMetrics(metricsRes);
      setAgents(agentsRes);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MonitoringDashboard
      metrics={metrics}
      agentMetrics={agents}
      refreshRate={5000}
    />
  );
}
```

## Dependencies

- React >= 18.0.0
- React-DOM >= 18.0.0
- Recharts >= 2.12.0

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © LucidDreamer

## Related Packages

- [@luciddreamer/memory-visualization](https://www.npmjs.com/package/@luciddreamer/memory-visualization) - Memory system visualization
- [@luciddreamer/agent-grid](https://www.npmjs.com/package/@luciddreamer/agent-grid) - Agent management components
- [@luciddreamer/cost-analysis](https://www.npmjs.com/package/@luciddreamer/cost-analysis) - Cost tracking dashboard

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/luciddreamer/monitoring-dashboard).
