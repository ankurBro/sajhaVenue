'use client'
import VenueCard from '@/app/components/VenueCard/VenueCard.jsx';

const venues = [
  {
    id: 'baneshwor-banquet',
    name: 'Baneshwor Banquet',
    location: 'New Baneshwor, Kathmandu',
    capacity: 300,
    price: 'Rs. 50,000/day',
    image: '/baneshwor-banquet.png',
  },
  {
    id: 'heritage-hall',
    name: 'Heritage Hall',
    location: 'Patan, Lalitpur',
    capacity: 500,
    price: 'Rs. 80,000/day',
    image: '/heritage-hall.webp',
  },
  {
    id: 'royal-palace',
    name: 'Royal Palace Banquet',
    location: 'Pokhara Lakeside',
    capacity: 400,
    price: 'Rs. 70,000/day',
    image: '/royal-palace.jpg',
  },
];

export default function VenuesPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
        Explore Venues
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard key={venue.id} {...venue} />
        ))}
      </div>
    </section>
  );
}
