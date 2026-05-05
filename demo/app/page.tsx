import React from 'react'
import EventCard  from "./components/EventCard"
import Explorebtn from "./components/Explorebtn";
import event1image from "../images/event1.png"
import event2image from "../images/event2.png"
import event3image from "../images/event3.png"
import event4image from "../images/event4.png"

const events = [
    {
        image: event1image,
        title: 'React Hackathon 2026',
        slug: 'react-hackathon',
        location: 'Lahore, Pakistan',
        date: '12-06-2026',
        time: '10:00 AM'
    },
    {
        image: event2image,
        title: 'AI & Machine Learning Meetup',
        slug: 'ai-ml-meetup',
        location: 'Islamabad, Pakistan',
        date: '18-06-2026',
        time: '2:00 PM'
    },
    {
        image: event3image,
        title: 'Frontend Developers Conference',
        slug: 'frontend-conf',
        location: 'Karachi, Pakistan',
        date: '25-06-2026',
        time: '9:00 AM'
    },
    {
        image: event4image,
        title: 'Startup Networking Night',
        slug: 'startup-networking',
        location: 'Faisalabad, Pakistan',
        date: '30-06-2026',
        time: '6:00 PM'
    }
];
export default function Home() {
  return (<div>

    <h1 className="text-center">Hub for every event <br/>You can't miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups and Conferences, All in one place</p>
          <Explorebtn/>

          <div className='mt-20 space-y-7'>
              <h1>Featured Events</h1>
              <ul className='events list-none'>
                  {events.map((event) => (<li key={event.title} ><EventCard {...event}/>
                  </li>))}

              </ul>

          </div>
</div>
  );
}
