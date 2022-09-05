import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const Header = () =>{
  return (
    <>
        <div className="header-nav-wrapper  header-nav-wrapper-lg" />
        <div
          className='app-header bg-second header-nav-wrapper header-nav-wrapper-lg w-100 navbar-light app-header--shadow'>
          <div className="container-fluid">
          <Navbar bg="bg-second" variant="dark">
          <Navbar.Brand href="/">TAMARIX</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
      </Navbar>
          </div>
        </div>
    </>
  );
}





