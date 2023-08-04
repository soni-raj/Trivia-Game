import React from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function TeamStatistics() {
    const { state } = useLocation();
    const { team } = state;

    const pieData = {
        labels: ['Wins', 'Losses'],
        datasets: [
            {
                label: 'Games Played',
                data: [team.wins, team.losses],
                backgroundColor: ['#9BCDD2', '#FF8551'],
                // borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                // borderWidth: 1,
            },
        ],

    };

    console.log(team);
    return (
        <center>
            <MDBContainer className="justify-content-center">
                <center><h1>{team.team_name} Statistics</h1></center>
                <p></p><p></p><p></p>
                <MDBRow>
                    <MDBCol size="6">
                        <MDBCard shadow="5" border="info" background="white" className="mb-3 fs-5">
                            <MDBCardHeader className='justify-content-center'>Win / Loss Ratio </MDBCardHeader>
                            <MDBCardBody>
                                <Doughnut data={pieData} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size="4">
                        <MDBCard shadow="5" border="info" background="white" className="mb-3 h-25 fs-5" >
                            <MDBCardHeader className='justify-content-center'>Total Points</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle className="fs-1">{team.total_points}</MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard shadow="5" border="info" background="white" className="mb-3 h-25 fs-5">
                            <MDBCardHeader>Games Played</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle className="fs-1">{team.games_played}</MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard shadow="5" border="info" background="white" className="mb-3 h-25 fs-5">
                            <MDBCardHeader>Wins</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle className="fs-1">{team.wins}</MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard shadow="5" border="info" background="white" className="mb-3 h-25 fs-5">
                            <MDBCardHeader>Losses</MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle className="fs-1">{team.losses}</MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </center>

    );
}

export default TeamStatistics;
