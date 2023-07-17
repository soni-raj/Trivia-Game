import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function TeamsNavBar() {
    return (

        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Trivia Titans</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/user-teams">My teams</Nav.Link>
                        <Nav.Link href="#link">Log-out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>




    );
}

export default TeamsNavBar;