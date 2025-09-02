'use client';
import React from 'react';
import Link from 'next/link';

function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        src="/venueBgVideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 max-w-3xl px-6 text-center text-white">
        <p className="text-lg md:text-xl font-medium text-green-300">
          Nepal&apos;s No.1 Platform for Booking Venues
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
          Crafting Unforgettable Moments, the Nepali Way
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-200">
          From weddings to corporate events — find and book the perfect venue
          across Nepal with ease.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/venues"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Explore Venues
          </Link>
          <Link
            href="/about"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
