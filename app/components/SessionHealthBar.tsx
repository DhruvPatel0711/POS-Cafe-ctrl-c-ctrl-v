import React from 'react';

const SessionHealthBar = () => {
  return (
    <div className="bg-surface-container-low p-4 xl:p-6 rounded-xl flex items-center justify-between mb-6 shadow-sm">
      <div className="flex flex-col">
        <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-body">Revenue</span>
        <span className="text-headline-lg font-bold text-primary font-headline">$0</span>
      </div>
      <div className="flex flex-col text-center">
        <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-body">Orders</span>
        <span className="text-headline-lg font-bold text-primary font-headline">0</span>
      </div>
      <div className="flex flex-col text-end">
        <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-body">Avg</span>
        <span className="text-headline-lg font-bold text-primary font-headline">$0</span>
      </div>
    </div>
  );
};

export default SessionHealthBar;
