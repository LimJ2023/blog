import { Link } from "react-router-dom";
const EVENTS = [
    {
        id: "e1",
        title: "event1",
    },
    {
        id: "e2",
        title: "event2",
    },
];
function _EventPage() {
    return (
        <>
            <h1>EventsPage</h1>
            <ul>
                {EVENTS.map((e) => (
                    <li key={e.id}>
                        <Link to={e.id}>{e.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default _EventPage;
