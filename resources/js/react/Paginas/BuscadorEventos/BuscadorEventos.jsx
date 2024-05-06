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
        <div>
            <button onClick={openModal}>Abrir Modal</button>
            <ModalEventos
                isOpen={modalIsOpen}
                closeModal={closeModal}
                applyFilters={applyFilters}
            />
        </div>
    );
};

export default BuscadorEventos;
