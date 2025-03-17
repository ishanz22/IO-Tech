import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-center py-4 mt-auto">
      <div className="container mx-auto">
        <p>React TypeScript Item Manager App - {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;