import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Lineups = () => {
    const { fixtureId } = useParams();
    const [lineups, setLineups] = useState(null);

    useEffect(() => {
        const fetchLineups = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/lineups/${fixtureId}`);
                setLineups(response.data.response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLineups();
    }, [fixtureId]);

    if (!lineups) {
        return <p>Loading lineups...</p>;
    }

    return (
        <div>
            <h2>Lineups for Fixture {fixtureId}</h2>
            {/* Display the lineups data */}
        </div>
    );
};

export default Lineups;
