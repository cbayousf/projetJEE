import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, color, subtitle, trend }) => {
  return (
    <div className="stats-card" style={{ '--card-color': color }}>
      <div className="stats-icon-wrapper">
        <div className="stats-icon">{icon}</div>
      </div>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <p className="stats-value">{value}</p>
        {subtitle && <span className="stats-subtitle">{subtitle}</span>}
        {trend && (
          <div className={`stats-trend ${trend.type}`}>
            <span className="trend-icon">
              {trend.type === 'up' ? '📈' : '📉'}
            </span>
            <span className="trend-value">{trend.value}</span>
          </div>
        )}
      </div>
      <div className="stats-decoration"></div>
    </div>
  );
};

export default StatsCard;