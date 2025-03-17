import React from 'react';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {message}
      <button 
        className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  );
};

export default ErrorAlert;