import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  Info, 
  ExternalLink, 
  Shield, 
  Clock, 
  Award, 
  Percent, 
  Users, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  ArrowUpDown,
  Star,
  StarOff
} from 'lucide-react';
import Header from '../components/Header';
import NotificationBar from '../components/NotificationBar';

// Types
interface Validator {
  id: string;
  name: string;
  logo: string;
  boost: number;
  reputation: number;
  uptime: number;
  commission: number;
  delegated: number;
  status: 'active' | 'standby' | 'slashed';
  boostStatus: 'optimal' | 'imbalanced' | 'insufficient';
  featured: boolean;
  delegationBreakdown: {
    asset: string;
    weight: number;
    color: string;
  }[];
}

const Validators: React.FC = () => {
  const [activeNetwork, setActiveNetwork] = useState('helios');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'boost' | 'reputation' | 'uptime' | 'delegated'>('boost');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [validators, setValidators] = useState<Validator[]>([]);
  const [filteredValidators, setFilteredValidators] = useState<Validator[]>([]);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Sample validators data
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const sampleValidators: Validator[] = [
      {
        id: 'val1',
        name: 'Helios Guardian',
        logo: '🌞',
        boost: 1.5,
        reputation: 98,
        uptime: 99.98,
        commission: 5,
        delegated: 2500000,
        status: 'active',
        boostStatus: 'optimal',
        featured: true,
        delegationBreakdown: [
          { asset: 'HLS', weight: 40, color: '#3b82f6' },
          { asset: 'ETH', weight: 30, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val2',
        name: 'Cosmic Validator',
        logo: '🌌',
        boost: 1.3,
        reputation: 95,
        uptime: 99.9,
        commission: 7,
        delegated: 1800000,
        status: 'active',
        boostStatus: 'imbalanced',
        featured: true,
        delegationBreakdown: [
          { asset: 'HLS', weight: 30, color: '#3b82f6' },
          { asset: 'ETH', weight: 40, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val3',
        name: 'Quantum Nodes',
        logo: '⚛️',
        boost: 1.2,
        reputation: 92,
        uptime: 99.8,
        commission: 8,
        delegated: 1500000,
        status: 'active',
        boostStatus: 'insufficient',
        featured: false,
        delegationBreakdown: [
          { asset: 'HLS', weight: 20, color: '#3b82f6' },
          { asset: 'ETH', weight: 50, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val4',
        name: 'Blockchain Sentinels',
        logo: '🛡️',
        boost: 1.4,
        reputation: 97,
        uptime: 99.95,
        commission: 6,
        delegated: 2200000,
        status: 'active',
        boostStatus: 'optimal',
        featured: true,
        delegationBreakdown: [
          { asset: 'HLS', weight: 45, color: '#3b82f6' },
          { asset: 'ETH', weight: 25, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val5',
        name: 'Crypto Keepers',
        logo: '🔐',
        boost: 1.1,
        reputation: 90,
        uptime: 99.7,
        commission: 10,
        delegated: 1200000,
        status: 'standby',
        boostStatus: 'insufficient',
        featured: false,
        delegationBreakdown: [
          { asset: 'HLS', weight: 15, color: '#3b82f6' },
          { asset: 'ETH', weight: 55, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val6',
        name: 'Digital Fortress',
        logo: '🏰',
        boost: 1.25,
        reputation: 93,
        uptime: 99.85,
        commission: 7.5,
        delegated: 1600000,
        status: 'active',
        boostStatus: 'imbalanced',
        featured: false,
        delegationBreakdown: [
          { asset: 'HLS', weight: 25, color: '#3b82f6' },
          { asset: 'ETH', weight: 45, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val7',
        name: 'Helios Pioneers',
        logo: '🚀',
        boost: 1.35,
        reputation: 96,
        uptime: 99.92,
        commission: 6.5,
        delegated: 2000000,
        status: 'active',
        boostStatus: 'optimal',
        featured: true,
        delegationBreakdown: [
          { asset: 'HLS', weight: 42, color: '#3b82f6' },
          { asset: 'ETH', weight: 28, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val8',
        name: 'Blockchain Guardians',
        logo: '👮',
        boost: 1.15,
        reputation: 91,
        uptime: 99.75,
        commission: 9,
        delegated: 1300000,
        status: 'active',
        boostStatus: 'insufficient',
        featured: false,
        delegationBreakdown: [
          { asset: 'HLS', weight: 18, color: '#3b82f6' },
          { asset: 'ETH', weight: 52, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val9',
        name: 'Crypto Titans',
        logo: '🔱',
        boost: 1.0,
        reputation: 85,
        uptime: 99.5,
        commission: 12,
        delegated: 900000,
        status: 'slashed',
        boostStatus: 'insufficient',
        featured: false,
        delegationBreakdown: [
          { asset: 'HLS', weight: 10, color: '#3b82f6' },
          { asset: 'ETH', weight: 60, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      },
      {
        id: 'val10',
        name: 'Helios Vanguard',
        logo: '⚔️',
        boost: 1.45,
        reputation: 97.5,
        uptime: 99.96,
        commission: 5.5,
        delegated: 2300000,
        status: 'active',
        boostStatus: 'optimal',
        featured: true,
        delegationBreakdown: [
          { asset: 'HLS', weight: 44, color: '#3b82f6' },
          { asset: 'ETH', weight: 26, color: '#8b5cf6' },
          { asset: 'USDT', weight: 20, color: '#22c55e' },
          { asset: 'BNB', weight: 10, color: '#eab308' },
        ]
      }
    ];
    
    setValidators(sampleValidators);
    setFilteredValidators(sampleValidators);
  }, []);
  
  // Filter and sort validators
  useEffect(() => {
    let filtered = [...validators];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(validator => 
        validator.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(validator => validator.featured);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'boost':
          comparison = a.boost - b.boost;
          break;
        case 'reputation':
          comparison = a.reputation - b.reputation;
          break;
        case 'uptime':
          comparison = a.uptime - b.uptime;
          break;
        case 'delegated':
          comparison = a.delegated - b.delegated;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredValidators(filtered);
  }, [validators, searchTerm, sortBy, sortOrder, showFeaturedOnly]);
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <div className="w-3 h-3 rounded-full bg-green-500"></div>;
      case 'standby':
        return <div className="w-3 h-3 rounded-full bg-yellow-500"></div>;
      case 'slashed':
        return <div className="w-3 h-3 rounded-full bg-red-500"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-500"></div>;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'standby':
        return 'Standby';
      case 'slashed':
        return 'Slashed';
      default:
        return 'Unknown';
    }
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
  
  const handleToggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setValidators(validators.map(validator => 
      validator.id === id 
        ? { ...validator, featured: !validator.featured } 
        : validator
    ));
  };
  
  const handleViewValidatorDetails = (id: string) => {
    // Use the App component's navigation mechanism instead of direct URL manipulation
    // This will properly trigger the state change in the App component
    if (window.location && window.location.href) {
      // Store the selected validator ID in sessionStorage
      sessionStorage.setItem('selectedValidatorId', id);
      
      // Trigger navigation to validator-details in the parent App component
      const event = new CustomEvent('navigateToValidatorDetails', { 
        detail: { validatorId: id }
      });
      window.dispatchEvent(event);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header activeNetwork={activeNetwork} setActiveNetwork={setActiveNetwork} currentPage="staking" />
      <NotificationBar message="New validator onboarding program is now open! Apply today." type="system" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Validators</h1>
          <p className="text-gray-300">
            Stake your assets with trusted validators to earn rewards and secure the Helios network.
          </p>
        </div>
        
        {/* Controls & Filtering */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search validators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 rounded-lg px-4 py-2"
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                >
                  <Filter size={16} />
                  <span>{showFeaturedOnly ? 'All Validators' : 'Featured Only'}</span>
                </button>
              </div>
              
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 rounded-lg px-4 py-2"
                  onClick={toggleSortOrder}
                >
                  <ArrowUpDown size={16} />
                  <span>{sortOrder === 'desc' ? 'Descending' : 'Ascending'}</span>
                </button>
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-slate-700 border border-slate-600 rounded-lg pl-4 pr-10 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="boost">Sort by: APY Boost</option>
                  <option value="reputation">Sort by: Reputation</option>
                  <option value="uptime">Sort by: Uptime</option>
                  <option value="delegated">Sort by: Delegated</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4 flex items-start space-x-3">
            <Info size={20} className="text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-300 mb-1">HELIOS APY Boost System</h3>
              <p className="text-sm text-gray-300">
                Validators must maintain a balance of HELIOS tokens relative to other staked assets to maximize APY. 
                Insufficient HELIOS collateral results in reduced rewards for delegators. Look for validators with 
                <span className="text-green-400 mx-1">Optimal</span> 
                boost status for maximum returns.
              </p>
            </div>
          </div>
        </div>
        
        {/* Featured Validators Section */}
        {showFeaturedOnly && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award size={20} className="text-yellow-400 mr-2" />
              Featured Validators
            </h2>
          </div>
        )}
        
        {/* Validators List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredValidators.map((validator) => (
            <div 
              key={validator.id} 
              className="glass-card p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer"
              onClick={() => handleViewValidatorDetails(validator.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
                    {validator.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{validator.name}</h3>
                    <div className="flex items-center space-x-2 text-sm">
                      {getStatusIcon(validator.status)}
                      <span className={
                        validator.status === 'active' ? 'text-green-400' : 
                        validator.status === 'standby' ? 'text-yellow-400' : 'text-red-400'
                      }>
                        {getStatusText(validator.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleToggleFavorite(validator.id, e)}
                  className="p-1.5 bg-slate-700 rounded-full hover:bg-slate-600"
                >
                  {validator.featured ? (
                    <Star size={16} className="text-yellow-400" />
                  ) : (
                    <StarOff size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
                    <Shield size={14} className="text-blue-400" />
                    <span>APY Boost</span>
                  </div>
                  <div className="text-lg font-semibold text-blue-400">
                    {validator.boost}x
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
                    <Award size={14} className="text-yellow-400" />
                    <span>Reputation</span>
                  </div>
                  <div className="text-lg font-semibold text-yellow-400">
                    {validator.reputation}/100
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
                    <Clock size={14} className="text-green-400" />
                    <span>Uptime</span>
                  </div>
                  <div className="text-lg font-semibold text-green-400">
                    {validator.uptime}%
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-300 mb-1">
                    <Percent size={14} className="text-orange-400" />
                    <span>Commission</span>
                  </div>
                  <div className="text-lg font-semibold text-orange-400">
                    {validator.commission}%
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-300">
                    <Users size={14} className="text-purple-400" />
                    <span>Total Delegated</span>
                  </div>
                  <span className="font-semibold">${formatNumber(validator.delegated)}</span>
                </div>
                
                <div 
                  className="relative h-2 bg-slate-700 rounded-full overflow-hidden"
                  onMouseEnter={() => setShowTooltip(validator.id)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  {validator.delegationBreakdown.map((asset, index) => {
                    // Calculate the starting position based on previous assets
                    const startPosition = validator.delegationBreakdown
                      .slice(0, index)
                      .reduce((acc, curr) => acc + curr.weight, 0);
                    
                    return (
                      <div
                        key={asset.asset}
                        className="absolute top-0 h-full"
                        style={{
                          backgroundColor: asset.color,
                          width: `${asset.weight}%`,
                          left: `${startPosition}%`
                        }}
                      ></div>
                    );
                  })}
                </div>
                
                {showTooltip === validator.id && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {validator.delegationBreakdown.map((asset) => (
                      <div key={asset.asset} className="flex items-center space-x-2 text-xs">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }}></div>
                        <span>{asset.asset}: {asset.weight}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-4 bg-slate-700/50 p-2 rounded-lg">
                {getBoostStatusIcon(validator.boostStatus)}
                <span className="text-sm">
                  {getBoostStatusText(validator.boostStatus)}
                </span>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 font-medium">
                  Stake Now
                </button>
                <button className="flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-3 py-2">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredValidators.length === 0 && (
          <div className="glass-card p-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No validators found</h3>
            <p className="text-gray-300 mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setShowFeaturedOnly(false);
                setSortBy('boost');
                setSortOrder('desc');
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Validator Stats */}
        <div className="glass-card p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Network Validator Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Active Validators</div>
              <div className="text-2xl font-semibold text-white">100/150</div>
              <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '66.7%' }}></div>
              </div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Average APY</div>
              <div className="text-2xl font-semibold text-white">12.4%</div>
              <div className="text-sm text-green-400 mt-1">+0.3% from last epoch</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Total Staked Value</div>
              <div className="text-2xl font-semibold text-white">$120.5M</div>
              <div className="text-sm text-blue-400 mt-1">23% of circulating supply</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-300 mb-1">Network Security</div>
              <div className="text-2xl font-semibold text-white">Very High</div>
              <div className="flex items-center space-x-1 text-sm text-green-400 mt-1">
                <Shield size={14} />
                <span>Optimally distributed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Staking Guide */}
        <div className="glass-card p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Staking Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-medium text-lg mb-2">Choose a Validator</h3>
              <p className="text-gray-300 text-sm">
                Select a validator based on their performance metrics, reputation, and boost status.
                Featured validators are community-vetted for reliability.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-medium text-lg mb-2">Stake Your Assets</h3>
              <p className="text-gray-300 text-sm">
                Delegate your assets to the selected validator. You can stake multiple asset types
                including HLS, ETH, BNB, and stablecoins.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-medium text-lg mb-2">Earn Rewards</h3>
              <p className="text-gray-300 text-sm">
                Receive staking rewards automatically every epoch (24 hours). Your APY is affected by
                the validator's boost status and commission rate.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Validators;