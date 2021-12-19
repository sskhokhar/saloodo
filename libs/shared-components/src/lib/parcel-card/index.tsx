import React from 'react';
import { UserIcon, TrashIcon } from '@heroicons/react/solid';
import dateFormat from 'dateformat';
interface ParcelCardProps {
  consigneeName?: string;
  currentStatus?: string;
  from?: string;
  to?: string;
  showDelete?: boolean;
  showStatusTable?: boolean;
  onDelete?: () => void;
  statuses?: { name: string; date: string }[];
}

const getStatusElement = (status: string) => {
  switch (status) {
    case 'Created':
      return (
        <span className="border border-yellow-600 p-1 rounded text-sm text-yellow-600">
          Pending
        </span>
      );
    case 'Picked':
      return (
        <span className="border border-blue-600 p-1 rounded text-sm text-blue-600">
          Picked Up
        </span>
      );
    case 'Delivered':
      return (
        <span className="border border-green-600 p-1 rounded text-sm text-green-600">
          Delivered
        </span>
      );
    default:
      break;
  }
};

export function ParcelCard({
  onDelete,
  consigneeName,
  from,
  showDelete,
  currentStatus,
  to,
  showStatusTable,
  statuses,
}: ParcelCardProps) {
  return (
    <div className="bg-white p-3 rounded-md w-full shadow">
      <div className="flex justify-between">
        <div className="flex items-center">
          <UserIcon className="h-5 w-5 text-indigo-600" />
          <span className="ml-2 block text-indigo-600">{consigneeName}</span>
        </div>
        <div className="flex items-center">
          {getStatusElement(currentStatus as string)}
          {showDelete && (
            <button
              onClick={onDelete}
              className="ml-3 focus:outline-none outline-none"
            >
              <TrashIcon className="h-6 w-6 text-red-600" />
            </button>
          )}
        </div>
      </div>
      {showStatusTable && (
        <table className="table-auto w-full border-t mt-3">
          <thead>
            <tr>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {statuses?.map((status, index) => (
              <tr key={status.name + index}>
                <td className="border px-4 py-2">Parcel {status.name}</td>
                <td className="border px-4 py-2">
                  {dateFormat(
                    new Date(status.date),
                    'dddd, mmmm dS, yyyy, h:MM:ss TT'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="border-t mt-3 border-gray-100">
        <div className="flex justify-between mt-2">
          <div className="w-1/2">
            <span className="font-medium text-gray-700">&raquo; From:</span>
            <span className="ml-2 text-gray-700 text-sm">{from}</span>
          </div>
          <div className="w-1/2">
            <span className="font-medium text-gray-700">&raquo; To:</span>
            <span className="ml-2 text-gray-700 text-sm">{to}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
