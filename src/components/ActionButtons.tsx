import React from 'react';
import { ArrowDown, ArrowUp, CoinsIcon, Vote } from 'lucide-react';

interface ActionButtonsProps {
  onDeposit: () => void;
  onNavigate?: (page: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDeposit, onNavigate }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button 
        className="action-button action-button-deposit"
        onClick={onDeposit}
      >
        <ArrowDown size={18} />
        <span>Deposit</span>
      </button>
      <button 
        className="action-button action-button-withdraw"
        onClick={() => onNavigate && onNavigate('bridge')}
      >
        <ArrowUp size={18} />
        <span>Withdraw</span>
      </button>
      <button 
        className="action-button action-button-stake"
        onClick={() => onNavigate && onNavigate('my-delegations')}
      >
        <CoinsIcon size={18} />
        <span>My Delegations</span>
      </button>
      <button 
        className="action-button action-button-vote"
        onClick={() => onNavigate && onNavigate('governance')}
      >
        <Vote size={18} />
        <span>Vote</span>
      </button>
    </div>
  );
};

export default ActionButtons;