"use client"

import AdminModeration from '@/components/AdminModeration';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 p-6">
        <AdminModeration />
      </main>
    </div>
  );
}
