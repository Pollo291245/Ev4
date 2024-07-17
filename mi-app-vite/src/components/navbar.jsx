import React from 'react';
import { Navbar, Nav, Button, Container, Dropdown } from 'react-bootstrap';

const Navbarc = ({ mMagregar, mMeliminar, mCategSelect }) => {
    return (
        <Navbar className="bg-dark navbar-dark navbar-expand-lg">
            <Container>
                <Navbar.Brand href="#inicio">
                    Control de Gastos <i className="bi bi-cash-stack"></i>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Dropdown className="me-2">
                        <Dropdown.Toggle className="btn btn-success" id="dropdown-basic">
                            Categorías
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => mCategSelect('comida')}>Comida</Dropdown.Item>
                            <Dropdown.Item onClick={() => mCategSelect('ropa')}>Ropa</Dropdown.Item>
                            <Dropdown.Item onClick={() => mCategSelect('gastos del hogar')}>Gastos del Hogar</Dropdown.Item>
                            <Dropdown.Item onClick={() => mCategSelect('caprichos')}>Caprichos</Dropdown.Item>
                            <Dropdown.Item onClick={() => mCategSelect('medio de transporte')}>Medio de Transporte</Dropdown.Item>
                            <Dropdown.Item onClick={() => mCategSelect('')}>Mostrar Todos</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        <Button className="btn btn-primary me-2" onClick={mMagregar}>
                            Agregar Gasto
                        </Button>
                        <Button className="btn btn-danger" onClick={mMeliminar}>
                            Eliminar Gasto
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navbarc;
