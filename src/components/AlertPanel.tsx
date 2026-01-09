import React from 'react';
import { AlertPanelProps } from '../types';

/**
 * AlertPanel Component
 *
 * Displays system alerts with severity indicators
 */
export const AlertPanel: React.FC<AlertPanelProps> = ({
  alerts,
  maxVisible = 5,
  showSeverity = true,
  onAlertClick,
  onAcknowledge,
}) => {
  const visibleAlerts = alerts.slice(0, maxVisible);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#ef4444';
      case 'error':
        return '#f87171';
      case 'warning':
        return '#f59e0b';
      default:
        return '#3b82f6';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '⚠️';
      case 'error':
        return '❌';
      case 'warning':
        return '⚡';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #374151',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <h3
        style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Alerts</span>
        <span
          style={{
            fontSize: '12px',
            backgroundColor: '#ef4444',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '12px',
          }}
        >
          {alerts.length}
        </span>
      </h3>

      {visibleAlerts.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '32px',
            color: '#9ca3af',
          }}
        >
          No alerts
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {visibleAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onAlertClick?.(alert)}
              style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: alert.acknowledged ? '#374151' : '#1f2937',
                border: `1px solid ${getSeverityColor(alert.severity)}`,
                cursor: onAlertClick ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                opacity: alert.acknowledged ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (onAlertClick) {
                  e.currentTarget.style.backgroundColor = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = alert.acknowledged
                  ? '#374151'
                  : '#1f2937';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                {showSeverity && (
                  <span style={{ fontSize: '16px' }}>
                    {getSeverityIcon(alert.severity)}
                  </span>
                )}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#fff',
                      }}
                    >
                      {alert.title}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#9ca3af',
                      }}
                    >
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#9ca3af',
                      marginBottom: '8px',
                    }}
                  >
                    {alert.message}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Source: {alert.source}</span>
                    {!alert.acknowledged && onAcknowledge && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAcknowledge(alert.id);
                        }}
                        style={{
                          backgroundColor: '#3b82f6',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertPanel;
