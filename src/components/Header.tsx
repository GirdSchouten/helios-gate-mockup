import React from 'react';
import { Sun, Wallet } from 'lucide-react';
import NetworkSelector from './NetworkSelector';

interface HeaderProps {
  activeNetwork: string;
  setActiveNetwork: (network: string) => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ activeNetwork, setActiveNetwork, onNavigate, currentPage = 'home' }) => {
  const handleNavigation = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      // Always navigate, even if it's the current page
      onNavigate(page);
      
      // Dispatch a custom event as a backup navigation method
      const event = new CustomEvent('navigateToPage', { 
        detail: { page }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center cursor-pointer" onClick={(e) => handleNavigation(e, 'home')}>
                <Sun className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">Helios Gate</span>
              </div>
            </div>
            <nav className="ml-10 flex items-center space-x-4">
              <a 
                href="#" 
                className={`${currentPage === 'home' ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                onClick={(e) => handleNavigation(e, 'home')}
              >
                Home
              </a>
              <a 
                href="#" 
                className={`${currentPage === 'bridge' ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                onClick={(e) => handleNavigation(e, 'bridge')}
              >
                Bridge
              </a>
              <a 
                href="#" 
                className={`${currentPage === 'staking' ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                onClick={(e) => handleNavigation(e, 'staking')}
              >
                Validators
              </a>
              <a 
                href="#" 
                className={`${currentPage === 'my-delegations' ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                onClick={(e) => handleNavigation(e, 'my-delegations')}
              >
                My Delegations
              </a>
              <a 
                href="#" 
                className={`${currentPage === 'governance' ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                onClick={(e) => handleNavigation(e, 'governance')}
              >
                Governance
              </a>
              <a 
                href="#" 
                className={`${currentPage === 'profile' ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                onClick={(e) => handleNavigation(e, 'profile')}
              >
                Profile
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <NetworkSelector activeNetwork={activeNetwork} setActiveNetwork={setActiveNetwork} />
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              <Wallet size={18} />
              <span>Connected</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;