import React, { useState } from 'react';
import ModalEventos from '../../Components/ModalEventos';

const BuscadorEventos = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const applyFilters = (filters) => {
        // Aquí puedes hacer lo que necesites con los filtros
        console.log(filters);
    };


    return (
        <main className='min-h-[calc(100vh-436px)] bg-gray-100'>
            <button onClick={openModal}>Aplica los filtros</button>
            <ModalEventos
                isOpen={modalIsOpen}
                closeModal={closeModal}
                applyFilters={applyFilters}
            />
        </main>
    );
};

export default BuscadorEventos;
