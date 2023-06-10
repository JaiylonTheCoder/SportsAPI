import React, { useState, useEffect } from 'react'
import axios from 'axios';

const TopScorers = () => {
    const [league, setLeague] = useState('39'); // Initial league ID
    const [topScorers, setTopScorers] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/topscorers', {
                    params: { league },
                });
                setTopScorers(response.data.response);
                // const data = await response.json();
                console.log(response.data);
                // Process the received data as needed
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
        <div className="container">
            <div>
                {/* Your league select dropdown */}
                <select value={league} onChange={handleLeagueChange}>
                    <option value="40">Championship</option>
                    <option value="39">Premier League</option>
                    <option value="41">League 1</option>
                </select>
            </div>
            <div className="row">
                {topScorers.length > 0 ? (
                    topScorers.map((topScorer, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4">
                                {topScorer.player && (
                                    <>
                                        <img className="card-img-top" src={topScorer.player.photo} alt="Player" />
                                        <div className="card-body">
                                            <h5 className="card-title">{topScorer.player.name}</h5>
                                            {topScorer.player.nationality && <p className="card-text">Nationality: {topScorer.player.nationality}</p>}
                                            {topScorer.statistics && topScorer.statistics.map((statistic, index) => (
                                                <div key={index}>
                                                    {statistic.team && <p className="card-text">Team: {statistic.team.name}</p>}
                                                    {statistic.games && (
                                                        <>
                                                            <p className="card-text">Appearances: {statistic.games.appearences}</p>
                                                            {statistic.goals && (
                                                                <p className="card-text">Goals: {statistic.goals.total} | Assists: {statistic.goals.assists}</p>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default TopScorers
