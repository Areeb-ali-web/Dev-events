import dbConnect from './db';
import Event from '../models/Event';

const defaultEvents = [
  {
    title: 'React Hackathon 2026',
    slug: 'react-hackathon',
    location: 'Lahore, Pakistan',
    date: '12-06-2026',
    time: '10:00 AM',
    image: '/event1.png',
    description: 'Join the ultimate coding showdown in Lahore! Build cutting-edge applications using React, Next.js, and server-side components. Compete with top developers, learn from industry experts, and win exciting prizes.',
    agenda: [
      '10:00 AM - Registration & Welcome Coffee',
      '10:30 AM - Keynote: The Future of React & Next.js',
      '11:00 AM - Hackathon Theme Reveal & Team Formations',
      '11:30 AM - Coding Session Starts',
      '02:00 PM - Lunch & Mentorship Checkpoint',
      '06:00 PM - Final Code Submission',
      '06:30 PM - Project Demos & Judging',
      '07:30 PM - Closing Ceremony & Networking'
    ],
    capacity: 100,
    bookedSeats: 0
  },
  {
    title: 'AI & Machine Learning Meetup',
    slug: 'ai-ml-meetup',
    location: 'Islamabad, Pakistan',
    date: '18-06-2026',
    time: '2:00 PM',
    image: '/event2.png',
    description: 'Explore the latest advancements in Artificial Intelligence, Deep Learning, and Large Language Models. Network with fellow AI practitioners, researchers, and tech enthusiasts in the capital city.',
    agenda: [
      '02:00 PM - Networking & Refreshments',
      '02:30 PM - Talk 1: Deploying LLMs locally in Production',
      '03:15 PM - Talk 2: RAG Systems and Vector Databases',
      '04:00 PM - Panel Discussion: Ethical AI and Local Opportunities',
      '04:45 PM - Open Networking & Q&A'
    ],
    capacity: 75,
    bookedSeats: 0
  },
  {
    title: 'Frontend Developers Conference',
    slug: 'frontend-conf',
    location: 'Karachi, Pakistan',
    date: '25-06-2026',
    time: '9:00 AM',
    image: '/event3.png',
    description: "Karachi Frontend Dev Conference is Pakistan's premier conference for UI/UX engineers and frontend developers. Discover modern CSS architectures, performance optimizations, state management, and modern framework patterns.",
    agenda: [
      '09:00 AM - Check-in & Breakfast',
      '09:45 AM - Opening Remarks',
      '10:00 AM - Keynote: Master CSS Layouts with Tailwind v4',
      '11:00 AM - Performance Optimization in Modern Web Applications',
      '12:00 PM - Panel: State Management in 2026',
      '01:00 PM - Networking Lunch',
      '02:00 PM - Interactive Workshops: Accessibility (A11y) in React',
      '04:30 PM - Event Wrap-up & High Tea'
    ],
    capacity: 150,
    bookedSeats: 0
  },
  {
    title: 'Startup Networking Night',
    slug: 'startup-networking',
    location: 'Faisalabad, Pakistan',
    date: '30-06-2026',
    time: '6:00 PM',
    image: '/event4.png',
    description: 'An exclusive networking evening in Faisalabad for startup founders, tech builders, angel investors, and venture capitalists. Pitch your ideas, find co-founders, and build long-term business connections.',
    agenda: [
      '06:00 PM - Entry & Networking Mixer',
      '06:30 PM - Fire-side Chat with Successful Local Entrepreneurs',
      '07:15 PM - 1-Minute Pitch Session for Startups',
      '08:00 PM - Dinner & Open Networking'
    ],
    capacity: 50,
    bookedSeats: 0
  }
];

export async function seedDatabase() {
  await dbConnect();
  
  const count = await Event.countDocuments();
  if (count === 0) {
    console.log('Seeding database with default events...');
    await Event.insertMany(defaultEvents);
    console.log('Database seeded successfully.');
  }
}
