import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import './teams.css';
import axios from 'axios';
import { INVITE_TEAM_MEMBER, UPDATE_TEAM_MEMBER_ROLE, REMOVE_TEAM_MEMBER } from "../../utils/apiUrls";

const memberIcon = [require('../../images/koi.png')];

const currentUser = localStorage.getItem("email");

function TeamManagement() {
    const { state } = useLocation();
    const { team: initialTeam } = state;
    const [team, setTeam] = useState(initialTeam);
    const [showModal, setShowModal] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [invitationSent, setInvitationSent] = useState(false);

    const handlePromoteClick = (email) => {
        updateRole(email, 'admin');
    };

    const handleDemoteClick = (email) => {
        updateRole(email, 'player');
    };

    const handleRemoveClick = (email) => {
        removeUser(email);
    };

    const handleInviteClick = () => {
        setShowModal(true);
    };

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    };

    const handleSendInvitation = () => {
        inviteMember(emailInput);
    };

    const updateRole = (email, role) => {
        const requestData = {
            email: email,
            role: role,
            team: team,
        };

        console.log(requestData);
        // Send POST request to the API to update the role
        axios
            .post(UPDATE_TEAM_MEMBER_ROLE, requestData)
            .then((response) => {
                console.log(response.data);
                const updatedMembers = { ...team.members };
                updatedMembers[email].role = role;

                setTeam({
                    ...team,
                    members: updatedMembers,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const removeUser = (email) => {
        const requestData = {
            email: email,
            team: team,
        };

        // Send POST request to the API to remove the user
        axios
            .post(REMOVE_TEAM_MEMBER, requestData)
            .then((response) => {
                console.log(response.data);
                const updatedMembers = { ...team.members };
                delete updatedMembers[email];

                setTeam({
                    ...team,
                    members: updatedMembers,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const inviteMember = (email) => {
        const requestData = {
            email: email,
            team: team,
        };

        console.log(requestData);
        setInvitationSent(true);

        // Send POST request to the API to send invitation
        axios
            .post(INVITE_TEAM_MEMBER, requestData)
            .then((response) => {
                console.log(response.data);
                setInvitationSent(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderMemberCards = () => {
        return Object.entries(team.members).map(([email, member]) => {
            const isMemberAdmin = member.role === 'admin';
            const isCurrentUser = email === currentUser;

            return (
                <Col key={email} sm={6} md={4} lg={3} className="mb-3">
                    <Card className="h-100 d-flex flex-column align-items-center justify-content-center team-card">
                        <div className="text-center">
                            <Card.Img
                                variant="top"
                                src={memberIcon[0]} // Use the first (and only) image in memberIcon array
                                style={{ width: '10rem', height: '10rem', paddingTop: '1rem' }}
                            />
                        </div>
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                            <Card.Title>{email}</Card.Title>
                            <Card.Text>User Role: {member.role}</Card.Text>
                            <div className="mb-2 d-flex justify-content-center">
                                {!isCurrentUser && (
                                    <>
                                        {isMemberAdmin ? (
                                            <>
                                                <Button variant="warning" className="mr-2" onClick={() => handleDemoteClick(email)}>
                                                    Demote to Player
                                                </Button>
                                                <Button variant="danger" onClick={() => handleRemoveClick(email)}>
                                                    Remove
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="info" className="mr-2" onClick={() => handlePromoteClick(email)}>
                                                    Make Admin
                                                </Button>
                                                <Button variant="danger" onClick={() => handleRemoveClick(email)}>
                                                    Remove
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEmailInput('');
        setInvitationSent(false);
    };

    const renderInviteModalContent = () => {
        if (invitationSent) {
            return (
                <>
                    <Modal.Body>
                        <p>Email sent, waiting for the user response!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </>
            );
        } else {
            return (
                <>
                    <Modal.Body>
                        <p>Add the email of the user you want to invite to the team:</p>
                        <input type="email" value={emailInput} onChange={handleEmailChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSendInvitation}>
                            Send Invitation
                        </Button>
                    </Modal.Footer>
                </>
            );
        }
    };

    return (
        <div className="container">
            <p></p>
            <h1 className="text-center">{team.team_name}</h1>
            <p></p>
            <center>
                <Button variant="primary" className="mb-3" onClick={handleInviteClick}>
                    Invite Members
                </Button>
            </center>
            <p></p>
            <Row className="justify-content-center">{renderMemberCards()}</Row>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite Members</Modal.Title>
                </Modal.Header>
                {renderInviteModalContent()}
            </Modal>
        </div>
    );
}

export default TeamManagement;
