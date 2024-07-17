import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const EliminarGasto = ({ eliminarGastoPorNombre, show, setShow }) => {
    const [descripcion, setDescripcion] = useState('');

    const mCierre = () => setShow(false);

    const mEnvio = (e) => {
        e.preventDefault();
        
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este gasto?");
        if (confirmDelete) {
            eliminarGastoPorNombre(descripcion);
            setDescripcion('');
            mCierre();
        }
    };

    return (
        <>
            <Modal show={show} onHide={mCierre}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Gasto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={mEnvio}>
                        <Form.Group className="mb-3" controlId="descripcion">
                            <Form.Label>Descripción del Gasto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button className="btn btn-danger" type="submit">
                            Eliminar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EliminarGasto;
