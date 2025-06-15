import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  const footerNavigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Headphones', href: '/products?category=headphones' },
      { name: 'Speakers', href: '/products?category=speakers' },
      { name: 'Earphones', href: '/products?category=earphones' },
    ],
    support: [
      { name: 'Contact', href: '/contact' },
      { name: 'Support', href: '/support' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-wide text-white">
              audiophile
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Audiophile is an all in one stop to fulfill your audio needs. We&apos;re a small team of music lovers 
              and sound specialists who are devoted to helping you get the most out of personal audio.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">Shop</h3>
            <ul className="mt-4 space-y-2">
              {footerNavigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerNavigation.legal.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

