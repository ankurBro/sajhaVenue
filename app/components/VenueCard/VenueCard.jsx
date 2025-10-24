'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/components/AuthProvider';

const VenueCard = ({ id, name, location, capacity, price, image }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
      {/* Clickable image/title */}
      <Link href={`/venues/${id}`} className="block relative h-56 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          <Link href={`/venues/${id}`}>{name}</Link>
        </h3>
        <p className="text-sm text-gray-500">{location}</p>

        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>Capacity: {capacity}</span>
          <span className="font-medium text-green-600">{price}</span>
        </div>

        {/* Book Now */}
        <Link
          href={isAuthenticated ? `/venues/${id}#booking` : '/login'}
          className="mt-4 block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          {isAuthenticated ? 'Book Now' : 'Login to Book'}
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;
