'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/app/components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: { name: '', email: '', role: 'user' },
  });
  const { errors } = formState;
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = (data) => {
    // In demo, signup just logs you in with chosen role
    login({ email: data.email, name: data.name, role: data.role });
    router.push('/dashboard');
  };

  const role = watch('role');

  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-green-700">Create your account</h1>
      <p className="text-sm text-gray-600 mt-2">Choose a role to explore features</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Sita Rai"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="you@example.com"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {['user', 'owner', 'admin'].map((r) => (
              <label key={r} className={`cursor-pointer border rounded-lg px-3 py-2 text-center ${role === r ? 'bg-green-600 text-white border-green-600' : 'hover:bg-green-50'}`}>
                <input type="radio" value={r} className="hidden" {...register('role')} />
                {r.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium"
        >
          Create account
        </button>

        <p className="text-sm text-gray-600 text-center">
          Already have an account? <a href="/login" className="text-green-700 underline">Login</a>
        </p>
      </form>
    </section>
  );
}
