import React from 'react';

interface NetworkSelectorProps {
  activeNetwork: string;
  setActiveNetwork: (network: string) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ activeNetwork, setActiveNetwork }) => {
  const networks = [
    { id: 'helios', name: 'Helios', logo: '☀️' },
    { id: 'ethereum', name: 'Ethereum', logo: '⟠' },
    { id: 'bsc', name: 'BSC', logo: '🔶' },
    { id: 'polygon', name: 'Polygon', logo: '🔷' },
    { id: 'avax', name: 'AVAX', logo: '🔺' },
    { id: 'sonic', name: 'Sonic', logo: '🔊' },
  ];

  return (
    <div className="flex items-center space-x-2">
      {networks.map((network) => (
        <button
          key={network.id}
          className={`network-button ${activeNetwork === network.id ? 'active' : ''}`}
          onClick={() => setActiveNetwork(network.id)}
        >
          <span>{network.logo}</span>
          <span className="hidden md:inline">{network.name}</span>
        </button>
      ))}
    </div>
  );
};

export default NetworkSelector;