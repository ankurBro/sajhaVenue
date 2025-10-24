'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function loadBooking(bookingId) {
  try {
    const raw = localStorage.getItem('sajhavenue_bookings');
    const list = raw ? JSON.parse(raw) : [];
    return list.find((b) => b.id === bookingId);
  } catch {
    return undefined;
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();
  const bookingId = params.get('bookingId');
  const [status, setStatus] = useState('idle');

  const booking = useMemo(() => (bookingId ? loadBooking(bookingId) : undefined), [bookingId]);

  useEffect(() => {
    if (!bookingId || !booking) return;
    // simulate stripe redirect and return
    const timer = setTimeout(() => {
      try {
        const raw = localStorage.getItem('sajhavenue_bookings');
        const list = raw ? JSON.parse(raw) : [];
        const idx = list.findIndex((b) => b.id === bookingId);
        if (idx !== -1) {
          list[idx].status = 'completed';
          localStorage.setItem('sajhavenue_bookings', JSON.stringify(list));
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [bookingId, booking]);

  if (!booking) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-gray-700">No booking found.</p>
        <Link href="/venues" className="text-green-700 underline">Back to venues</Link>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-green-700">Payment</h1>
      <p className="text-sm text-gray-700 mt-1">Booking for {booking.venueName}</p>
      <div className="mt-4 p-4 border rounded-xl">
        <p>Date: <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span></p>
        <p>Guests: <span className="font-medium">{booking.guests}</span></p>
        <p>Amount: <span className="font-medium">Rs. {booking.price.toLocaleString()}</span></p>
      </div>
      <div className="mt-6">
        {status === 'idle' && (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg" disabled>
            Redirecting to Stripe...
          </button>
        )}
        {status === 'success' && (
          <div className="p-4 border rounded-xl bg-green-50 border-green-200">
            <p className="text-green-800">Payment successful! Your booking is confirmed.</p>
            <div className="mt-3 flex gap-3">
              <Link href="/dashboard" className="bg-green-600 text-white px-4 py-2 rounded-lg">Go to Dashboard</Link>
              <Link href="/venues" className="border border-green-600 text-green-700 px-4 py-2 rounded-lg">Book another</Link>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 border rounded-xl bg-red-50 border-red-200">
            <p className="text-red-800">Payment failed. Please try again.</p>
          </div>
        )}
      </div>
    </section>
  );
}
