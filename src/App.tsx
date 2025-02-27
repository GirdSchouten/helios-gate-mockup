import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Wallet, 
  ArrowDown, 
  ArrowUp, 
  CoinsIcon, 
  Vote, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Activity,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Header from './components/Header';
import NotificationBar from './components/NotificationBar';
import NetworkSelector from './components/NetworkSelector';
import ActionButtons from './components/ActionButtons';
import TransactionList from './components/TransactionList';
import NetworkStatus from './components/NetworkStatus';
import DepositModal from './components/DepositModal';
import PortfolioOverview from './components/PortfolioOverview';
import TVLSection from './components/TVLSection';
import Bridge from './pages/Bridge';
import Validators from './pages/Validators';
import ValidatorDetails from './pages/ValidatorDetails';
import MyDelegations from './pages/MyDelegations';
import Governance from './pages/Governance';

function App() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState('helios');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedValidatorId, setSelectedValidatorId] = useState<string | null>(null);
  
  const handleDeposit = () => {
    setShowDepositModal(true);
  };

  const handleCloseModal = () => {
    setShowDepositModal(false);
  };

  const handleNavigate = (page: string) => {
    // Always update the page state, even if it's the current page
    setCurrentPage(page);
    
    // Reset validator details when navigating away from that page
    if (page !== 'validator-details') {
      setSelectedValidatorId(null);
      sessionStorage.removeItem('selectedValidatorId');
    }
  };

  const handleViewValidator = (id: string) => {
    setSelectedValidatorId(id);
    setCurrentPage('validator-details');
    // Store in session storage for persistence
    sessionStorage.setItem('selectedValidatorId', id);
  };

  // Listen for custom navigation events from child components
  useEffect(() => {
    const handleNavigateToValidatorDetails = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.validatorId) {
        handleViewValidator(customEvent.detail.validatorId);
      }
    };

    const handleNavigateToPage = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.page) {
        handleNavigate(customEvent.detail.page);
      }
    };

    // Check for stored validator ID in sessionStorage (for page refreshes)
    const storedValidatorId = sessionStorage.getItem('selectedValidatorId');
    if (storedValidatorId && currentPage === 'validator-details') {
      setSelectedValidatorId(storedValidatorId);
    }

    window.addEventListener('navigateToValidatorDetails', handleNavigateToValidatorDetails);
    window.addEventListener('navigateToPage', handleNavigateToPage);
    
    return () => {
      window.removeEventListener('navigateToValidatorDetails', handleNavigateToValidatorDetails);
      window.removeEventListener('navigateToPage', handleNavigateToPage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {currentPage === 'home' ? (
        <>
          <Header 
            activeNetwork={activeNetwork} 
            setActiveNetwork={setActiveNetwork} 
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />
          <NotificationBar message="New governance proposal is live! Vote now." type="governance" />
          
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <PortfolioOverview activeNetwork={activeNetwork} />
                
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <ActionButtons onDeposit={handleDeposit} onNavigate={handleNavigate} />
                </div>
                
                <TVLSection />
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                  <TransactionList />
                  <a href="#" className="text-blue-400 text-sm flex items-center mt-4 hover:text-blue-300">
                    View all transactions <ChevronRight size={16} />
                  </a>
                </div>
                
                <NetworkStatus />
              </div>
            </div>
          </main>
          
          {showDepositModal && (
            <DepositModal onClose={handleCloseModal} onNavigate={handleNavigate} />
          )}
        </>
      ) : currentPage === 'bridge' ? (
        <Bridge />
      ) : currentPage === 'staking' ? (
        <Validators />
      ) : currentPage === 'validator-details' ? (
        <ValidatorDetails />
      ) : currentPage === 'my-delegations' ? (
        <MyDelegations />
      ) : currentPage === 'governance' ? (
        <Governance />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Page Under Construction</h1>
            <p className="mb-6">This page is coming soon!</p>
            <button 
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;