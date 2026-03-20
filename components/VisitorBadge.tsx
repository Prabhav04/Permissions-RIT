"use client";

import { Eye } from 'lucide-react';
import { useVisitorCounter } from '@/hooks/useVisitorCounter';

export default function VisitorBadge() {
  const { count } = useVisitorCounter();

  return (
    <div
      className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 select-none"
      title="Total visitors since launch"
    >
      <Eye size={12} className="text-rit-primary" />
      {count === null ? (
        // Loading skeleton
        <span className="w-10 h-3 bg-gray-200 animate-pulse rounded-full inline-block" />
      ) : (
        <span>
          {count.toLocaleString()} {count === 1 ? 'visitor' : 'visitors'}
        </span>
      )}
    </div>
  );
}
