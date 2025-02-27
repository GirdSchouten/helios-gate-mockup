import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PortfolioOverviewProps {
  activeNetwork: string;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ activeNetwork }) => {
  // Sample portfolio data
  const portfolioData = {
    helios: {
      totalValue: 25000,
      assets: [
        { name: 'HLS', value: 15000, color: '#3b82f6' },
        { name: 'USDT', value: 5000, color: '#22c55e' },
        { name: 'ETH', value: 3000, color: '#8b5cf6' },
        { name: 'Other', value: 2000, color: '#f97316' },
      ]
    },
    ethereum: {
      totalValue: 12000,
      assets: [
        { name: 'ETH', value: 8000, color: '#8b5cf6' },
        { name: 'USDT', value: 2000, color: '#22c55e' },
        { name: 'Other', value: 2000, color: '#f97316' },
      ]
    },
    bsc: {
      totalValue: 8000,
      assets: [
        { name: 'BNB', value: 5000, color: '#eab308' },
        { name: 'USDT', value: 3000, color: '#22c55e' },
      ]
    },
    polygon: {
      totalValue: 5000,
      assets: [
        { name: 'MATIC', value: 3000, color: '#8b5cf6' },
        { name: 'USDT', value: 2000, color: '#22c55e' },
      ]
    },
    avax: {
      totalValue: 3000,
      assets: [
        { name: 'AVAX', value: 2000, color: '#ef4444' },
        { name: 'USDT', value: 1000, color: '#22c55e' },
      ]
    },
    sonic: {
      totalValue: 2000,
      assets: [
        { name: 'SONIC', value: 1500, color: '#06b6d4' },
        { name: 'USDT', value: 500, color: '#22c55e' },
      ]
    }
  };

  const currentPortfolio = portfolioData[activeNetwork as keyof typeof portfolioData];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">Portfolio Overview</h2>
          <p className="text-gray-400">Your assets on {activeNetwork.charAt(0).toUpperCase() + activeNetwork.slice(1)}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="text-3xl font-bold neon-text-blue">
            {formatCurrency(currentPortfolio.totalValue)}
          </div>
          <p className="text-right text-gray-400">Total Value</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentPortfolio.assets}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {currentPortfolio.assets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Asset Breakdown</h3>
          <div className="space-y-3">
            {currentPortfolio.assets.map((asset, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                  <span>{asset.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(asset.value)}</div>
                  <div className="text-xs text-gray-400">
                    {((asset.value / currentPortfolio.totalValue) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;