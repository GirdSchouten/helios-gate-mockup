import React from 'react';
import { BarChart3, Activity } from 'lucide-react';

const NetworkStatus: React.FC = () => {
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">Live Network Status</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity size={18} className="text-blue-400" />
            <span className="text-gray-300">Block Height</span>
          </div>
          <div className="font-mono text-white bg-slate-700 px-2 py-1 rounded">
            #15,432,876
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 size={18} className="text-blue-400" />
            <span className="text-gray-300">Block Time</span>
          </div>
          <div className="font-mono text-white bg-slate-700 px-2 py-1 rounded animate-pulse-slow">
            2.1s
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-gray-300">Active Validators</span>
            <span className="text-white font-semibold">100/100</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-orange-600/20 border border-orange-600/30 rounded-lg">
          <h3 className="font-medium text-orange-400 mb-1">Latest Governance Proposal</h3>
          <p className="text-sm text-gray-300">HIP-23: Increase validator set to 150</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">Voting ends in 2 days</span>
            <span className="text-xs font-medium px-2 py-0.5 bg-orange-600/40 text-orange-300 rounded">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;