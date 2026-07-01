'use client';

import React, { useState } from 'react';

interface Props {
  slug: string;
  initialBookedSeats: number;
  capacity: number;
}

export default function BookingForm({ slug, initialBookedSeats, capacity }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookedSeats, setBookedSeats] = useState(initialBookedSeats);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(`/api/events/${slug}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage(data.message || 'Seat booked successfully!');
      if (data.event) {
        setBookedSeats(data.event.bookedSeats);
      }
      setName('');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const isFull = bookedSeats >= capacity;

  return (
    <div className="signup-card">
      <h3 className="text-xl font-semibold mb-2">Book Your Spot</h3>
      
      <div className="flex flex-col gap-2 text-sm text-light-200 mb-4">
        <div className="flex justify-between">
          <span>Capacity:</span>
          <span className="font-semibold text-white">{capacity}</span>
        </div>
        <div className="flex justify-between">
          <span>Seats Booked:</span>
          <span className="font-semibold text-white">{bookedSeats}</span>
        </div>
        <div className="flex justify-between">
          <span>Seats Available:</span>
          <span className="font-semibold text-primary">
            {Math.max(0, capacity - bookedSeats)}
          </span>
        </div>
      </div>

      <div id="book-event">
        {isFull ? (
          <div className="text-center text-red-400 font-semibold py-4 border border-red-500/20 rounded-[6px] bg-red-950/20">
            This event is fully booked!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Booking...' : 'Register Now'}
            </button>
          </form>
        )}
      </div>

      {message && (
        <div className="mt-4 p-3 bg-green-950/20 border border-green-500/30 text-green-400 rounded-[6px] text-sm text-center">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-950/20 border border-red-500/30 text-red-400 rounded-[6px] text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
