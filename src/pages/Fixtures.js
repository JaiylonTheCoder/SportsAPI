import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'; // Import your custom CSS file

import { Link } from 'react-router-dom';
const App = () => {
    const [league, setLeague] = useState('39');
    const [fixtureData, setFixtureData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/fixtures', {
                    params: { league },
                });
                setFixtureData(response.data.response)
                // const data = await response.json();
                console.log(response.data);
            } catch (error) {
                console.error("See error " + error);
            }
        };

        fetchData();
    }, [league]);
    // Function to handle the league select change event
    const handleLeagueChange = (event) => {
        setLeague(event.target.value); // Update the league parameter based on the selected value
    };
    return (
        <div className="container">
            <div>
                {/* Your league select dropdown */}
                <select value={league} onChange={handleLeagueChange}>
                    <option value="40">Championship</option>
                    <option value="39">Premier League</option>
                    <option value="41">League 1</option>
                </select>
            </div>
            <h2>Fixtures</h2>
            <div className="row">
                {fixtureData.map((fixture) => (
                    <div className="col-md-6" key={fixture.fixture.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-4 text-center">
                                        <img
                                            className="team-logo"
                                            src={fixture.teams.home.logo}
                                            alt={fixture.teams.home.name}
                                        />
                                        <p>{fixture.teams.home.name}</p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <p className="score">
                                            {fixture.goals.home} - {fixture.goals.away}
                                        </p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <img
                                            className="team-logo"
                                            src={fixture.teams.away.logo}
                                            alt={fixture.teams.away.name}
                                        />
                                        <p>{fixture.teams.away.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <Link to={`/fixture/${fixture.fixture.id}/lineups`}>View Lineups</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
