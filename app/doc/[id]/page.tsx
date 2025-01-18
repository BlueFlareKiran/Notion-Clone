'use client';
import React from 'react';
import Document from '@/components/Document';
export default function DocumentPage({
  params: promiseParams,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap `params` using React.use
  const { id } = React.use(promiseParams);
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}