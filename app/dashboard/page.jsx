'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import Link from 'next/link';

function Section({ title, children }) {
  return (
    <section className="p-4 rounded-xl border bg-white/60">
      <h2 className="text-lg font-semibold text-green-700">{title}</h2>
      <div className="mt-2 text-sm text-gray-700">{children}</div>
    </section>
  );
}

export default function DashboardPage() {
  const { isAuthenticated, role, user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sajhavenue_bookings');
      setBookings(raw ? JSON.parse(raw) : []);
    } catch {
      setBookings([]);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-green-700">Please log in</h1>
        <p className="mt-2 text-gray-700">You need to be authenticated to view the dashboard.</p>
        <div className="mt-6 flex gap-3">
          <Link className="bg-green-600 text-white px-4 py-2 rounded-lg" href="/login">Login</Link>
          <Link className="border border-green-600 text-green-700 px-4 py-2 rounded-lg" href="/signup">Signup</Link>
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
      <p className="text-sm text-gray-600">Welcome, {user?.name || user?.email} — role: <span className="font-medium">{role}</span></p>

      {role === 'user' && (
        <div className="grid md:grid-cols-2 gap-4">
          <Section title="Your Bookings">
            {bookings.length === 0 ? (
              <p>No bookings yet. Browse <Link href="/venues" className="text-green-700 underline">venues</Link>.</p>
            ) : (
              <ul className="space-y-2">
                {bookings.map((b) => (
                  <li key={b.id} className="flex justify-between items-center p-3 rounded border">
                    <div>
                      <p className="font-medium">{b.venueName}</p>
                      <p className="text-xs text-gray-600">{new Date(b.date).toLocaleDateString()} · Rs. {b.price.toLocaleString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${b.status === 'completed' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {b.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Section>
          <Section title="Profile">
            <p>View and update your profile (coming soon).</p>
          </Section>
        </div>
      )}

      {role === 'owner' && (
        <div className="grid md:grid-cols-2 gap-4">
          <Section title="Your Venues">
            <p>Add, update, or remove venue listings (coming soon).</p>
          </Section>
          <Section title="Recent Bookings">
            <p>See booking requests for your venues (coming soon).</p>
          </Section>
        </div>
      )}

      {role === 'admin' && (
        <div className="grid md:grid-cols-3 gap-4">
          <Section title="Users">
            <p>Manage users (coming soon).</p>
          </Section>
          <Section title="Owners">
            <p>Manage venue owners (coming soon).</p>
          </Section>
          <Section title="Reports">
            <p>Platform metrics and reports (coming soon).</p>
          </Section>
        </div>
      )}
    </div>
  );
}
