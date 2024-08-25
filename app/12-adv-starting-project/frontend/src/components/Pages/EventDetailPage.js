import { useParams } from "react-router-dom";

function EventDetailPage() {
    const param = useParams();
    return (
        <>
            <h1>EventDetailPage</h1>
            <p>{param.id}</p>
        </>
    );
}

export default EventDetailPage;
