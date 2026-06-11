import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h2 className="font-serif text-3xl uppercase tracking-widest text-neutral-800 mb-4">404 - Page Not Found</h2>
      <p className="text-sm text-neutral-500 max-w-sm mb-6 font-light">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="font-sans text-xs font-bold tracking-widest uppercase border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors cursor-pointer inline-block no-underline text-black">
        Back To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
