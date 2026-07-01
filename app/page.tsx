import React from 'react';
import EventCard from "@/app/components/EventCard";
import Explorebtn from "@/app/components/Explorebtn";
import dbConnect from '@/lib/db';
import Event, { IEvent } from '@/models/Event';
import { seedDatabase } from '@/lib/seed';
import './globals.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Connect to DB and seed default events if none exist
  await dbConnect();
  await seedDatabase();

  // Fetch all events from DB
  const events = (await Event.find({}).sort({ date: 1 })) as IEvent[];

  return (
    <div>
      <h1 className="text-center">Hub for every event <br/>You miss</h1>
      <p className="text-center mt-5 subheading">Hackathons, Meetups and Conferences, All in one place</p>
      <Explorebtn/>

      <div className='mt-20 space-y-7' id="events">
        <h1>Featured Events</h1>
        <ul className='events list-none'>
          {events.map((event) => (
            <li key={event.slug}>
              <EventCard 
                title={event.title} 
                image={event.image} 
                date={event.date} 
                time={event.time}  
                slug={event.slug} 
                location={event.location} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
