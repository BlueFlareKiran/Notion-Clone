'use client';
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function SidebarOption({
  href,
  id,
}: {
  href: string;
  id: string;
}) {
  const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
  const pathname = usePathname();

  const isActive = href && pathname && href.includes(pathname) && pathname !== '/';

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    console.error('Error fetching document data:', error);
    return <p className="text-red-500">Failed to load document</p>;
  }

  if (!data) {
    console.warn('Document not found for ID:', id);
    return <p className="text-gray-500">Document not found</p>;
  }

  return (
    <Link
      href={href}
      className={`block w-full text-left border p-2 rounded-md ${
        isActive ? 'bg-gray-300 font-bold border-black' : 'border-gray-400'
      }`}
    >
      <p className="truncate">{data.title || 'Untitled Document'}</p>
    </Link>
  );
}
