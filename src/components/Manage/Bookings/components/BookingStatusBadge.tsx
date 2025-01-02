import React from 'react';
import clsx from 'clsx';
import type { BookingStatus } from '../../../types';

interface BookingStatusBadgeProps {
  status: keyof BookingStatus;
}

const statusStyles = {
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
};

export default function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
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