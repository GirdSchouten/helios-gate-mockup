import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface DepositModalProps {
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ onClose, onNavigate }) => {
  const [selectedToken, setSelectedToken] = useState('HLS');
  const [amount, setAmount] = useState('');
  
  const tokens = [
    { symbol: 'HLS', name: 'Helios', balance: '1,000.00' },
    { symbol: 'ETH', name: 'Ethereum', balance: '5.00' },
    { symbol: 'BNB', name: 'Binance Coin', balance: '10.00' },
    { symbol: 'USDT', name: 'Tether', balance: '500.00' },
  ];
  
  const handleProceed = () => {
    // In a real app, this would redirect to the Bridge page with prefilled data
    console.log(`Proceeding with deposit: ${amount} ${selectedToken}`);
    onClose();
    if (onNavigate) {
      onNavigate('bridge');
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Deposit Assets</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Token
          </label>
          <div className="space-y-2">
            {tokens.map((token) => (
              <div 
                key={token.symbol}
                className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                  selectedToken === token.symbol ? 'bg-blue-600/30 border border-blue-500' : 'bg-slate-700 hover:bg-slate-600'
                }`}
                onClick={() => setSelectedToken(token.symbol)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{token.name}</div>
                    <div className="text-xs text-gray-400">{token.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{token.balance}</div>
                  <div className="text-xs text-gray-400">Available</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <button className="text-blue-400 text-sm">MAX</button>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleProceed}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium flex items-center justify-center"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Proceed to Bridge
            <ExternalLink size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;