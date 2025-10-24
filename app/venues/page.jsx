'use client'
import React, { useMemo, useState } from 'react';
import VenueCard from '@/app/components/VenueCard/VenueCard.jsx';

const VENUES = [
  { id: 'baneshwor-banquet', name: 'Baneshwor Banquet', location: 'New Baneshwor, Kathmandu', capacity: 300, price: 50000, image: '/baneshwor-banquet.png' },
  { id: 'heritage-hall', name: 'Heritage Hall', location: 'Patan, Lalitpur', capacity: 500, price: 80000, image: '/heritage-hall.webp' },
  { id: 'royal-palace', name: 'Royal Palace Banquet', location: 'Pokhara Lakeside', capacity: 400, price: 70000, image: '/royal-palace.jpg' },
];

export default function VenuesPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minCapacity, setMinCapacity] = useState('');

  const filtered = useMemo(() => {
    return VENUES.filter(v => {
      const q = query.trim().toLowerCase();
      const matchQuery = q ? (v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q)) : true;
      const matchLoc = location ? v.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchPrice = maxPrice ? v.price <= Number(maxPrice) : true;
      const matchCap = minCapacity ? v.capacity >= Number(minCapacity) : true;
      return matchQuery && matchLoc && matchPrice && matchCap;
    });
  }, [query, location, maxPrice, minCapacity]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Explore Venues</h2>

      <div className="mb-8 grid gap-3 md:grid-cols-4">
        <input
          placeholder="Search name or location"
          className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          placeholder="Filter by location"
          className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price (per day)"
          className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min capacity"
          className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={minCapacity}
          onChange={(e) => setMinCapacity(e.target.value)}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((venue) => (
          <VenueCard key={venue.id} {...venue} price={`Rs. ${venue.price.toLocaleString()}/day`} />
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-600">No venues match your filters.</p>
        )}
      </div>
    </section>
  );
}
