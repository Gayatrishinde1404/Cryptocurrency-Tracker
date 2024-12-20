import React from 'react';
import facebookIcon from './assets/facebook-fill.svg';

const App = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <h1 className="text-center text-3xl font-bold text-gray-800">My App</h1>
      <img
        className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        src={facebookIcon}
        alt="Facebook Icon"
      />
    </div>
  );
};

export default App;