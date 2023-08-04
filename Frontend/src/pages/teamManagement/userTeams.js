import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './teams.css';
import teamsbg from '../../images/teamsbg.jpg';

const attr = require('dynamodb-data-types').AttributeValue;

const currentUser = 'adrianasango31@gmail.com';

function unwrapDynamoData(response) {
    return response.map((item) => attr.unwrap(item));
}

function UserTeams() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);

    const getUserTeams = async () => {
        try {
            const requestData = {
                email: currentUser,
            };
            const response = await axios.post('https://s5z3dlayhe.execute-api.us-east-1.amazonaws.com/t1/user-teams', requestData);
            const unwrappedData = unwrapDynamoData(response.data);

            console.log(unwrappedData);
            setTeams(unwrappedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserTeams();
    }, []);

    const handleTeamStatisticsButton = (team) => {
        navigate('/team-statistics', {
            state: {
                team,
            },
        });
    };

    const handleManageTeamButton = (team) => {
        navigate('/team-management', {
            state: {
                team,
            },
        });
    };

    const handleLeaveTeamButton = (team) => {
        const requestData = {
            email: currentUser,
            team: team,
        };
        console.log(requestData)
        // Send POST request to the API to remove the user
        axios
            .post('https://g12mymqu00.execute-api.us-east-1.amazonaws.com/t1/remove-member', requestData)
            .then((response) => {
                console.log(response.data);

                // Remove the team from the frontend
                setTeams((prevTeams) => prevTeams.filter((t) => t.teamID !== team.teamID));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCreateTeamButton = () => {
        // Send POST request to the API to create a new team
        axios
            .post('https://aeka0y8sci.execute-api.us-east-1.amazonaws.com/t1/create-team', { email: currentUser })
            .then((response) => {
                console.log(response.data);
                // Refresh the list of user teams
                getUserTeams();
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div>
            <center>
                &nbsp;
                <h1>My Teams</h1>
                <p></p>
                <Button variant="primary" onClick={handleCreateTeamButton}>
                    Create New Team
                </Button>
                <p></p>
                {teams.map((team, index) => (
                    <div key={index}>
                        <Card className="team-card" style={{ width: '50rem' }}>
                            <Card.Img variant="top" src={teamsbg} className="cover" />
                            <Card.Body>
                                <Card.Title style={{ fontSize: 30 }}>{team.team_name}</Card.Title>
                                <Button variant="primary" onClick={() => handleTeamStatisticsButton(team)}>
                                    See Team Statistics
                                </Button>
                                &nbsp; &nbsp;
                                <Button variant="primary" onClick={() => handleManageTeamButton(team)}>
                                    Manage Team Members
                                </Button>
                                &nbsp; &nbsp;
                                <Button variant="danger" onClick={() => handleLeaveTeamButton(team)}>
                                    Leave Team
                                </Button>
                            </Card.Body>
                        </Card>
                        <p></p>
                    </div>
                ))}
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </center>
        </div>
    );
}

export default UserTeams;
