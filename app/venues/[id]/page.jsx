'use client';
import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import { format } from 'date-fns';

const VENUES = [
  { id: 'baneshwor-banquet', name: 'Baneshwor Banquet', location: 'New Baneshwor, Kathmandu', capacity: 300, price: 50000, image: '/baneshwor-banquet.png' },
  { id: 'heritage-hall', name: 'Heritage Hall', location: 'Patan, Lalitpur', capacity: 500, price: 80000, image: '/heritage-hall.webp' },
  { id: 'royal-palace', name: 'Royal Palace Banquet', location: 'Pokhara Lakeside', capacity: 400, price: 70000, image: '/royal-palace.jpg' },
];

export default function VenueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const venue = useMemo(() => VENUES.find(v => v.id === params?.id), [params?.id]);

  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');

  if (!venue) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-700">Venue not found.</p>
        <Link href="/venues" className="text-green-700 underline">Back to venues</Link>
      </section>
    );
  }

  const handleBook = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    // Demo booking flow: save draft booking to localStorage
    const booking = {
      id: 'demo-' + Date.now(),
      venueId: venue.id,
      venueName: venue.name,
      date,
      guests: Number(guests || 0),
      price: venue.price,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem('sajhavenue_bookings');
      const list = raw ? JSON.parse(raw) : [];
      list.push(booking);
      localStorage.setItem('sajhavenue_bookings', JSON.stringify(list));
    } catch {}
    router.push(`/payment?bookingId=${booking.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-80 w-full rounded-xl overflow-hidden">
          <Image src={venue.image} alt={venue.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{venue.name}</h1>
          <p className="mt-1 text-green-700">Rs. {venue.price.toLocaleString()}/day</p>
          <p className="mt-1 text-gray-600">{venue.location}</p>
          <p className="mt-1 text-gray-600">Capacity: {venue.capacity}</p>

          <div id="booking" className="mt-6 p-4 border rounded-xl bg-white/70">
            <h2 className="text-lg font-semibold text-green-700">Book this venue</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700">Event date</label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Guests</label>
                <input
                  type="number"
                  min={1}
                  className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>
            <button
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg"
              onClick={handleBook}
              disabled={!date || !guests}
            >
              {isAuthenticated ? 'Proceed to Payment' : 'Login to Book'}
            </button>
            {date && (
              <p className="mt-2 text-sm text-gray-600">Selected: {format(new Date(date), 'PPP')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
