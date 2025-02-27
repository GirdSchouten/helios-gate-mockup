import React, { useState, useEffect } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Copy, 
  ExternalLink, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ChevronDown,
  RefreshCw,
  Info,
  QrCode,
  ChevronRight
} from 'lucide-react';
import Header from '../components/Header';
import NotificationBar from '../components/NotificationBar';
import TransactionList from '../components/TransactionList';
import QRCodeModal from '../components/QRCodeModal';

const Bridge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [sourceNetwork, setSourceNetwork] = useState('ethereum');
  const [destinationNetwork, setDestinationNetwork] = useState('helios');
  const [selectedAsset, setSelectedAsset] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [receivingAddress, setReceivingAddress] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const [estimatedFee, setEstimatedFee] = useState('0.001');
  const [showQRCode, setShowQRCode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState('helios');
  
  // Sample assets data
  const assets = {
    ethereum: [
      { symbol: 'ETH', name: 'Ethereum', balance: '5.00', icon: '⟠' },
      { symbol: 'USDT', name: 'Tether', balance: '1000.00', icon: '💵' },
      { symbol: 'USDC', name: 'USD Coin', balance: '1000.00', icon: '💲' },
    ],
    bsc: [
      { symbol: 'BNB', name: 'Binance Coin', balance: '10.00', icon: '🔶' },
      { symbol: 'USDT', name: 'Tether', balance: '1000.00', icon: '💵' },
      { symbol: 'CAKE', name: 'PancakeSwap', balance: '100.00', icon: '🥞' },
    ],
    polygon: [
      { symbol: 'MATIC', name: 'Polygon', balance: '1000.00', icon: '🔷' },
      { symbol: 'USDT', name: 'Tether', balance: '1000.00', icon: '💵' },
      { symbol: 'AAVE', name: 'Aave', balance: '10.00', icon: '👻' },
    ],
    avax: [
      { symbol: 'AVAX', name: 'Avalanche', balance: '100.00', icon: '🔺' },
      { symbol: 'USDT', name: 'Tether', balance: '1000.00', icon: '💵' },
      { symbol: 'JOE', name: 'Trader Joe', balance: '500.00', icon: '🍣' },
    ],
    sonic: [
      { symbol: 'SONIC', name: 'Sonic', balance: '1000.00', icon: '🔊' },
      { symbol: 'USDT', name: 'Tether', balance: '1000.00', icon: '💵' },
    ],
    helios: [
      { symbol: 'HLS', name: 'Helios', balance: '1000.00', icon: '☀️' },
      { symbol: 'USDT', name: 'Tether', balance: '1000.00', icon: '💵' },
      { symbol: 'ETH', name: 'Ethereum', balance: '5.00', icon: '⟠' },
      { symbol: 'BNB', name: 'Binance Coin', balance: '10.00', icon: '🔶' },
    ],
  };
  
  // Sample transactions data
  const transactions = [
    { 
      id: 'tx1', 
      type: 'deposit', 
      sourceNetwork: 'ethereum', 
      destinationNetwork: 'helios',
      asset: 'ETH', 
      amount: '0.5', 
      status: 'confirmed', 
      timestamp: '10 min ago',
      hash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    },
    { 
      id: 'tx2', 
      type: 'withdraw', 
      sourceNetwork: 'helios', 
      destinationNetwork: 'bsc',
      asset: 'BNB', 
      amount: '1.0', 
      status: 'pending', 
      timestamp: '30 min ago',
      hash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    },
    { 
      id: 'tx3', 
      type: 'deposit', 
      sourceNetwork: 'polygon', 
      destinationNetwork: 'helios',
      asset: 'MATIC', 
      amount: '100', 
      status: 'confirmed', 
      timestamp: '2 hours ago',
      hash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    },
    { 
      id: 'tx4', 
      type: 'withdraw', 
      sourceNetwork: 'helios', 
      destinationNetwork: 'ethereum',
      asset: 'ETH', 
      amount: '0.2', 
      status: 'failed', 
      timestamp: '1 day ago',
      hash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    },
  ];
  
  // Update destination network based on source network
  useEffect(() => {
    if (activeTab === 'deposit') {
      setDestinationNetwork('helios');
    } else {
      if (sourceNetwork === 'helios') {
        setDestinationNetwork('ethereum');
      }
    }
  }, [sourceNetwork, activeTab]);
  
  // Update estimated fee based on network and amount
  useEffect(() => {
    if (!amount || isNaN(parseFloat(amount))) {
      setEstimatedFee('0.00');
      return;
    }
    
    const networkFees = {
      ethereum: 0.001,
      bsc: 0.0005,
      polygon: 0.0001,
      avax: 0.0002,
      sonic: 0.0001,
      helios: 0.0001,
    };
    
    const fee = networkFees[sourceNetwork as keyof typeof networkFees] * parseFloat(amount);
    setEstimatedFee(fee.toFixed(4));
  }, [amount, sourceNetwork]);
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(receivingAddress);
    // Show a toast notification here
    alert('Address copied to clipboard');
  };
  
  const handleShowQRCode = () => {
    setShowQRCode(true);
  };
  
  const handleSubmit = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Show success notification
      alert(`${activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'} initiated successfully!`);
      setAmount('');
    }, 2000);
  };
  
  const getNetworkIcon = (network: string) => {
    switch (network) {
      case 'ethereum': return '⟠';
      case 'bsc': return '🔶';
      case 'polygon': return '🔷';
      case 'avax': return '🔺';
      case 'sonic': return '🔊';
      case 'helios': return '☀️';
      default: return '⟠';
    }
  };
  
  const getNetworkName = (network: string) => {
    switch (network) {
      case 'ethereum': return 'Ethereum';
      case 'bsc': return 'Binance Smart Chain';
      case 'polygon': return 'Polygon';
      case 'avax': return 'Avalanche';
      case 'sonic': return 'Sonic';
      case 'helios': return 'Helios';
      default: return 'Ethereum';
    }
  };
  
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
  
  const getNetworkWarning = () => {
    if (activeTab === 'deposit') {
      switch (sourceNetwork) {
        case 'ethereum':
          return 'Ethereum deposits may take up to 5 minutes due to block confirmation times.';
        case 'bsc':
          return 'BSC deposits typically confirm within 30 seconds.';
        case 'polygon':
          return 'Polygon deposits typically confirm within 30 seconds.';
        case 'avax':
          return 'Avalanche deposits typically confirm within 30 seconds.';
        case 'sonic':
          return 'Sonic deposits typically confirm within 10 seconds.';
        default:
          return '';
      }
    } else {
      switch (destinationNetwork) {
        case 'ethereum':
          return 'Withdrawals to Ethereum may take up to 5 minutes due to block confirmation times.';
        case 'bsc':
          return 'Withdrawals to BSC typically confirm within 30 seconds.';
        case 'polygon':
          return 'Withdrawals to Polygon typically confirm within 30 seconds.';
        case 'avax':
          return 'Withdrawals to Avalanche typically confirm within 30 seconds.';
        case 'sonic':
          return 'Withdrawals to Sonic typically confirm within 10 seconds.';
        default:
          return '';
      }
    }
  };
  
  const getAssetWarning = () => {
    if (selectedAsset === 'USDT') {
      return 'USDT on different chains are not the same token. Make sure you understand cross-chain differences.';
    }
    return '';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header activeNetwork={activeNetwork} setActiveNetwork={setActiveNetwork} />
      <NotificationBar message="Bridge maintenance scheduled for June 15, 2025. Plan accordingly." type="system" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Bridge Interface */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Cross-Chain Bridge</h2>
              
              {/* Tab Navigation */}
              <div className="flex mb-6 bg-slate-700/50 rounded-lg p-1">
                <button 
                  className={`flex-1 py-2 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'deposit' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('deposit')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ArrowDown size={18} />
                    <span>Deposit (Bridge IN)</span>
                  </div>
                </button>
                <button 
                  className={`flex-1 py-2 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'withdraw' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('withdraw')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ArrowUp size={18} />
                    <span>Withdraw (Bridge OUT)</span>
                  </div>
                </button>
              </div>
              
              {/* Bridge Form */}
              <div className="space-y-6">
                {/* Source Network Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {activeTab === 'deposit' ? 'Source Network' : 'From Network'}
                  </label>
                  <div className="relative">
                    <select
                      value={sourceNetwork}
                      onChange={(e) => setSourceNetwork(e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pr-10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={activeTab === 'deposit' ? false : true}
                    >
                      {activeTab === 'deposit' ? (
                        <>
                          <option value="ethereum">⟠ Ethereum</option>
                          <option value="bsc">🔶 Binance Smart Chain</option>
                          <option value="polygon">🔷 Polygon</option>
                          <option value="avax">🔺 Avalanche</option>
                          <option value="sonic">🔊 Sonic</option>
                        </>
                      ) : (
                        <option value="helios">☀️ Helios</option>
                      )}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown size={18} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Destination Network Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {activeTab === 'deposit' ? 'Destination Network' : 'To Network'}
                  </label>
                  <div className="relative">
                    <select
                      value={destinationNetwork}
                      onChange={(e) => setDestinationNetwork(e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pr-10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={activeTab === 'deposit' ? true : false}
                    >
                      {activeTab === 'deposit' ? (
                        <option value="helios">☀️ Helios</option>
                      ) : (
                        <>
                          <option value="ethereum">⟠ Ethereum</option>
                          <option value="bsc">🔶 Binance Smart Chain</option>
                          <option value="polygon">🔷 Polygon</option>
                          <option value="avax">🔺 Avalanche</option>
                          <option value="sonic">🔊 Sonic</option>
                        </>
                      )}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown size={18} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Network Flow Visualization */}
                <div className="flex items-center justify-center py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                      {getNetworkIcon(sourceNetwork)}
                    </div>
                    <div className="w-20 h-0.5 bg-blue-500 relative">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 rounded-full p-1">
                        <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                      {getNetworkIcon(destinationNetwork)}
                    </div>
                  </div>
                </div>
                
                {/* Asset Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Asset
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {assets[sourceNetwork as keyof typeof assets].map((asset) => (
                      <div 
                        key={asset.symbol}
                        className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                          selectedAsset === asset.symbol ? 'bg-blue-600/30 border border-blue-500' : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                        onClick={() => setSelectedAsset(asset.symbol)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                            {asset.icon}
                          </div>
                          <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-xs text-gray-400">{asset.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{asset.balance}</div>
                          <div className="text-xs text-gray-400">Available</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Amount Input */}
                <div>
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
                      <button 
                        className="text-blue-400 text-sm"
                        onClick={() => {
                          const asset = assets[sourceNetwork as keyof typeof assets].find(a => a.symbol === selectedAsset);
                          if (asset) {
                            setAmount(asset.balance.replace(/,/g, ''));
                          }
                        }}
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Receiving Address (for withdrawals) */}
                {activeTab === 'withdraw' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Receiving Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={receivingAddress}
                        onChange={(e) => setReceivingAddress(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0x..."
                      />
                    </div>
                  </div>
                )}
                
                {/* Deposit Address (for deposits) */}
                {activeTab === 'deposit' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Deposit Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={receivingAddress}
                        readOnly
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="absolute right-3 top-2.5 flex space-x-2">
                        <button 
                          className="p-1 rounded-md hover:bg-slate-600"
                          onClick={handleCopyAddress}
                        >
                          <Copy size={18} className="text-blue-400" />
                        </button>
                        <button 
                          className="p-1 rounded-md hover:bg-slate-600"
                          onClick={handleShowQRCode}
                        >
                          <QrCode size={18} className="text-blue-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Fee Estimation */}
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Estimated Fee:</span>
                    <span className="font-medium">{estimatedFee} {selectedAsset}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">You will receive:</span>
                    <span className="font-medium">
                      {amount && !isNaN(parseFloat(amount)) 
                        ? (parseFloat(amount) - parseFloat(estimatedFee)).toFixed(4) 
                        : '0.00'} {selectedAsset}
                    </span>
                  </div>
                </div>
                
                {/* Network Warning */}
                {getNetworkWarning() && (
                  <div className="flex items-start space-x-2 bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
                    <Info size={18} className="text-yellow-500 mt-0.5" />
                    <p className="text-sm text-yellow-300">{getNetworkWarning()}</p>
                  </div>
                )}
                
                {/* Asset Warning */}
                {getAssetWarning() && (
                  <div className="flex items-start space-x-2 bg-orange-600/20 border border-orange-600/30 rounded-lg p-3">
                    <AlertCircle size={18} className="text-orange-500 mt-0.5" />
                    <p className="text-sm text-orange-300">{getAssetWarning()}</p>
                  </div>
                )}
                
                {/* Submit Button */}
                <button 
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                    isProcessing 
                      ? 'bg-blue-700 cursor-not-allowed' 
                      : amount && parseFloat(amount) > 0 
                        ? 'bg-blue-600 hover:bg-blue-500' 
                        : 'bg-slate-700 cursor-not-allowed'
                  }`}
                  onClick={handleSubmit}
                  disabled={isProcessing || !amount || parseFloat(amount) <= 0}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      {activeTab === 'deposit' ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
                      <span>{activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Transaction History */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Bridge Transactions</h2>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {tx.type === 'deposit' ? (
                          <ArrowDown size={16} className="text-blue-400" />
                        ) : (
                          <ArrowUp size={16} className="text-orange-400" />
                        )}
                        <span className="font-medium">
                          {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(tx.status)}
                        <span className={
                          tx.status === 'confirmed' ? 'text-green-500' : 
                          tx.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                        }>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-300">
                        {tx.amount} {tx.asset}
                      </div>
                      <div className="text-sm text-gray-300">
                        {tx.timestamp}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <span>{getNetworkIcon(tx.sourceNetwork)}</span>
                        <span className="text-gray-400">{getNetworkName(tx.sourceNetwork)}</span>
                        <ArrowRight size={12} className="text-gray-500" />
                        <span>{getNetworkIcon(tx.destinationNetwork)}</span>
                        <span className="text-gray-400">{getNetworkName(tx.destinationNetwork)}</span>
                      </div>
                      <a 
                        href={`https://explorer.helios.io/tx/${tx.hash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 flex items-center hover:text-blue-300"
                      >
                        Explorer <ExternalLink size={12} className="ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="text-blue-400 text-sm flex items-center mt-4 hover:text-blue-300">
                View all transactions <ChevronRight size={16} />
              </a>
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Bridge Information</h2>
              <div className="space-y-4">
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  <h3 className="font-medium mb-2">Supported Networks</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto bg-slate-600 rounded-full flex items-center justify-center text-lg">
                        ⟠
                      </div>
                      <div className="text-xs mt-1">Ethereum</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto bg-slate-600 rounded-full flex items-center justify-center text-lg">
                        🔶
                      </div>
                      <div className="text-xs mt-1">BSC</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto bg-slate-600 rounded-full flex items-center justify-center text-lg">
                        🔷
                      </div>
                      <div className="text-xs mt-1">Polygon</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto bg-slate-600 rounded-full flex items-center justify-center text-lg">
                        🔺
                      </div>
                      <div className="text-xs mt-1">Avalanche</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto bg-slate-600 rounded-full flex items-center justify-center text-lg">
                        🔊
                      </div>
                      <div className="text-xs mt-1">Sonic</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto bg-slate-600 rounded-full flex items-center justify-center text-lg">
                        ☀️
                      </div>
                      <div className="text-xs mt-1">Helios</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  <h3 className="font-medium mb-2">Bridge Security</h3>
                  <p className="text-sm text-gray-300">
                    Helios Bridge is secured by a decentralized network of validators and uses multi-signature technology to ensure the safety of your assets.
                  </p>
                </div>
                
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  <h3 className="font-medium mb-2">Processing Times</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ethereum:</span>
                      <span>~5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BSC:</span>
                      <span>~30 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Polygon:</span>
                      <span>~30 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avalanche:</span>
                      <span>~30 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sonic:</span>
                      <span>~10 seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {showQRCode && (
        <QRCodeModal 
          address={receivingAddress} 
          asset={selectedAsset}
          network={sourceNetwork}
          onClose={() => setShowQRCode(false)} 
        />
      )}
    </div>
  );
};

export default Bridge;

// Helper component for the arrow icon
const ArrowRight: React.FC<{ size: number, className?: string }> = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
};