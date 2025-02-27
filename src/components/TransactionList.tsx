import React from 'react';
import { Clock, CheckCircle2, AlertCircle, ArrowDown, ArrowUp, CoinsIcon, Vote } from 'lucide-react';

const TransactionList: React.FC = () => {
  const transactions = [
    { 
      id: 1, 
      type: 'bridge-in', 
      asset: 'ETH', 
      amount: '0.5', 
      status: 'confirmed', 
      timestamp: '10 min ago',
      icon: ArrowDown
    },
    { 
      id: 2, 
      type: 'stake', 
      asset: 'HLS', 
      amount: '100', 
      status: 'confirmed', 
      timestamp: '2 hours ago',
      icon: CoinsIcon
    },
    { 
      id: 3, 
      type: 'vote', 
      asset: 'HLS', 
      amount: '50', 
      status: 'pending', 
      timestamp: '5 hours ago',
      icon: Vote
    },
    { 
      id: 4, 
      type: 'bridge-out', 
      asset: 'USDT', 
      amount: '500', 
      status: 'confirmed', 
      timestamp: '1 day ago',
      icon: ArrowUp
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'failed':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-yellow-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'bridge-in':
        return 'Bridge In';
      case 'bridge-out':
        return 'Bridge Out';
      case 'stake':
        return 'Stake';
      case 'vote':
        return 'Vote';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      {transactions.slice(0, 5).map((tx) => (
        <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-600 rounded-full">
              <tx.icon size={16} className="text-white" />
            </div>
            <div>
              <div className="font-medium">{getTypeLabel(tx.type)}</div>
              <div className="text-sm text-gray-300">{tx.timestamp}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{tx.amount} {tx.asset}</div>
            <div className="flex items-center justify-end space-x-1 text-sm">
              {getStatusIcon(tx.status)}
              <span className={tx.status === 'confirmed' ? 'text-green-500' : tx.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}>
                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;