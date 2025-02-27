import React from 'react';
import { X } from 'lucide-react';

interface QRCodeModalProps {
  address: string;
  asset: string;
  network: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ address, asset, network, onClose }) => {
  // Generate QR code URL using a public QR code API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`;
  
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
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Deposit QR Code</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="bg-white p-4 rounded-lg mb-4">
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
          </div>
          
          <div className="text-center mb-4">
            <p className="text-sm text-gray-300 mb-1">Scan this QR code to deposit</p>
            <p className="font-medium">{asset} on {getNetworkName(network)}</p>
          </div>
          
          <div className="w-full bg-slate-700 p-3 rounded-lg break-all text-center">
            <p className="text-xs text-gray-400 mb-1">Deposit Address</p>
            <p className="font-mono text-sm">{address}</p>
          </div>
        </div>
        
        <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3 mb-4">
          <p className="text-sm text-yellow-300">
            Important: Only send {asset} on the {getNetworkName(network)} network to this address. 
            Sending any other asset may result in permanent loss.
          </p>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;