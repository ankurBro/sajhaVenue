'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/app/components/AuthProvider';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-20"
        aria-label="Main navigation"
      >
    {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-green-600 font-medium">
          <li>
            <Link href="/venues" className="hover:text-green-800 transition-colors">
              Venue
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="hover:text-green-800 transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-green-800 transition-colors"
            >
              About
            </Link>
          </li>
        </ul>
  

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/SVlOGO.png" // ✅ use public folder path
            alt="SajHavenue logo"
            width={80}
            height={60}
            priority
          />
          <span className="sr-only">SajHavenue</span>
        </Link>

       

        {/* Actions */}
        <div className="hidden md:flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded">
                {role?.toUpperCase()}
              </span>
              <Link
                href="/dashboard"
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg transition"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-green-700"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <ul className="flex flex-col items-center py-6 space-y-4 text-green-700 font-medium">
            <li>
              <Link href="/venues" onClick={() => setIsOpen(false)}>
                Venue
              </Link>
            </li>
            <li>
              <Link href="/blog" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li className="flex gap-3 mt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
