import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  CoinsIcon, 
  ExternalLink, 
  Info, 
  Minus, 
  Plus, 
  RefreshCw, 
  Settings, 
  XCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Header from '../components/Header';
import NotificationBar from '../components/NotificationBar';

const MyDelegations: React.FC = () => {
  const [activeNetwork, setActiveNetwork] = useState('helios');
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedValidator, setSelectedValidator] = useState<string | null>(null);
  const [manageAction, setManageAction] = useState<'stake' | 'unstake'>('stake');
  const [manageAmount, setManageAmount] = useState('');
  const [claimingRewards, setClaimingRewards] = useState(false);
  const [rewardsTimeframe, setRewardsTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [expandedSections, setExpandedSections] = useState({
    active: true,
    unbonding: true,
    rewards: true,
    projections: true,
    history: true
  });
  
  // Sample delegation data
  const delegations = [
    {
      id: 'val1',
      name: 'Helios Guardian',
      logo: '🌞',
      baseApy: 8.5,
      boostedApy: 12.75,
      stakedAssets: [
        { symbol: 'HLS', amount: 1000, value: 5000 },
        { symbol: 'ETH', amount: 0.5, value: 1500 }
      ],
      rewards: {
        pending: 42.8,
        claimed: 156.3,
        history: [
          { date: '2025-06-01', amount: 3.2 },
          { date: '2025-06-02', amount: 3.3 },
          { date: '2025-06-03', amount: 3.1 },
          { date: '2025-06-04', amount: 3.4 },
          { date: '2025-06-05', amount: 3.2 },
          { date: '2025-06-06', amount: 3.3 },
          { date: '2025-06-07', amount: 3.5 },
          { date: '2025-06-08', amount: 3.4 },
          { date: '2025-06-09', amount: 3.6 },
          { date: '2025-06-10', amount: 3.5 },
          { date: '2025-06-11', amount: 3.7 },
          { date: '2025-06-12', amount: 3.6 },
          { date: '2025-06-13', amount: 3.8 },
          { date: '2025-06-14', amount: 3.7 }
        ]
      },
      status: 'active',
      commission: 5,
      lastReward: '2 hours ago'
    },
    {
      id: 'val2',
      name: 'Cosmic Validator',
      logo: '🌌',
      baseApy: 7.8,
      boostedApy: 10.5,
      stakedAssets: [
        { symbol: 'HLS', amount: 500, value: 2500 }
      ],
      rewards: {
        pending: 18.5,
        claimed: 87.2,
        history: [
          { date: '2025-06-01', amount: 1.5 },
          { date: '2025-06-02', amount: 1.4 },
          { date: '2025-06-03', amount: 1.6 },
          { date: '2025-06-04', amount: 1.5 },
          { date: '2025-06-05', amount: 1.4 },
          { date: '2025-06-06', amount: 1.3 },
          { date: '2025-06-07', amount: 1.5 },
          { date: '2025-06-08', amount: 1.4 },
          { date: '2025-06-09', amount: 1.6 },
          { date: '2025-06-10', amount: 1.5 },
          { date: '2025-06-11', amount: 1.4 },
          { date: '2025-06-12', amount: 1.3 },
          { date: '2025-06-13', amount: 1.5 },
          { date: '2025-06-14', amount: 1.4 }
        ]
      },
      status: 'active',
      commission: 7,
      lastReward: '3 hours ago'
    },
    {
      id: 'val3',
      name: 'Quantum Nodes',
      logo: '⚛️',
      baseApy: 8.0,
      boostedApy: 9.6,
      stakedAssets: [
        { symbol: 'HLS', amount: 300, value: 1500 }
      ],
      rewards: {
        pending: 10.2,
        claimed: 45.8,
        history: [
          { date: '2025-06-01', amount: 0.8 },
          { date: '2025-06-02', amount: 0.7 },
          { date: '2025-06-03', amount: 0.9 },
          { date: '2025-06-04', amount: 0.8 },
          { date: '2025-06-05', amount: 0.7 },
          { date: '2025-06-06', amount: 0.8 },
          { date: '2025-06-07', amount: 0.7 },
          { date: '2025-06-08', amount: 0.8 },
          { date: '2025-06-09', amount: 0.7 },
          { date: '2025-06-10', amount: 0.9 },
          { date: '2025-06-11', amount: 0.8 },
          { date: '2025-06-12', amount: 0.7 },
          { date: '2025-06-13', amount: 0.8 },
          { date: '2025-06-14', amount: 0.7 }
        ]
      },
      status: 'unbonding',
      commission: 8,
      lastReward: '1 day ago',
      unbonding: {
        amount: 300,
        value: 1500,
        completionDate: '2025-06-18',
        progress: 30
      }
    }
  ];
  
  // Sample unbonding delegations
  const unbondingDelegations = [
    {
      id: 'val3',
      name: 'Quantum Nodes',
      logo: '⚛️',
      amount: 300,
      value: 1500,
      completionDate: '2025-06-18',
      progress: 30
    },
    {
      id: 'val4',
      name: 'Blockchain Sentinels',
      logo: '🛡️',
      amount: 200,
      value: 1000,
      completionDate: '2025-06-20',
      progress: 15
    }
  ];
  
  // Sample transaction history
  const transactionHistory = [
    {
      id: 'tx1',
      type: 'stake',
      validator: 'Helios Guardian',
      amount: '1000 HLS',
      status: 'confirmed',
      date: 'Jun 10, 2025'
    },
    {
      id: 'tx2',
      type: 'stake',
      validator: 'Cosmic Validator',
      amount: '500 HLS',
      status: 'confirmed',
      date: 'Jun 8, 2025'
    },
    {
      id: 'tx3',
      type: 'unstake',
      validator: 'Quantum Nodes',
      amount: '300 HLS',
      status: 'unbonding',
      date: 'Jun 4, 2025'
    },
    {
      id: 'tx4',
      type: 'claim',
      validator: 'All Validators',
      amount: '42.8 HLS',
      status: 'confirmed',
      date: 'Jun 1, 2025'
    }
  ];
  
  // Calculate total staked value
  const totalStakedValue = delegations
    .filter(d => d.status === 'active')
    .reduce((total, delegation) => {
      return total + delegation.stakedAssets.reduce((sum, asset) => sum + asset.value, 0);
    }, 0);
  
  // Calculate total unbonding value
  const totalUnbondingValue = unbondingDelegations.reduce((total, unbonding) => {
    return total + unbonding.value;
  }, 0);
  
  // Calculate average APY
  const averageApy = delegations
    .filter(d => d.status === 'active')
    .reduce((total, delegation) => {
      const delegationValue = delegation.stakedAssets.reduce((sum, asset) => sum + asset.value, 0);
      return total + (delegation.boostedApy * delegationValue);
    }, 0) / totalStakedValue || 0; // Add fallback for division by zero
  
  // Calculate total pending rewards
  const totalPendingRewards = delegations.reduce((total, delegation) => {
    return total + delegation.rewards.pending;
  }, 0);
  
  // Prepare data for pie chart
  const pieChartData = delegations
    .filter(d => d.status === 'active')
    .map((delegation, index) => {
      const value = delegation.stakedAssets.reduce((sum, asset) => sum + asset.value, 0);
      return {
        name: delegation.name,
        value,
        color: getColorByIndex(index)
      };
    });
  
  // Prepare data for line chart
  const getRewardsHistoryData = () => {
    // Combine rewards from all validators
    const combinedHistory: Record<string, number> = {};
    
    delegations.forEach(delegation => {
      delegation.rewards.history.forEach(entry => {
        if (combinedHistory[entry.date]) {
          combinedHistory[entry.date] += entry.amount;
        } else {
          combinedHistory[entry.date] = entry.amount;
        }
      });
    });
    
    // Convert to array format for chart
    return Object.entries(combinedHistory).map(([date, amount]) => ({
      date,
      amount
    })).sort((a, b) => a.date.localeCompare(b.date));
  };
  
  const rewardsHistoryData = getRewardsHistoryData();
  
  // Calculate rewards projections
  const calculateProjections = () => {
    const dailyRewards = delegations
      .filter(d => d.status === 'active')
      .reduce((total, delegation) => {
        const delegationValue = delegation.stakedAssets.reduce((sum, asset) => sum + asset.value, 0);
        const dailyRate = delegation.boostedApy / 100 / 365;
        return total + (delegationValue * dailyRate);
      }, 0);
    
    return {
      daily: dailyRewards,
      weekly: dailyRewards * 7,
      monthly: dailyRewards * 30,
      yearly: dailyRewards * 365
    };
  };
  
  const projections = calculateProjections();
  
  // Helper functions
  function getColorByIndex(index: number): string {
    const colors = ['#3b82f6', '#8b5cf6', '#22c55e', '#eab308', '#ef4444', '#06b6d4'];
    return colors[index % colors.length];
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(num);
  };
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  // Event handlers
  const handleClaimRewards = (validatorId: string | null = null) => {
    setSelectedValidator(validatorId);
    setShowClaimModal(true);
  };
  
  const handleManageDelegation = (validatorId: string, action: 'stake' | 'unstake') => {
    setSelectedValidator(validatorId);
    setManageAction(action);
    setShowManageModal(true);
  };
  
  const handleClaimAllRewards = () => {
    setClaimingRewards(true);
    
    // Simulate claiming process
    setTimeout(() => {
      setClaimingRewards(false);
      setShowClaimModal(false);
      alert('Rewards claimed successfully!');
    }, 2000);
  };
  
  const handleViewValidatorDetails = (validatorId: string) => {
    // Store the selected validator ID in sessionStorage
    sessionStorage.setItem('selectedValidatorId', validatorId);
    
    // Trigger navigation to validator-details in the parent App component
    const event = new CustomEvent('navigateToValidatorDetails', { 
      detail: { validatorId }
    });
    window.dispatchEvent(event);
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 border border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
          <p className="text-blue-400 font-semibold">{`Rewards: ${payload[0].value.toFixed(2)} HLS`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header activeNetwork={activeNetwork} setActiveNetwork={setActiveNetwork} currentPage="my-delegations" />
      <NotificationBar message="New validator rewards are now 12.75% APY. Stake more to earn more!" type="system" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Delegations</h1>
          <p className="text-gray-300">
            Manage your staked assets, track rewards, and monitor unbonding delegations.
          </p>
        </div>
        
        {/* Staking Summary */}
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Total Staked Value</div>
              <div className="text-2xl font-semibold text-white">{formatCurrency(totalStakedValue)}</div>
              <div className="text-xs text-gray-400 mt-1">Across {delegations.filter(d => d.status === 'active').length} validators</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Average APY</div>
              <div className="text-2xl font-semibold text-blue-400">{averageApy.toFixed(2)}%</div>
              <div className="text-xs text-gray-400 mt-1">Weighted average</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Pending Rewards</div>
              <div className="text-2xl font-semibold text-yellow-400">{formatNumber(totalPendingRewards)} HLS</div>
              <div className="text-xs text-gray-400 mt-1">≈ {formatCurrency(totalPendingRewards * 5)}</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Unbonding Value</div>
              <div className="text-2xl font-semibold text-orange-400">{formatCurrency(totalUnbondingValue)}</div>
              <div className="text-xs text-gray-400 mt-1">Across {unbondingDelegations.length} validators</div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => handleClaimRewards(null)}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-medium flex items-center space-x-2"
              disabled={totalPendingRewards <= 0}
            >
              <Award size={18} />
              <span>Claim All Rewards ({formatNumber(totalPendingRewards)} HLS)</span>
            </button>
          </div>
        </div>
        
        {/* Delegation Distribution & Rewards History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Delegation Distribution */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <PieChartIcon size={20} className="text-blue-400 mr-2" />
              Delegation Distribution
            </h2>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-3">
              {pieChartData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span>{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(entry.value)}</div>
                    <div className="text-xs text-gray-400">
                      {((entry.value / totalStakedValue) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Rewards History */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <LineChartIcon size={20} className="text-green-400 mr-2" />
              Rewards History
            </h2>
            
            <div className="flex space-x-2 mb-4">
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${rewardsTimeframe === 'daily' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                onClick={() => setRewardsTimeframe('daily')}
              >
                Daily
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${rewardsTimeframe === 'weekly' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                onClick={() => setRewardsTimeframe('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${rewardsTimeframe === 'monthly' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                onClick={() => setRewardsTimeframe('monthly')}
              >
                Monthly
              </button>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={rewardsHistoryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94a3b8"
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#4ade80" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#4ade80" }}
                    activeDot={{ r: 5, fill: "#4ade80" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                <div className="text-sm text-gray-300">Daily Avg</div>
                <div className="font-medium text-green-400">{formatNumber(projections.daily)} HLS</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                <div className="text-sm text-gray-300">Weekly Avg</div>
                <div className="font-medium text-green-400">{formatNumber(projections.weekly)} HLS</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                <div className="text-sm text-gray-300">Monthly Avg</div>
                <div className="font-medium text-green-400">{formatNumber(projections.monthly)} HLS</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Active Delegations */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('active')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <CoinsIcon size={20} className="text-blue-400 mr-2" />
              Active Delegations
            </h2>
            {expandedSections.active ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.active && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-slate-700">
                    <th className="pb-2 font-medium">Validator</th>
                    <th className="pb-2 font-medium">Staked Assets</th>
                    <th className="pb-2 font-medium">APY</th>
                    <th className="pb-2 font-medium">Pending Rewards</th>
                    <th className="pb-2 font-medium">Last Reward</th>
                    <th className="pb-2 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {delegations.filter(d => d.status === 'active').map((delegation) => (
                    <tr key={delegation.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-xl">
                            {delegation.logo}
                          </div>
                          <div>
                            <div 
                              className="font-medium cursor-pointer hover:text-blue-400"
                              onClick={() => handleViewValidatorDetails(delegation.id)}
                            >
                              {delegation.name}
                            </div>
                            <div className="text-xs text-gray-400">Commission: {delegation.commission}%</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="space-y-1">
                          {delegation.stakedAssets.map((asset, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span>{formatNumber(asset.amount)} {asset.symbol}</span>
                              <span className="text-gray-400 text-sm">{formatCurrency(asset.value)}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="font-medium text-blue-400">{delegation.boostedApy}%</div>
                        <div className="text-xs text-gray-400">Base: {delegation.baseApy}%</div>
                      </td>
                      <td className="py-4">
                        <div className="font-medium text-yellow-400">{formatNumber(delegation.rewards.pending)} HLS</div>
                        <div className="text-xs text-gray-400">≈ {formatCurrency(delegation.rewards.pending * 5)}</div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <Clock size={14} className="text-gray-400" />
                          <span>{delegation.lastReward}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleClaimRewards(delegation.id)}
                            className="p-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/30"
                            title="Claim Rewards"
                          >
                            <Award size={16} />
                          </button>
                          <button 
                            onClick={() => handleManageDelegation(delegation.id, 'stake')}
                            className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30"
                            title="Stake More"
                          >
                            <Plus size={16} />
                          </button>
                          <button 
                            onClick={() => handleManageDelegation(delegation.id, 'unstake')}
                            className="p-2 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30"
                            title="Unstake"
                          >
                            <Minus size={16} />
                          </button>
                          <button 
                            onClick={() => handleViewValidatorDetails(delegation.id)}
                            className="p-2 bg-slate-600/50 text-white rounded-lg hover:bg-slate-600"
                            title="View Details"
                          >
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {delegations.filter(d => d.status === 'active').length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🔍</div>
                  <h3 className="text-lg font-medium mb-1">No Active Delegations</h3>
                  <p className="text-gray-400 mb-4">You don't have any active delegations yet.</p>
                  <button 
                    onClick={() => {
                      const event = new CustomEvent('navigateToPage', { 
                        detail: { page: 'staking' }
                      });
                      window.dispatchEvent(event);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
                  >
                    Explore Validators
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Unbonding Delegations */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('unbonding')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <Clock size={20} className="text-orange-400 mr-2" />
              Unbonding Delegations
            </h2>
            {expandedSections.unbonding ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.unbonding && (
            <div className="mt-6">
              {unbondingDelegations.length > 0 ? (
                <div className="space-y-4">
                  {unbondingDelegations.map((unbonding) => (
                    <div key={unbonding.id} className="bg-slate-700/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-xl">
                            {unbonding.logo}
                          </div>
                          <div>
                            <div 
                              className="font-medium cursor-pointer hover:text-blue-400"
                              onClick={() => handleViewValidatorDetails(unbonding.id)}
                            >
                              {unbonding.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {formatNumber(unbonding.amount)} HLS (≈ {formatCurrency(unbonding.value)})
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">Completes on</div>
                          <div className="text-orange-400">{new Date(unbonding.completionDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Unbonding Progress</span>
                          <span>{unbonding.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${unbonding.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">⏱️</div>
                  <h3 className="text-lg font-medium mb-1">No Unbonding Delegations</h3>
                  <p className="text-gray-400">You don't have any assets in the unbonding period.</p>
                </div>
              )}
              
              <div className="mt-4 bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info size={20} className="text-orange-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-orange-300 mb-1">About Unbonding Period</h3>
                    <p className="text-sm text-gray-300">
                      When you unstake your assets, they enter a 14-day unbonding period during which they cannot be transferred or used.
                      You will not earn staking rewards during this time. This is a security measure to protect the network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Rewards Projections */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('projections')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <TrendingUp size={20} className="text-green-400 mr-2" />
              Rewards Projections
            </h2>
            {expandedSections.projections ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.projections && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-300 mb-1">Daily Rewards</div>
                  <div className="text-2xl font-semibold text-green-400">{formatNumber(projections.daily)} HLS</div>
                  <div className="text-xs text-gray-400 mt-1">≈ {formatCurrency(projections.daily * 5)}</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-300 mb-1">Weekly Rewards</div>
                  <div className="text-2xl font-semibold text-green-400">{formatNumber(projections.weekly)} HLS</div>
                  <div className="text-xs text-gray-400 mt-1">≈ {formatCurrency(projections.weekly * 5)}</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-300 mb-1">Monthly Rewards</div>
                  <div className="text-2xl font-semibold text-green-400">{formatNumber(projections.monthly)} HLS</div>
                  <div className="text-xs text-gray-400 mt-1">≈ {formatCurrency(projections.monthly * 5)}</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-300 mb-1">Yearly Rewards</div>
                  <div className="text-2xl font-semibold text-green-400">{formatNumber(projections.yearly)} HLS</div>
                  <div className="text-xs text-gray-400 mt-1">≈ {formatCurrency(projections.yearly * 5)}</div>
                </div>
              </div>
              
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info size={20} className="text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-300 mb-1">About Projections</h3>
                    <p className="text-sm text-gray-300">
                      These projections are estimates based on your current staking positions and APY rates.
                      Actual rewards may vary based on network conditions, validator performance, and changes in APY rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Transaction History */}
        <div className="glass-card p-6 mb-8">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('history')}
          >
            <h2 className="text-xl font-semibold flex items-center">
              <BarChart3 size={20} className="text-purple-400 mr-2" />
              Transaction History
            </h2>
            {expandedSections.history ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
          
          {expandedSections.history && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-slate-700">
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Validator</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium text-right">Explorer</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((tx) => (
                    <tr key={tx.id} className={tx.id === 'tx1' || tx.id === 'tx3' ? "bg-slate-800/30 hover:bg-slate-700/30" : "hover:bg-slate-700/30"}>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1.5 rounded-full ${
                            tx.type === 'stake' ? 'bg-blue-600/30 text-blue-400' :
                            tx.type === 'unstake' ? 'bg-orange-600/30 text-orange-400' :
                            'bg-green-600/30 text-green-400'
                          }`}>
                            {tx.type === 'stake' ? <Plus size={14} /> :
                             tx.type === 'unstake' ? <Minus size={14} /> :
                             <Award size={14} />}
                          </div>
                          <span>{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{tx.validator}</td>
                      <td className="py-3 px-4">{tx.amount}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            tx.status === 'confirmed' ? 'bg-green-500' :
                            tx.status === 'unbonding' ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}></div>
                          <span>{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{tx.date}</td>
                      <td className="py-3 px-4 text-right">
                        <a href="#" className="text-blue-400 hover:text-blue-300">
                          <ExternalLink size={16} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      {/* Claim Rewards Modal */}
      {showClaimModal && (
        <div className="modal-overlay" onClick={() => setShowClaimModal(false)}>
          <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Claim Staking Rewards</h2>
              <button 
                onClick={() => setShowClaimModal(false)}
                className="p-1 rounded-full hover:bg-slate-700"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center mb-4">
                <div className="text-sm text-gray-300 mb-1">Available Rewards</div>
                <div className="text-3xl font-semibold text-yellow-400">
                  {formatNumber(selectedValidator 
                    ? delegations.find(d => d.id === selectedValidator)?.rewards.pending || 0
                    : totalPendingRewards
                  )} HLS
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  ≈ {formatCurrency((selectedValidator 
                    ? delegations.find(d => d.id === selectedValidator)?.rewards.pending || 0
                    : totalPendingRewards) * 5)}
                </div>
              </div>
              
              <button
                onClick={handleClaimAllRewards}
                disabled={claimingRewards}
                className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                {claimingRewards ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Claiming...</span>
                  </>
                ) : (
                  <>
                    <Award size={18} />
                    <span>Claim Rewards</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info size={20} className="text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-300 mb-1">About Claiming Rewards</h3>
                  <p className="text-sm text-gray-300">
                    Claiming rewards will transfer your pending staking rewards to your wallet.
                    This action requires a small network fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Manage Delegation Modal */}
      {showManageModal && (
        <div className="modal-overlay" onClick={() => setShowManageModal(false)}>
          <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {manageAction === 'stake' ? 'Stake More' : 'Unstake'} with {
                  delegations.find(d => d.id === selectedValidator)?.name
                }
              </h2>
              <button 
                onClick={() => setShowManageModal(false)}
                className="p-1 rounded-full hover:bg-slate-700"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={manageAmount}
                  onChange={(e) => setManageAmount(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3  text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <button 
                    className="text-blue-400 text-sm"
                    onClick={() => {
                      if (manageAction === 'stake') {
                        setManageAmount('100');
                      } else {
                        const delegation = delegations.find(d => d.id === selectedValidator);
                        if (delegation) {
                          const totalStaked = delegation.stakedAssets.reduce((sum, asset) => {
                            return asset.symbol === 'HLS' ? sum + asset.amount : sum;
                          }, 0);
                          setManageAmount(totalStaked.toString());
                        }
                      }
                    }}
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>
            
            {manageAction === 'unstake' && (
              <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle size={20} className="text-orange-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-orange-300 mb-1">Unbonding Period</h3>
                    <p className="text-sm text-gray-300">
                      Your assets will be locked for 14 days during the unbonding period.
                      You will not earn rewards during this time.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowManageModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowManageModal(false);
                  alert(`${manageAction === 'stake' ? 'Staked' : 'Unstaked'} ${manageAmount} HLS successfully!`);
                }}
                className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                  manageAction === 'stake' 
                    ? 'bg-blue-600 hover:bg-blue-500' 
                    : 'bg-orange-600 hover:bg-orange-500'
                }`}
                disabled={!manageAmount || parseFloat(manageAmount) <= 0}
              >
                Confirm {manageAction === 'stake' ? 'Stake' : 'Unstake'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDelegations;