import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`http://localhost:8000/api/event-user/${id}/`);
      const data = await response.json();
      setEvents(data);
    }
    fetchEvents();
  }, [id]);

  return (
    <div className='text-white text-center pt-5 mt-5'>
      <h2 className='pb-2'>Informacija apie renginį</h2>
      {events.map(event => (
        <div key={event.id}>
          <h4>{event.name}</h4>
          <p>Data: {event.date}</p>
          <p>Aprašymas: {event.description}</p>
          <p>Vieta: {event.place}</p>
          <p>Dalyviai: {event.participant_name}</p>
          <p>Sukūrė id: {event.user_id}</p>
        </div>
      ))}
    </div>
  );
}


export default EventDetails;