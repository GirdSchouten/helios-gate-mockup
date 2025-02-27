import React from 'react';

interface NotificationBarProps {
  message: string;
  type: 'governance' | 'transaction' | 'system';
}

const NotificationBar: React.FC<NotificationBarProps> = ({ message, type }) => {
  const getBgColor = () => {
    switch (type) {
      case 'governance':
        return 'bg-gradient-to-r from-orange-600 to-orange-500';
      case 'transaction':
        return 'bg-gradient-to-r from-green-600 to-green-500';
      case 'system':
        return 'bg-gradient-to-r from-blue-600 to-blue-500';
      default:
        return 'bg-gradient-to-r from-blue-600 to-blue-500';
    }
  };

  return (
    <div className={`${getBgColor()} text-white py-2 px-4 text-center font-medium`}>
      {message}
    </div>
  );
};

export default NotificationBar;