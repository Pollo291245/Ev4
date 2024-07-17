import React, { useState, useEffect } from 'react';
import Navbarc from './navbar';
import AgregarGasto from './agregargasto';
import EliminarGasto from './eliminargasto';
import { Table, Pagination, Button } from 'react-bootstrap';


const FrmGastos = () => {
    const [gastos, setGastos] = useState([]);
    const [mAgregar, setMAgregar] = useState(false);
    const [mEliminar, setMEliminar] = useState(false);
    const [categoriaF, setCategoriaF] = useState('');
    const [pags, setPags] = useState(1);
    const numpags = 10;
    const [idS, setIdS] = useState(new Set());

    const agregarGasto = (nuevoGasto) => {
        setGastos([...gastos, nuevoGasto]);
    };

    const eliminarG = (descripcion) => {
        const nuevoGastos = gastos.filter(gasto => gasto.descripcion !== descripcion);
        setGastos(nuevoGastos);
        return nuevoGastos.length < gastos.length;
    };

    const eliminarGS = () => {
        if (idS.size === 0) {
            alert("Por favor, seleccione al menos un gasto para eliminar.");
            return;
        }

        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar los gastos seleccionados?");
        if (confirmDelete) {
            const nuevoGastos = gastos.filter(gasto => !idS.has(gasto.id));
            setGastos(nuevoGastos);
            setIdS(new Set());
        }
    };

    const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
    
    const mCategSelec = (categoria) => {
        setCategoriaF(categoria);
        setPags(1);
    };

    const eGastos = categoriaF
        ? gastos.filter(gasto => gasto.categoria === categoriaF)
        : gastos;

    const tPags = Math.ceil(eGastos.length / numpags);
    const currentGastos = eGastos.slice((pags - 1) * numpags, pags * numpags);

    const mCampag = (pageNumber) => {
        setPags(pageNumber);
    };

    const Key = 'gastos';
    useEffect(() => {
        const gastosG = JSON.parse(localStorage.getItem(Key)) || [];
        if (gastosG){
            setGastos(gastosG);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(Key, JSON.stringify(gastos));
    }, [gastos]);

    const cCheckbox = (id) => {
        const newSelectedIds = new Set(idS);
        if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
        } else {
            newSelectedIds.add(id);
        }
        setIdS(newSelectedIds);
    };

    return (
        <div>
            <Navbarc 
                mMagregar={() => setMAgregar(true)} 
                mMeliminar={() => setMEliminar(true)} 
                mCategSelect={mCategSelec}
                eliminarGS={eliminarGS}
            />
            
            <AgregarGasto agregarGasto={agregarGasto} show={mAgregar} setShow={setMAgregar} />
            <EliminarGasto eliminarGastoPorNombre={eliminarG} show={mEliminar} setShow={setMEliminar} />
    
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Lista de Gastos</h2>
                    <h4>Total Gastos: ${totalGastos}</h4>
                </div>
    
                <Table className="mt-3">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Categoría <i className="bi bi-tags-fill"></i></th>
                            <th>Monto <i className="bi bi-cash"></i></th>
                            <th>Fecha <i className="bi bi-calendar-date"></i></th>
                            <th>Seleccionar <i className="bi bi-check2"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentGastos.map((gasto) => (
                            <tr key={gasto.id}>
                                <td>{gasto.descripcion}</td>
                                <td>{gasto.categoria}</td>
                                <td>{gasto.monto}</td>
                                <td>{gasto.fecha}</td>
                                <td className='align-items-center '>
                                    <input
                                        type="checkbox"
                                        checked={idS.has(gasto.id)}
                                        onChange={() => cCheckbox(gasto.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
    
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Pagination>
                        {Array.from({ length: tPags }, (_, index) => (
                            <Pagination.Item 
                                key={index + 1} 
                                active={index + 1 === pags} 
                                onClick={() => mCampag(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                    <Button className="btn btn-danger" onClick={eliminarGS}>
                        Eliminar Gastos Seleccionados
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FrmGastos;
