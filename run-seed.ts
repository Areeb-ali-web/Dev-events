import fs from 'fs';
import path from 'path';

// 1. Manually load environment variables from .env.local
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const parts = trimmedLine.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join('=').trim();
          if (key) {
            process.env[key] = value;
          }
        }
      }
    });
  }
} catch (error) {
  console.error('Error loading env file:', error);
}

// 2. Dynamically import modules after env vars are loaded to prevent import hoisting
async function run() {
  const { default: dbConnect } = await import('@/lib/db');
  const { default: Event } = await import('@/models/Event');
  const mongoose = await import('mongoose');

  console.log('Connecting to database...');
  await dbConnect();
  
  const count = await Event.countDocuments();
  console.log(`Database connection active. Found ${count} events:`);
  
  const events = await Event.find({}, 'title slug location');
  events.forEach((event) => {
    console.log(` - ${event.title} [slug: ${event.slug}] (${event.location})`);
  });
  
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Failed to run seed verification:', err);
  process.exit(1);
});
