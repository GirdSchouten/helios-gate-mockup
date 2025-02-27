import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const TVLSection: React.FC = () => {
  const tvlData = [
    { name: 'Helios', value: 500, color: '#3b82f6' },
    { name: 'Ethereum', value: 200, color: '#8b5cf6' },
    { name: 'BSC', value: 150, color: '#eab308' },
    { name: 'Polygon', value: 50, color: '#a855f7' },
    { name: 'AVAX', value: 75, color: '#ef4444' },
    { name: 'Sonic', value: 25, color: '#06b6d4' },
  ];

  const formatCurrency = (value: number) => {
    return `$${value}M`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 border border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-blue-400 font-semibold">{`TVL: $${payload[0].value}M`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Total Value Locked (TVL)</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={tvlData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" name="TVL (millions)" radius={[4, 4, 0, 0]}>
              {tvlData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2">
        {tvlData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-blue-400 font-semibold">${item.value}M</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVLSection;