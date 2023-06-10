import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
const App = () => {
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/leagues');
                const data = await response.json();
                setTeamData(data.response[0]); // Access the first element of the array
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='container'>
            {teamData ? (
                <div>
                    <h1>{teamData.league.name}</h1>
                    <img src={teamData.country.flag} alt="PL Logo" width={200} />
                    <img src={teamData.league.logo} alt="PL Logo" />
                    <div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamData.seasons.map((season) => (
                                    season.current && (
                                        <tr key={season.year}>
                                            <td>{season.year}</td>
                                            <td>{season.start}</td>
                                            <td>{season.end}</td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default App;
