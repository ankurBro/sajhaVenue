'use client';
import React from 'react';

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700">About SajhaVenue</h1>
      <p className="mt-4 text-gray-700 leading-7">
        SajhaVenue is a demo-first MERN project that showcases a modern booking
        experience for events across Nepal. It features role-based flows for
        users, venue owners, and admins with a clean, accessible green UI.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="p-6 rounded-xl border border-green-200 bg-green-50">
          <h2 className="font-semibold text-green-800">Mission</h2>
          <p className="text-sm text-green-900/80 mt-2">
            Make venue discovery and booking simple, transparent, and fast.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-green-200 bg-green-50">
          <h2 className="font-semibold text-green-800">Tech Stack</h2>
          <p className="text-sm text-green-900/80 mt-2">
            Next.js App Router, Tailwind v4, React 19, Stripe (demo), and MongoDB.
          </p>
        </div>
      </div>
    </section>
  );
}
