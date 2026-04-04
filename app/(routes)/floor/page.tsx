import React from 'react';
import SessionHealthBar from '@/app/components/SessionHealthBar';
import TableCard, { TableStatus } from '@/app/components/TableCard';

interface Table {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
}

const STATIC_TABLES: Table[] = [
  { id: '1', number: 1, seats: 2, status: 'EMPTY' },
  { id: '2', number: 2, seats: 4, status: 'OCCUPIED' },
  { id: '3', number: 3, seats: 2, status: 'SENT_TO_KITCHEN' },
  { id: '4', number: 4, seats: 6, status: 'WAITING_PAYMENT' },
  { id: '5', number: 5, seats: 4, status: 'EMPTY' },
  { id: '6', number: 6, seats: 2, status: 'OCCUPIED' },
];

export default function FloorPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-background">
      <header className="mb-8">
        <h1 className="text-display-md font-bold text-primary font-headline mb-2">Floor View</h1>
        <p className="text-body-md text-on-surface-variant font-body">Manage table status and orders across the dining area.</p>
      </header>

      <SessionHealthBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {STATIC_TABLES.map((table) => (
          <TableCard
            key={table.id}
            id={table.id}
            number={table.number}
            seats={table.seats}
            status={table.status}
          />
        ))}
      </div>
    </div>
  );
}
