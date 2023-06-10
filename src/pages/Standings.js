import React, { useState, useEffect } from 'react';
import axios from 'axios'
const Standings = () => {
    const [league, setLeague] = useState('39');
    const [standings, setStandings] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/standings', {
                    params: { league },
                });
                setStandings(response.data.response[0].league.standings);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [league]);
    // Function to handle the league select change event
    const handleLeagueChange = (event) => {
        setLeague(event.target.value); // Update the league parameter based on the selected value
    };
    return (
        <div className='container'>
            <div>
                {/* Your league select dropdown */}
                <select value={league} onChange={handleLeagueChange}>
                    <option value="40">Championship</option>
                    <option value="39">Premier League</option>
                    <option value="41">League 1</option>
                </select>
            </div>
            {standings ? (
                <div>
                    {standings.map((standing, index) => (
                        <div key={index}>
                            <h2>{standing[0].group}</h2>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Team</th>
                                        <th>Points</th>
                                        <th>Goals Difference</th>
                                        {/* Add more table headers as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {standing.map((team, teamIndex) => (
                                        <tr key={teamIndex} className={team.rank === 1 ? "table-success" : (team.rank >= 18 && team.rank <= 20) ? "table-danger" : (team.rank === 2 || team.rank === 3 || team.rank === 4) ? "table-primary" : ""}>
                                            <td>{team.rank}</td>
                                            <td>{team.team.name}</td>
                                            <td>{team.points}</td>
                                            <td>{team.goalsDiff}</td>
                                            {/* Add more table cells as needed */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Standings;
