import React, { useState, useEffect } from 'react';
import { 
  Vote, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  Search,
  Plus,
  X,
  FileText,
  Settings,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Pause,
  RefreshCw,
  History,
  ArrowRight,
  Wallet
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Header from '../components/Header';
import NotificationBar from '../components/NotificationBar';

// Types
interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  proposerName?: string;
  type: 'parameter_change' | 'asset_addition' | 'asset_weight' | 'text' | 'software_upgrade';
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votingEndTime: string;
  votes: {
    yes: number;
    no: number;
    abstain: number;
    veto: number;
    total: number;
  };
  quorum: number;
  currentParticipation: number;
  createdAt: string;
  userVote?: 'yes' | 'no' | 'abstain' | 'veto' | null;
  tags?: string[];
}

const Governance: React.FC = () => {
  const [activeNetwork, setActiveNetwork] = useState('helios');
  const [activeTab, setActiveTab] = useState<'active' | 'passed' | 'rejected'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null);
  const [voteOption, setVoteOption] = useState<'yes' | 'no' | 'abstain' | 'veto' | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    title: '',
    description: '',
    type: 'parameter_change',
    deposit: '100'
  });
  
  // Sample user data
  const userData = {
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    votingPower: 12500,
    votingPowerPercentage: 0.25,
    totalStaked: 2500,
    delegatedVotingPower: 10000,
    proposals: 2,
    votes: 15
  };
  
  // Sample proposals data
  const proposals: Proposal[] = [
    {
      id: 'HIP-23',
      title: 'Increase validator set to 150',
      description: 'This proposal aims to increase the maximum number of validators from 100 to 150 to enhance network decentralization and security. The current validator set is at capacity with 100 active validators and a waiting list of 25 validators. Increasing the set size will allow more validators to participate in consensus, improving network resilience and geographic distribution.',
      proposer: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      proposerName: 'Helios Guardian',
      type: 'parameter_change',
      status: 'active',
      votingEndTime: '2025-06-20T00:00:00Z',
      votes: {
        yes: 7500000,
        no: 1500000,
        abstain: 500000,
        veto: 0,
        total: 9500000
      },
      quorum: 10000000,
      currentParticipation: 47.5,
      createdAt: '2025-06-05T00:00:00Z',
      userVote: 'yes',
      tags: ['validators', 'network', 'security']
    },
    {
      id: 'HIP-24',
      title: 'Reduce transaction fees by 20%',
      description: 'This proposal suggests reducing the base transaction fee by 20% to encourage more activity on the network. With the recent increase in HLS price, transaction costs have become higher in fiat terms. Reducing fees will maintain affordability while still providing adequate spam protection.',
      proposer: '0x8F3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      proposerName: 'Cosmic Validator',
      type: 'parameter_change',
      status: 'active',
      votingEndTime: '2025-06-18T00:00:00Z',
      votes: {
        yes: 6000000,
        no: 3000000,
        abstain: 1000000,
        veto: 500000,
        total: 10500000
      },
      quorum: 10000000,
      currentParticipation: 52.5,
      createdAt: '2025-06-03T00:00:00Z',
      userVote: null,
      tags: ['fees', 'economics']
    },
    {
      id: 'HIP-25',
      title: 'Add AVAX as a supported bridge asset',
      description: 'This proposal seeks to add Avalanche (AVAX) as a supported asset in the Helios Bridge. Adding AVAX will expand cross-chain capabilities and bring more users from the Avalanche ecosystem. The implementation will follow the same security model as existing bridge assets.',
      proposer: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      proposerName: 'Blockchain Sentinels',
      type: 'asset_addition',
      status: 'active',
      votingEndTime: '2025-06-25T00:00:00Z',
      votes: {
        yes: 5000000,
        no: 1000000,
        abstain: 500000,
        veto: 0,
        total: 6500000
      },
      quorum: 10000000,
      currentParticipation: 32.5,
      createdAt: '2025-06-10T00:00:00Z',
      userVote: null,
      tags: ['bridge', 'assets', 'avalanche']
    },
    {
      id: 'HIP-22',
      title: 'Implement progressive staking rewards',
      description: 'This proposal implements a progressive staking reward system where APY increases with longer staking periods. This encourages long-term holding and network stability. Stakers who commit to longer unbonding periods will receive higher rewards.',
      proposer: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      proposerName: 'Helios Guardian',
      type: 'parameter_change',
      status: 'passed',
      votingEndTime: '2025-05-25T00:00:00Z',
      votes: {
        yes: 12000000,
        no: 2000000,
        abstain: 1000000,
        veto: 0,
        total: 15000000
      },
      quorum: 10000000,
      currentParticipation: 75,
      createdAt: '2025-05-10T00:00:00Z',
      userVote: 'yes',
      tags: ['staking', 'rewards', 'economics']
    },
    {
      id: 'HIP-21',
      title: 'Upgrade governance voting period to 14 days',
      description: 'This proposal extends the governance voting period from 7 days to 14 days to allow more time for community discussion and participation. The current 7-day period has proven too short for thorough analysis of complex proposals.',
      proposer: '0x8F3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      proposerName: 'Cosmic Validator',
      type: 'parameter_change',
      status: 'passed',
      votingEndTime: '2025-05-15T00:00:00Z',
      votes: {
        yes: 11000000,
        no: 3000000,
        abstain: 1000000,
        veto: 0,
        total: 15000000
      },
      quorum: 10000000,
      currentParticipation: 75,
      createdAt: '2025-05-01T00:00:00Z',
      userVote: 'yes',
      tags: ['governance', 'voting']
    },
    {
      id: 'HIP-20',
      title: 'Implement slashing for validator downtime',
      description: 'This proposal introduces slashing penalties for validators with excessive downtime. Validators with uptime below 95% over a 30-day period will be subject to a 1% slashing of their staked tokens. This ensures high availability and reliability of the network.',
      proposer: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      proposerName: 'Blockchain Sentinels',
      type: 'parameter_change',
      status: 'rejected',
      votingEndTime: '2025-04-20T00:00:00Z',
      votes: {
        yes: 4000000,
        no: 8000000,
        abstain: 1000000,
        veto: 2000000,
        total: 15000000
      },
      quorum: 10000000,
      currentParticipation: 75,
      createdAt: '2025-04-05T00:00:00Z',
      userVote: 'no',
      tags: ['validators', 'slashing', 'security']
    },
    {
      id: 'HIP-19',
      title: 'Reduce minimum staking amount to 1 HLS',
      description: 'This proposal reduces the minimum staking amount from 10 HLS to 1 HLS to make staking more accessible to smaller holders. This change aims to increase participation in network security and governance.',
      proposer: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      proposerName: 'Helios Guardian',
      type: 'parameter_change',
      status: 'rejected',
      votingEndTime: '2025-04-10T00:00:00Z',
      votes: {
        yes: 5000000,
        no: 7000000,
        abstain: 1000000,
        veto: 1000000,
        total: 14000000
      },
      quorum: 10000000,
      currentParticipation: 70,
      createdAt: '2025-03-25T00:00:00Z',
      userVote: 'abstain',
      tags: ['staking', 'accessibility']
    }
  ];
  
  // Filter proposals based on search term, filter type, and active tab
  const filteredProposals = proposals.filter(proposal => {
    // Filter by tab
    if (activeTab === 'active' && proposal.status !== 'active') return false;
    if (activeTab === 'passed' && proposal.status !== 'passed') return false;
    if (activeTab === 'rejected' && proposal.status !== 'rejected') return false;
    
    // Filter by search term
    if (searchTerm && !proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !proposal.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by type
    if (filterType && proposal.type !== filterType) return false;
    
    return true;
  });
  
  // User's voting history
  const userVotingHistory = proposals.filter(proposal => proposal.userVote !== null);
  
  // Handle proposal submission
  const handleSubmitProposal = () => {
    // In a real app, this would submit the proposal to the blockchain
    alert(`Proposal "${proposalForm.title}" submitted with ${proposalForm.deposit} HLS deposit`);
    setShowProposalModal(false);
    setProposalForm({
      title: '',
      description: '',
      type: 'parameter_change',
      deposit: '100'
    });
  };
  
  // Handle vote submission
  const handleSubmitVote = () => {
    if (!selectedProposal || !voteOption) return;
    
    setIsVoting(true);
    
    // Simulate voting process
    setTimeout(() => {
      setIsVoting(false);
      setShowVoteModal(false);
      setVoteOption(null);
      
      // In a real app, this would update the proposal's vote count
      alert(`Vote "${voteOption}" submitted for proposal ${selectedProposal.id}`);
    }, 2000);
  };
  
  // Toggle proposal expansion
  const toggleProposalExpansion = (proposalId: string) => {
    if (expandedProposal === proposalId) {
      setExpandedProposal(null);
    } else {
      setExpandedProposal(proposalId);
    }
  };
  
  // Open vote modal
  const openVoteModal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setVoteOption(proposal.userVote || null);
    setShowVoteModal(true);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate time remaining
  const calculateTimeRemaining = (endTimeString: string) => {
    const endTime = new Date(endTimeString).getTime();
    const now = new Date().getTime();
    const timeRemaining = endTime - now;
    
    if (timeRemaining <= 0) return 'Voting ended';
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };
  
  // Get color for vote type
  const getVoteColor = (voteType: string) => {
    switch (voteType) {
      case 'yes':
        return '#22c55e'; // green
      case 'no':
        return '#ef4444'; // red
      case 'abstain':
        return '#94a3b8'; // gray
      case 'veto':
        return '#f97316'; // orange
      default:
        return '#3b82f6'; // blue
    }
  };
  
  // Get icon for vote type
  const getVoteIcon = (voteType: string | null | undefined) => {
    switch (voteType) {
      case 'yes':
        return <ThumbsUp size={16} className="text-green-500" />;
      case 'no':
        return <ThumbsDown size={16} className="text-red-500" />;
      case 'abstain':
        return <Pause size={16} className="text-gray-500" />;
      case 'veto':
        return <AlertCircle size={16} className="text-orange-500" />;
      default:
        return null;
    }
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-600/30 text-blue-400 border border-blue-600/30';
      case 'passed':
        return 'bg-green-600/30 text-green-400 border border-green-600/30';
      case 'rejected':
        return 'bg-red-600/30 text-red-400 border border-red-600/30';
      case 'pending':
        return 'bg-yellow-600/30 text-yellow-400 border border-yellow-600/30';
      default:
        return 'bg-gray-600/30 text-gray-400 border border-gray-600/30';
    }
  };
  
  // Get proposal type label
  const getProposalTypeLabel = (type: string) => {
    switch (type) {
      case 'parameter_change':
        return 'Parameter Change';
      case 'asset_addition':
        return 'Asset Addition';
      case 'asset_weight':
        return 'Asset Weight Change';
      case 'text':
        return 'Text Proposal';
      case 'software_upgrade':
        return 'Software Upgrade';
      default:
        return type;
    }
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 border border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            <span className="font-semibold" style={{ color: payload[0].fill }}>
              {payload[0].value.toLocaleString()} votes
            </span>
            {' '}({((payload[0].value / (selectedProposal?.votes.total || 1)) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header activeNetwork={activeNetwork} setActiveNetwork={setActiveNetwork} currentPage="governance" />
      <NotificationBar message="New governance proposal HIP-25 is now open for voting!" type="governance" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Governance</h1>
          <p className="text-gray-300">
            Participate in on-chain governance by voting on proposals and submitting new proposals.
          </p>
        </div>
        
        {/* Voting Power & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Voting Power Card */}
          <div className="glass-card p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Vote size={20} className="text-blue-400 mr-2" />
              Your Governance Power
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-300 mb-1">Voting Power</div>
                <div className="text-2xl font-semibold text-blue-400">{userData.votingPower.toLocaleString()} votes</div>
                <div className="text-xs text-gray-400 mt-1">{userData.votingPowerPercentage}% of total voting power</div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-300 mb-1">Staked HLS</div>
                <div className="text-2xl font-semibold text-white">{userData.totalStaked.toLocaleString()} HLS</div>
                <div className="text-xs text-gray-400 mt-1">Direct voting power</div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-300 mb-1">Delegated Power</div>
                <div className="text-2xl font-semibold text-purple-400">{userData.delegatedVotingPower.toLocaleString()} votes</div>
                <div className="text-xs text-gray-400 mt-1">From validator delegations</div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center mr-3">
                  <Wallet size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-300">Connected Wallet</div>
                  <div className="font-mono text-sm">{userData.address.slice(0, 6)}...{userData.address.slice(-4)}</div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <div className="text-center px-4">
                  <div className="text-xl font-semibold">{userData.proposals}</div>
                  <div className="text-xs text-gray-400">Proposals</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-xl font-semibold">{userData.votes}</div>
                  <div className="text-xs text-gray-400">Votes Cast</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Proposal Card */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText size={20} className="text-green-400 mr-2" />
              Submit a Proposal
            </h2>
            
            <p className="text-gray-300 text-sm mb-4">
              Create a new governance proposal to suggest changes to the Helios network parameters, add new assets, or modify existing ones.
            </p>
            
            <button 
              onClick={() => setShowProposalModal(true)}
              className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <Plus size={18} />
              <span>New Proposal</span>
            </button>
            
            <div className="mt-4 bg-blue-600/20 border border-blue-600/30 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Info size={16} className="text-blue-400 mt-0.5" />
                <div className="text-xs text-gray-300">
                  Submitting a proposal requires a deposit of 100 HLS. This deposit will be returned if the proposal reaches quorum, regardless of the outcome.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Proposals Section */}
        <div className="glass-card p-6 mb-8">
          {/* Tabs & Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex space-x-1 bg-slate-700/50 rounded-lg p-1 mb-4 md:mb-0">
              <button 
                className={`px-4 py-2 rounded-md font-medium ${activeTab === 'active' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setActiveTab('active')}
              >
                Active
              </button>
              <button 
                className={`px-4 py-2 rounded-md font-medium ${activeTab === 'passed' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setActiveTab('passed')}
              >
                Passed
              </button>
              <button 
                className={`px-4 py-2 rounded-md font-medium ${activeTab === 'rejected' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setActiveTab('rejected')}
              >
                Rejected
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search proposals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="relative">
                <select
                  value={filterType || ''}
                  onChange={(e) => setFilterType(e.target.value || null)}
                  className="appearance-none w-full md:w-auto bg-slate-700 border border-slate-600 rounded-lg pl-4 pr-10 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="parameter_change">Parameter Change</option>
                  <option value="asset_addition">Asset Addition</option>
                  <option value="asset_weight">Asset Weight</option>
                  <option value="text">Text Proposal</option>
                  <option value="software_upgrade">Software Upgrade</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Proposals List */}
          <div className="space-y-6">
            {filteredProposals.length > 0 ? (
              filteredProposals.map((proposal) => (
                <div key={proposal.id} className="bg-slate-700/30 rounded-lg overflow-hidden">
                  {/* Proposal Header */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-slate-700/50"
                    onClick={() => toggleProposalExpansion(proposal.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(proposal.status)}`}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </div>
                        <div className="text-sm text-gray-400">{proposal.id}</div>
                        <div className="text-sm bg-slate-600/50 px-2 py-0.5 rounded text-gray-300">
                          {getProposalTypeLabel(proposal.type)}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {proposal.status === 'active' && (
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock size={14} className="text-blue-400" />
                            <span>{calculateTimeRemaining(proposal.votingEndTime)}</span>
                          </div>
                        )}
                        
                        {proposal.userVote && (
                          <div className="flex items-center space-x-1 text-sm">
                            {getVoteIcon(proposal.userVote)}
                            <span>You voted {proposal.userVote}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{proposal.title}</h3>
                      {expandedProposal === proposal.id ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Proposal Content */}
                  {expandedProposal === proposal.id && (
                    <div className="p-4 border-t border-slate-600">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Proposal Details */}
                        <div>
                          <div className="mb-4">
                            <h4 className="text-sm text-gray-400 mb-2">Description</h4>
                            <p className="text-sm text-gray-300">{proposal.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="text-sm text-gray-400 mb-1">Proposer</h4>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{proposal.proposerName || 'Unknown'}</span>
                                <a href="#" className="text-blue-400 hover:text-blue-300">
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm text-gray-400 mb-1">Submitted On</h4>
                              <div className="font-medium">{formatDate(proposal.createdAt)}</div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm text-gray-400 mb-1">Voting End</h4>
                              <div className="font-medium">{formatDate(proposal.votingEndTime)}</div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm text-gray-400 mb-1">Current Participation</h4>
                              <div className="font-medium">{proposal.currentParticipation}%</div>
                            </div>
                          </div>
                          
                          {proposal.tags && proposal.tags.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm text-gray-400 mb-2">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {proposal.tags.map((tag, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-slate-600/50 text-gray-300 px-2 py-1 rounded-full text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {proposal.status === 'active' && (
                            <div className="mt-4">
                              <button 
                                onClick={() => openVoteModal(proposal)}
                                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                                  proposal.userVote 
                                    ? 'bg-slate-600 hover:bg-slate-500' 
                                    : 'bg-blue-600 hover:bg-blue-500'
                                }`}
                              >
                                <Vote size={18} />
                                <span>{proposal.userVote ? 'Change Vote' : 'Vote Now'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* Voting Results */}
                        <div>
                          <h4 className="text-sm text-gray-400 mb-3">Voting Results</h4>
                          
                          <div className="h-48 mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Yes', value: proposal.votes.yes },
                                    { name: 'No', value: proposal.votes.no },
                                    { name: 'Abstain', value: proposal.votes.abstain },
                                    { name: 'Veto', value: proposal.votes.veto }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={4}
                                  dataKey="value"
                                >
                                  <Cell fill={getVoteColor('yes')} />
                                  <Cell fill={getVoteColor('no')} />
                                  <Cell fill={getVoteColor('abstain')} />
                                  <Cell fill={getVoteColor('veto')} />
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getVoteColor('yes') }}></div>
                                <span>Yes</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{proposal.votes.yes.toLocaleString()}</div>
                                <div className="text-xs text-gray-400">
                                  {((proposal.votes.yes / proposal.votes.total) * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getVoteColor('no') }}></div>
                                <span>No</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{proposal.votes.no.toLocaleString()}</div>
                                <div className="text-xs text-gray-400">
                                  {((proposal.votes.no / proposal.votes.total) * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getVoteColor('abstain') }}></div>
                                <span>Abstain</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{proposal.votes.abstain.toLocaleString()}</div>
                                <div className="text-xs text-gray-400">
                                  {((proposal.votes.abstain / proposal.votes.total) * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getVoteColor('veto') }}></div>
                                <span>Veto</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{proposal.votes.veto.toLocaleString()}</div>
                                <div className="text-xs text-gray-400">
                                  {((proposal.votes.veto / proposal.votes.total) * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm text-gray-400 mb-2">Quorum Progress</h4>
                            <div className="w-full bg-slate-600 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  proposal.currentParticipation >= 50 ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${Math.min(100, (proposal.votes.total / proposal.quorum) * 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>{Math.min(100, (proposal.votes.total / proposal.quorum) * 100).toFixed(1)}% of quorum</span>
                              <span>{proposal.votes.total.toLocaleString()} / {proposal.quorum.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No proposals found</h3>
                <p className="text-gray-300 mb-4">
                  {activeTab === 'active' 
                    ? 'There are no active proposals at the moment.' 
                    : `No ${activeTab} proposals match your search criteria.`}
                </p>
                {searchTerm || filterType ? (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilterType(null);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowProposalModal(true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium flex items-center justify-center space-x-2 mx-auto"
                  >
                    <Plus size={18} />
                    <span>Submit a Proposal</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Governance Stats & Voting History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Governance Stats */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 size={20} className="text-purple-400 mr-2" />
              Governance Statistics
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-300 mb-1">Total Proposals</div>
                <div className="text-2xl font-semibold text-white">25</div>
                <div className="text-xs text-gray-400 mt-1">Since network launch</div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-300 mb-1">Active Proposals</div>
                <div className="text-2xl font-semibold text-blue-400">3</div>
                <div className="text-xs text-gray-400 mt-1">Currently in voting period</div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-300 mb-1">Passed Proposals</div>
                <div className="text-2xl font-semibold text-green-400">18</div>
                <div className="text-xs text-gray-400 mt-1">72% success rate</div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-300 mb-1">Average Participation</div>
                <div className="text-2xl font-semibold text-yellow-400">68%</div>
                <div className="text-xs text-gray-400 mt-1">Of total voting power</div>
              </div>
            </div>
            
            <h3 className="font-medium text-lg mb-3">Proposal Types Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Parameter', value: 12 },
                    { name: 'Asset', value: 6 },
                    { name: 'Text', value: 4 },
                    { name: 'Software', value: 3 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Your Voting History */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <History size={20} className="text-orange-400 mr-2" />
              Your Voting History
            </h2>
            
            {userVotingHistory.length > 0 ? (
              <div className="space-y-4">
                {userVotingHistory.map((proposal) => (
                  <div key={proposal.id} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(proposal.status)}`}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </div>
                        <div className="text-sm">{proposal.id}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getVoteIcon(proposal.userVote)}
                        <span className="text-sm font-medium">
                          Voted {proposal.userVote}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-medium mb-2">{proposal.title}</h3>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-400">
                        {formatDate(proposal.createdAt)}
                      </div>
                      <button 
                        onClick={() => toggleProposalExpansion(proposal.id)}
                        className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🗳️</div>
                <h3 className="text-lg font-medium mb-2">No Voting History</h3>
                <p className="text-gray-300 mb-4">
                  You haven't voted on any proposals yet. Start participating in governance to see your voting history here.
                </p>
                <button 
                  onClick={() => setActiveTab('active')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
                >
                  View Active Proposals
                </button>
              </div>
            )}
            
            <div className="mt-6 bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info size={20} className="text-orange-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-orange-300 mb-1">Voting Power Delegation</h3>
                  <p className="text-sm text-gray-300">
                    When you stake with a validator, your voting power is delegated to them by default.
                    You can override this by voting directly on proposals, which will supersede your validator's vote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Governance Guide */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Settings size={20} className="text-blue-400 mr-2" />
            Governance Guide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-medium text-lg mb-2">Proposal Submission</h3>
              <p className="text-gray-300 text-sm">
                Anyone with the minimum deposit (100 HLS) can submit a governance proposal. Proposals can range from parameter changes to asset additions.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-medium text-lg mb-2">Voting Period</h3>
              <p className="text-gray-300 text-sm">
                Once a proposal is submitted, it enters a 14-day voting period. During this time, all token holders and delegators can cast their votes.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-medium text-lg mb-2">Implementation</h3>
              <p className="text-gray-300 text-sm">
                If a proposal passes (majority Yes votes and meets quorum), it is automatically implemented by the network. Parameter changes take effect immediately.
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-300 mb-1">Voting Options Explained</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="flex items-start space-x-2">
                    <ThumbsUp size={16} className="text-green-500 mt-0.5" />
                    <div>
                      <span className="font-medium text-green-400">Yes</span>
                      <p className="text-sm text-gray-300">Vote in favor of the proposal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <ThumbsDown size={16} className="text-red-500 mt-0.5" />
                    <div>
                      <span className="font-medium text-red-400">No</span>
                      <p className="text-sm text-gray-300">Vote against the proposal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Pause size={16} className="text-gray-500 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-400">Abstain</span>
                      <p className="text-sm text-gray-300">Formally abstain from voting</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <AlertCircle size={16} className="text-orange-500 mt-0.5" />
                    <div>
                      <span className="font-medium text-orange-400">Veto</span>
                      <p className="text-sm text-gray-300">Strong opposition that can block a proposal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Submit Proposal Modal */}
      {showProposalModal && (
        <div className="modal-overlay" onClick={() => setShowProposalModal(false)}>
          <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Submit a Governance Proposal</h2>
              <button 
                onClick={() => setShowProposalModal(false)}
                className="p-1 rounded-full hover:bg-slate-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Proposal Title
              </label>
              <input
                type="text"
                value={proposalForm.title}
                onChange={(e) => setProposalForm({...proposalForm, title: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a clear, concise title"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Proposal Type
              </label>
              <div className="relative">
                <select
                  value={proposalForm.type}
                  onChange={(e) => setProposalForm({...proposalForm, type: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pr-10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="parameter_change">Parameter Change</option>
                  <option value="asset_addition">Asset Addition</option>
                  <option value="asset_weight">Asset Weight Change</option>
                  <option value="text">Text Proposal</option>
                  <option value="software_upgrade">Software Upgrade</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Proposal Description
              </label>
              <textarea
                value={proposalForm.description}
                onChange={(e) => setProposalForm({...proposalForm, description: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                placeholder="Provide a detailed description of your proposal, including rationale and expected impact"
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Initial Deposit (HLS)
              </label>
              <input
                type="text"
                value={proposalForm.deposit}
                onChange={(e) => setProposalForm({...proposalForm, deposit: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 100 HLS"
              />
              <p className="text-xs text-gray-400 mt-1">
                Minimum deposit: 100 HLS. This deposit will be returned if the proposal reaches quorum.
              </p>
            </div>
            
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Info size={20} className="text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-300 mb-1">Important Information</h3>
                  <p className="text-sm text-gray-300">
                    Once submitted, your proposal will be visible to all network participants and cannot be modified.
                    Ensure all details are accurate and the description is clear before submitting.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowProposalModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitProposal}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium"
                disabled={!proposalForm.title || !proposalForm.description || !proposalForm.deposit}
              >
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Vote Modal */}
      {showVoteModal && selectedProposal && (
        <div className="modal-overlay" onClick={() => setShowVoteModal(false)}>
          <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Cast Your Vote</h2>
              <button 
                onClick={() => setShowVoteModal(false)}
                className="p-1 rounded-full hover:bg-slate-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-lg">{selectedProposal.id}: {selectedProposal.title}</h3>
              <div className="text-sm text-gray-400 mt-1">
                Voting ends {formatDate(selectedProposal.votingEndTime)}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="space-y-3">
                <button 
                  onClick={() => setVoteOption('yes')}
                  className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                    voteOption === 'yes' 
                      ? 'bg-green-600/30 border border-green-500' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <ThumbsUp size={20} className="text-green-500" />
                  <div className="text-left">
                    <div className="font-medium">Yes</div>
                    <div className="text-xs text-gray-300">Vote in favor of this proposal</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setVoteOption('no')}
                  className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                    voteOption === 'no' 
                      ? 'bg-red-600/30 border border-red-500' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <ThumbsDown size={20} className="text-red-500" />
                  <div className="text-left">
                    <div className="font-medium">No</div>
                    <div className="text-xs text-gray-300">Vote against this proposal</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setVoteOption('abstain')}
                  className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                    voteOption === 'abstain' 
                      ? 'bg-slate-500/30 border border-slate-400' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <Pause size={20} className="text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium">Abstain</div>
                    <div className="text-xs text-gray-300">Formally abstain from voting</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => setVoteOption('veto')}
                  className={`w-full p-3 rounded-lg flex items-center space-x-3 ${
                    voteOption === 'veto' 
                      ? 'bg-orange-600/30 border border-orange-500' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <AlertCircle size={20} className="text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium">Veto</div>
                    <div className="text-xs text-gray-300">Strong opposition that can block the proposal</div>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300">Your Voting Power</div>
                <div className="font-medium">{userData.votingPower.toLocaleString()} votes</div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowVoteModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitVote}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium flex items-center justify-center space-x-2"
                disabled={!voteOption || isVoting}
              >
                {isVoting ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Vote size={18} />
                    <span>Submit Vote</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Governance;