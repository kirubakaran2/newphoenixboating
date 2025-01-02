import React from 'react';
import clsx from 'clsx';
import type { PaymentStatus } from './types';

interface PaymentStatusBadgeProps {
  status: keyof PaymentStatus;
}

const statusStyles = {
  PAID: 'bg-green-100 text-green-800',
  UNPAID: 'bg-yellow-100 text-yellow-800',
};

export default function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return (
    <span
      className={clsx(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        statusStyles[status]
      )}
    >
      {status.toLowerCase()}
    </span>
  );
}