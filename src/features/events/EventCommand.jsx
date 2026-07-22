import EventCard from "./EventCard.jsx";
import { events } from "./eventData.js";

export default function EventCommand() {
  return (
    <section>
      <span className="ccd-kicker">
        Mission Command
      </span>
      <h2>
        Conference Intelligence Center
      </h2>
      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
}
