'use client';
import React from 'react';

export default function BlogPage() {
  const posts = [
    {
      id: 'green-ui',
      title: 'Designing a Green UI for Trust',
      excerpt:
        'How color, spacing, and motion create a calm and credible booking flow.',
    },
    {
      id: 'role-based-flows',
      title: 'Role-Based Flows: User, Owner, Admin',
      excerpt:
        'Structuring features and navigation so each persona gets the right tools.',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700">Blog</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <article key={p.id} className="p-6 border rounded-xl hover:shadow transition">
            <h2 className="text-xl font-semibold text-gray-900">{p.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
