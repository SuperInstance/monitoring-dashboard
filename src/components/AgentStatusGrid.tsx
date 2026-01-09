import React from 'react';
import { AgentMetrics } from '../types';

interface AgentStatusGridProps {
  agents: AgentMetrics[];
  onAgentClick?: (agent: AgentMetrics) => void;
  theme?: 'light' | 'dark';
}

/**
 * AgentStatusGrid Component
 *
 * Grid display of agent statuses with metrics
 */
export const AgentStatusGrid: React.FC<AgentStatusGridProps> = ({
  agents,
  onAgentClick,
  theme = 'dark',
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'idle':
        return '#9ca3af';
      case 'error':
        return '#ef4444';
      case 'offline':
        return '#6b7280';
      default:
        return '#9ca3af';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'idle':
        return 'Idle';
      case 'error':
        return 'Error';
      case 'offline':
        return 'Offline';
      default:
        return status;
    }
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
      <h3
        style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#fff',
        }}
      >
        Agent Status ({agents.length})
      </h3>

      {agents.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '32px',
            color: '#9ca3af',
          }}
        >
          No agents available
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
          }}
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => onAgentClick?.(agent)}
              style={{
                padding: '16px',
                borderRadius: '6px',
                backgroundColor: '#111827',
                border: '1px solid #374151',
                cursor: onAgentClick ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (onAgentClick) {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#374151';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Agent Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#fff',
                      marginBottom: '2px',
                    }}
                  >
                    {agent.name}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#6b7280',
                    }}
                  >
                    ID: {agent.id}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(agent.status),
                      animation:
                        agent.status === 'active'
                          ? 'pulse 2s infinite'
                          : 'none',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      color: getStatusColor(agent.status),
                      fontWeight: '500',
                    }}
                  >
                    {getStatusLabel(agent.status)}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  fontSize: '12px',
                }}
              >
                <div>
                  <div style={{ color: '#9ca3af', marginBottom: '2px' }}>
                    Completed
                  </div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>
                    {agent.tasksCompleted}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#9ca3af', marginBottom: '2px' }}>
                    Tasks/min
                  </div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>
                    {agent.tasksPerMinute.toFixed(1)}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#9ca3af', marginBottom: '2px' }}>
                    Avg Response
                  </div>
                  <div style={{ color: '#fff', fontWeight: '600' }}>
                    {agent.avgResponseTime.toFixed(0)}ms
                  </div>
                </div>
                <div>
                  <div style={{ color: '#9ca3af', marginBottom: '2px' }}>
                    Error Rate
                  </div>
                  <div
                    style={{
                      color: agent.errorRate > 5 ? '#ef4444' : '#fff',
                      fontWeight: '600',
                    }}
                  >
                    {agent.errorRate.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Memory Usage Bar */}
              <div
                style={{
                  marginTop: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: '#9ca3af',
                    marginBottom: '4px',
                  }}
                >
                  <span>Memory</span>
                  <span>{agent.memoryUsage.toFixed(0)}MB</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#374151',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(agent.memoryUsage / 1024, 100)}%`,
                      height: '100%',
                      backgroundColor:
                        agent.memoryUsage > 800
                          ? '#ef4444'
                          : agent.memoryUsage > 500
                          ? '#f59e0b'
                          : '#10b981',
                      }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default AgentStatusGrid;
