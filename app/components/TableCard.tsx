'use client';

import React from 'react';

export type TableStatus = 'EMPTY' | 'OCCUPIED' | 'SENT_TO_KITCHEN' | 'WAITING_PAYMENT';

interface TableCardProps {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
}

const TableCard: React.FC<TableCardProps> = ({ id, number, seats, status }) => {
  const getStatusStyles = (status: TableStatus) => {
    switch (status) {
      case 'EMPTY':
        return 'bg-[#004966] text-[#8FD5FF]'; // Success/Green according to DESIGN.md dark mode
      case 'OCCUPIED':
        return 'bg-[#62400F] text-[#FFC174]'; // Pending/Amber
      case 'SENT_TO_KITCHEN':
        return 'bg-[#004966] text-[#8FD5FF]'; // Info/Blue
      case 'WAITING_PAYMENT':
        return 'bg-[#93000A] text-[#FFB4AB]'; // Error/Red
      default:
        return 'bg-surface-container text-on-surface';
    }
  };

  const getStatusLabel = (status: TableStatus) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <div 
      onClick={() => console.log(`tableId: ${id}`)}
      className="bg-surface-container-low p-6 rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-surface-bright transition-colors duration-200 border border-transparent hover:border-primary/20 aspect-square text-center"
    >
      <div className="text-headline-md font-bold text-primary font-headline">
        T-{number}
      </div>
      <div className="text-body-md text-on-surface-variant font-body">
        {seats} {seats === 1 ? 'Seat' : 'Seats'}
      </div>
      <div className={`px-3 py-1 rounded-full text-label-sm font-medium uppercase tracking-wider ${getStatusStyles(status)}`}>
        {getStatusLabel(status)}
      </div>
    </div>
  );
};

export default TableCard;
