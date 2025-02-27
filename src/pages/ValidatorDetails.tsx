import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  Clock, 
  Award, 
  Percent, 
  Users, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Twitter,
  Globe,
  Mail,
  MessageSquare,
  BarChart3,
  PieChart as PieChartIcon,
  Vote,
  History,
  Wallet
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Header from '../components/Header';
import NotificationBar from '../components/NotificationBar';

const ValidatorDetails: React.FC = () => {
  const [activeNetwork, setActiveNetwork] = useState('helios');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    performance: true,
    delegation: true,
    governance: true,
    staking: true
  });
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('HLS');
  const [stakeAmount, setStakeAmount] = useState('');
  
  // Get validator ID from sessionStorage
  const validatorId = sessionStorage.getItem('selectedValidatorId') || 'val1';
  
  // Sample validator data
  const validator = {
    id: 'val1',
    name: 'Helios Guardian',
    logo: '🌞',
    description: 'Helios Guardian is a professional validator service with 99.98% uptime and a strong focus on security and reliability. We operate enterprise-grade infrastructure with multiple redundancies and 24/7 monitoring.',
    verified: true,
    boost: 1.5,
    reputation: 98,
    uptime: 99.98,
    commission: 5,
    delegated: 2500000,
    status: 'active',
    boostStatus: 'optimal',
    featured: true,
    website: 'https://heliosguardian.io',
    twitter: '@HeliosGuardian',
    email: 'contact@heliosguardian.io',
    telegram: '@heliosguardian',
    location: 'Frankfurt, Germany',
    joinedDate: 'Mar 15, 2025',
    baseApy: 8.5,
    currentApy: 12.75,
    maxApy: 12.75,
    unbondingPeriod: 14, // days
    governanceParticipation: 98, // percentage
    delegationBreakdown: [
      { asset: 'HLS', weight: 40, value: 1000000, color: '#3b82f6' },
      { asset: 'ETH', weight: 30, value: 750000, color: '#8b5cf6' },
      { asset: 'USDT', weight: 20, value: 500000, color: '#22c55e' },
      { asset: 'BNB', weight: 10, value: 250000, color: '#eab308' },
    ],
    delegatorDistribution: [
      { name: 'Retail (<$10k)', value: 30, color: '#3b82f6' },
      { name: 'Medium ($10k-$100k)', value: 40, color: '#8b5cf6' },
      { name: 'Whale (>$100k)', value: 20, color: '#22c55e' },
      { name: 'Self-Stake', value: 10, color: '#eab308' },
    ],
    uptimeHistory: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      uptime: Math.min(100, 99.9 + Math.random() * 0.1),
    })),
    slashingEvents: [],
    governanceVotes: [
      { proposal: 'HIP-23: Increase validator set', vote: 'For', result: 'Passed' },
      { proposal: 'HIP-22: Reduce transaction fees', vote: 'For', result: 'Passed' },
      { proposal: 'HIP-21: Add new bridge assets', vote: 'For', result: 'Passed' },
      { proposal: 'HIP-20: Modify staking rewards', vote: 'Against', result: 'Failed' },
      { proposal: 'HIP-19: Update governance parameters', vote: 'For', result: 'Passed' },
    ],
    heliosRatio: {
      current: 40,
      required: 35,
      status: 'optimal' // optimal, imbalanced, insufficient
    }
  };
  
  // Available assets for staking
  const assets = [
    { symbol: 'HLS', name: 'Helios', balance: '1,000.00', icon: '☀️' },
    { symbol: 'ETH', name: 'Ethereum', balance: '5.00', icon: '⟠' },
    { symbol: 'BNB', name: 'Binance Coin', balance: '10.00', icon: '🔶' },
    { symbol: 'USDT', name: 'Tether', balance: '500.00', icon: '💵' },
  ];
  
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };
  
  const getBoostStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'imbalanced':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'insufficient':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Info size={16} className="text-gray-500" />;
    }
  };
  
  const getBoostStatusText = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'Optimal HELIOS Ratio';
      case 'imbalanced':
        return 'Imbalanced HELIOS Ratio';
      case 'insufficient':
        return 'Insufficient HELIOS';
      default:
        return 'Unknown';
    }
  };
  
  const getBoostStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-green-500';
      case 'imbalanced':
        return 'text-yellow-500';
      case 'insufficient':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const handleCopyAddress = () => {
    // In a real app, this would copy the validator's address to clipboard
    alert('Validator address copied to clipboard');
  };
  
  const handleStake = () => {
    setShowStakeModal(true);
  };
  
  const handleStakeSubmit = () => {
    // In a real app, this would submit the staking transaction
    alert(`Staking ${stakeAmount} ${selectedAsset} with ${validator.name}`);
    setShowStakeModal(false);
    setStakeAmount('');
  };
  
  const calculateEstimatedRewards = () => {
    if (!stakeAmount || isNaN(parseFloat(stakeAmount))) return '0.00';
    
    const amount = parseFloat(stakeAmount);
    const dailyRate = validator.currentApy / 100 / 365;
    const dailyReward = amount * dailyRate;
    
    return {
      daily: dailyReward.toFixed(4),
      monthly: (dailyReward * 30).toFixed(4),
      yearly: (dailyReward * 365).toFixed(4)
    };
  };
  
  // Handle back navigation
  const handleBack = () => {
    // Clear the selected validator ID from sessionStorage
    sessionStorage.removeItem('selectedValidatorId');
    
    // Dispatch a custom event to navigate back to the validators list
    const event = new CustomEvent('navigateToPage', { 
      detail: { page: 'staking' }
    });
    window.dispatchEvent(event);
    
    // Fallback if the event doesn't work
    if (window.history && window.history.back) {
      window.history.back();
    }
  };
  
  const rewards = calculateEstimatedRewards();
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 border border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium">Day {payload[0].payload.day}</p>
          <p className="text-green-400 font-semibold">{`Uptime: ${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header activeNetwork={activeNetwork} setActiveNetwork={setActiveNetwork} currentPage="staking" />
      <NotificationBar message="Validator rewards are distributed daily at 00:00 UTC." type="system" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft size={18} />
            <span>Back to Validators</span>
          </button>
        </div>
        
        {/* Validator Overview Card */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-3xl">
                {validator.logo}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold">{validator.name}</h1>
                  {validator.verified && (
                    <div className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Verified</div>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-green-400">Active</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">Joined {validator.joinedDate}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <button 
                onClick={handleCopyAddress}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 rounded-lg px-4 py-2"
              >
                <Copy size={16} />
                <span>Copy Address</span>
              </button>
              
              <button 
                onClick={handleStake}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 rounded-lg px-6 py-2 font-medium"
              >
                <Wallet size={16} />
                <span>Stake Now</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                {validator.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Globe size={16} className="text-gray-400" />
                  <a href={validator.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    Website
                  </a>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Twitter size={16} className="text-gray-400" />
                  <a href={`https://twitter.com/${validator.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {validator.twitter}
                  </a>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-400" />
                  <a href={`mailto:${validator.email}`} className="text-blue-400 hover:underline">
                    Email
                  </a>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MessageSquare size={16} className="text-gray-400" />
                  <a href={`https://t.me/${validator.telegram}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    Telegram
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Info size={14} className="text-gray-400" />
                <span>Located in {validator.location}</span>
              </div>
            </div>
            
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
                    <Shield size={14} className="text-blue-400" />
                    <span>Current APY</span>
                  </div>
                  <div className="text-2xl font-semibold text-blue-400">
                    {validator.currentApy}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Base: {validator.baseApy}% + Boost: {(validator.currentApy - validator.baseApy).toFixed(2)}%
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
                    <Award size={14} className="text-yellow-400" />
                    <span>Reputation</span>
                  </div>
                  <div className="text-2xl font-semibold text-yellow-400">
                    {validator.reputation}/100
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Based on historical performance
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
                    <Clock size={14} className="text-green-400" />
                    <span>Uptime</span>
                  </div>
                  <div className="text-2xl font-semibold text-green-400">
                    {validator.uptime}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last 30 days
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
                    <Percent size={14} className="text-orange-400" />
                    <span>Commission</span>
                  </div>
                  <div className="text-2xl font-semibold text-orange-400">
                    {validator.commission}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Of staking rewards
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-300">
                    <Users size={14} className="text-purple-400" />
                    <span>Total Delegated</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(validator.delegated)}</span>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  {getBoostStatusIcon(validator.heliosRatio.status)}
                  <span className={`text-sm ${getBoostStatusColor(validator.heliosRatio.status)}`}>
                    {getBoostStatusText(validator.heliosRatio.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* APY Breakdown Section */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('overview')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <Shield size={20} className="text-blue-400 mr-2" />
              APY Breakdown & HELIOS Boost
            </h2>
            {expandedSections.overview ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.overview && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-300 mb-1">Base APY</div>
                  <div className="text-3xl font-semibold text-white">{validator.baseApy}%</div>
                  <div className="text-xs text-gray-400 mt-1">Without HELIOS boost</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 text-center border-2 border-blue-500/50">
                  <div className="text-sm text-gray-300 mb-1">Current APY</div>
                  <div className="text-3xl font-semibold text-blue-400">{validator.currentApy}%</div>
                  <div className="text-xs text-gray-400 mt-1">With current HELIOS ratio</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-300 mb-1">Maximum APY</div>
                  <div className="text-3xl font-semibold text-white">{validator.maxApy}%</div>
                  <div className="text-xs text-gray-400 mt-1">With optimal HELIOS ratio</div>
                </div>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-6 mb-6">
                <h3 className="font-medium text-lg mb-4">HELIOS Collateral Status</h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Current HELIOS Ratio:</span>
                    <span className="font-medium">{validator.heliosRatio.current}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        validator.heliosRatio.status === 'optimal' ? 'bg-green-500' :
                        validator.heliosRatio.status === 'imbalanced' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${validator.heliosRatio.current}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Required HELIOS Ratio:</span>
                    <span className="font-medium">{validator.heliosRatio.required}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full" 
                      style={{ width: `${validator.heliosRatio.required}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 bg-blue-600/20 border border-blue-600/30 rounded-lg p-4 mt-6">
                  <Info size={20} className="text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-300 mb-1">How HELIOS Ratio Affects Your Rewards</h4>
                    <p className="text-sm text-gray-300">
                      Validators must maintain a minimum ratio of HELIOS tokens relative to other staked assets to maximize APY. 
                      When the HELIOS ratio falls below the required threshold, the APY boost is reduced proportionally.
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-green-300">Optimal: Full APY boost applied</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <AlertTriangle size={14} className="text-yellow-500" />
                        <span className="text-yellow-300">Imbalanced: Partial APY boost</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <XCircle size={14} className="text-red-500" />
                        <span className="text-red-300">Insufficient: Minimal or no APY boost</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-4">Delegation Breakdown</h3>
                  <div className="space-y-3">
                    {validator.delegationBreakdown.map((asset) => (
                      <div key={asset.asset} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                          <span>{asset.asset}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(asset.value)}</div>
                          <div className="text-xs text-gray-400">
                            {asset.weight}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="h-64">
                  <h3 className="font-medium text-lg mb-4">Asset Distribution</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={validator.delegationBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {validator.delegationBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Performance History Section */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('performance')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <BarChart3 size={20} className="text-green-400 mr-2" />
              Performance History
            </h2>
            {expandedSections.performance ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.performance && (
            <div className="mt-6">
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-4">30-Day Uptime</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={validator.uptimeHistory}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="day" stroke="#94a3b8" />
                      <YAxis domain={[99.5, 100]} stroke="#94a3b8" />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="uptime" 
                        stroke="#4ade80" 
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#4ade80" }}
                        activeDot={{ r: 5, fill: "#4ade80" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">Average Uptime</div>
                  <div className="text-2xl font-semibold text-green-400">{validator.uptime}%</div>
                  <div className="text-xs text-gray-400 mt-1">Last 30 days</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">Blocks Proposed</div>
                  <div className="text-2xl font-semibold text-blue-400">12,458</div>
                  <div className="text-xs text-gray-400 mt-1">Last 30 days</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">Blocks Missed</div>
                  <div className="text-2xl font-semibold text-orange-400">2</div>
                  <div className="text-xs text-gray-400 mt-1">Last 30 days</div>
                </div>
              </div>
              
              {validator.slashingEvents.length > 0 ? (
                <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
                  <h3 className="font-medium text-lg text-red-300 mb-2">Slashing Events</h3>
                  <div className="space-y-2">
                    {validator.slashingEvents.map((event, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <XCircle size={16} className="text-red-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-red-300">{event.date}</div>
                          <div className="text-sm text-gray-300">{event.reason}</div>
                          <div className="text-xs text-gray-400">Amount slashed: {event.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <div>
                    <h3 className="font-medium text-green-300">No Slashing Events</h3>
                    <p className="text-sm text-gray-300">This validator has never been slashed.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Delegation Distribution Section */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('delegation')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <PieChartIcon size={20} className="text-purple-400 mr-2" />
              Delegator Distribution
            </h2>
            {expandedSections.delegation ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.delegation && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={validator.delegatorDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {validator.delegatorDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-4">Delegator Breakdown</h3>
                <div className="space-y-3">
                  {validator.delegatorDistribution.map((segment) => (
                    <div key={segment.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                        <span>{segment.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{segment.value}%</div>
                        <div className="text-xs text-gray-400">
                          {formatCurrency(validator.delegated * segment.value / 100)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users size={16} className="text-purple-400" />
                    <h4 className="font-medium">Unique Delegators</h4>
                  </div>
                  <div className="text-2xl font-semibold">1,245</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Across all supported networks
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Governance Participation Section */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('governance')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <Vote size={20} className="text-orange-400 mr-2" />
              Governance Participation
            </h2>
            {expandedSections.governance ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.governance && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">Participation Rate</div>
                  <div className="text-2xl font-semibold text-orange-400">{validator.governanceParticipation}%</div>
                  <div className="text-xs text-gray-400 mt-1">Of all proposals</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">Voting Pattern</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-full bg-slate-600 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-l-full" style={{ width: '80%' }}></div>
                      <div className="bg-red-500 h-2.5" style={{ width: '20%', marginLeft: '80%', marginTop: '-10px' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <span>80% For</span>
                    <span>20% Against</span>
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-1">Proposals Voted</div>
                  <div className="text-2xl font-semibold text-white">
                    {validator.governanceVotes.length}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last 3 months
                  </div>
                </div>
              </div>
              
              <h3 className="font-medium text-lg mb-4">Recent Votes</h3>
              <div className="space-y-3">
                {validator.governanceVotes.map((vote, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{vote.proposal}</div>
                      <div className="text-sm text-gray-300">Result: {vote.result}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      vote.vote === 'For' ? 'bg-green-600/30 text-green-400' : 
                      vote.vote === 'Against' ? 'bg-red-600/30 text-red-400' : 
                      'bg-yellow-600/30 text-yellow-400'
                    }`}>
                      {vote.vote}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Staking Section */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('staking')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <History size={20} className="text-blue-400 mr-2" />
              Staking Information
            </h2>
            {expandedSections.staking ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.staking && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-3">Staking Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Minimum Stake:</span>
                      <span className="font-medium">1 HLS / 0.01 ETH / 0.05 BNB</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Unbonding Period:</span>
                      <span className="font-medium">{validator.unbondingPeriod} days</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Reward Distribution:</span>
                      <span className="font-medium">Daily at 00:00 UTC</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Commission Rate:</span>
                      <span className="font-medium">{validator.commission}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Commission Change:</span>
                      <span className="font-medium">7-day notice required</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-3">Supported Assets</h3>
                  
                  <div className="space-y-3">
                    {assets.map((asset) => (
                      <div key={asset.symbol} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
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
              </div>
              
              <div className="flex justify-center mt-6">
                <button 
                  onClick={handleStake}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium flex items-center space-x-2"
                >
                  <Wallet size={18} />
                  <span>Stake Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Stake Modal */}
      {showStakeModal && (
        <div className="modal-overlay" onClick={() => setShowStakeModal(false)}>
          <div className="modal-content max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Stake with {validator.name}</h2>
              <button 
                onClick={() => setShowStakeModal(false)}
                className="p-1 rounded-full hover:bg-slate-700"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Asset
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {assets.map((token) => (
                  <div 
                    key={token.symbol}
                    className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                      selectedAsset === token.symbol ? 'bg-blue-600/30 border border-blue-500' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    onClick={() => setSelectedAsset(token.symbol)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                        {token.icon}
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
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <button 
                    className="text-blue-400 text-sm"
                    onClick={() => {
                      const asset = assets.find(a => a.symbol === selectedAsset);
                      if (asset) {
                        setStakeAmount(asset.balance.replace(/,/g, ''));
                      }
                    }}
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-3">Estimated Rewards</h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Daily:</span>
                  <span className="font-medium">{rewards.daily} {selectedAsset}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Monthly:</span>
                  <span className="font-medium">{rewards.monthly} {selectedAsset}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Yearly:</span>
                  <span className="font-medium">{rewards.yearly} {selectedAsset}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">APY:</span>
                  <span className="font-medium text-blue-400">{validator.currentApy}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
              <AlertTriangle size={20} className="text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-300 mb-1">Important Information</h4>
                <p className="text-sm text-gray-300">
                  Staked assets have a {validator.unbondingPeriod}-day unbonding period during which they cannot be transferred or used.
                  Commission rate is currently {validator.commission}% and may change with 7-day notice.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowStakeModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleStakeSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
              >
                Confirm Stake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidatorDetails;