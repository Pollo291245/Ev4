import React, { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const AgregarGasto = ({ agregarGasto, show, setShow }) => {
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [mMensaje, setmMensaje] = useState(false);

    const cerrarM = () => setShow(false);

    const enviarFormulario = (e) => {
        e.preventDefault();
        const nuevoGasto = {
            id: uuidv4(),
            descripcion,
            categoria,
            monto: parseInt(monto),
            fecha
        };
        agregarGasto(nuevoGasto);
        setDescripcion('');
        setCategoria('');
        setMonto('');
        setFecha('');
        setMensaje('Gasto agregado exitosamente!');
        setmMensaje(true);
        cerrarM();
    };

    const mCierre = () => {
        setmMensaje(false);
    };

    return (
        <>
            <Modal show={show} onHide={cerrarM}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Gasto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={enviarFormulario}>
                        <Form.Group className="mb-3" controlId="descripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="categoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                as="select"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                <option value="comida">Comida</option>
                                <option value="ropa">Ropa</option>
                                <option value="gastos del hogar">Gastos del hogar</option>
                                <option value="medio de transporte">Medio de Transporte</option>
                                <option value="caprichos">Caprichos</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="monto">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese el monto"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button className="btn btn-primary" type="submit">
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={mMensaje} onHide={mCierre}>
                <Modal.Header closeButton>
                    <Modal.Title>Éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensaje}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={mCierre}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};
export default AgregarGasto;
