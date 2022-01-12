import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";

const TopMenu = () => {
  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <Container>
        <BrandNav />
        <MenuNav />
      </Container>
    </Navbar>
  );
};

function BrandNav() {
  return (
    <>
      <Navbar.Brand>
        <Logo />
        <h2>la casa de los helados</h2>
      </Navbar.Brand>
    </>
  );
}

function MenuNav() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Aperitivos</Nav.Link>
      <Nav.Link href="#">Helados</Nav.Link>
      <Nav.Link href="#">Macotas</Nav.Link>
    </Nav>
  );
}

export default TopMenu;
