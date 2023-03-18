import React, { useState, useEffect } from 'react';

const EventsList = (eventName) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/coming-events/`)
      .then(response => response.json())
      .then(data => setEvents(data));
  }, [eventName]);

  return (
    <div className='text-white'>
      <h2>Ateinantys renginiai</h2>
      <ul className='list-unstyled text-center'>
        {events.map(event => (
          <li key={event.id}>
            <h3><a className='text-decoration-none' href={`/event/${event.id}`}>{event.name}</a></h3>
            <p>Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;