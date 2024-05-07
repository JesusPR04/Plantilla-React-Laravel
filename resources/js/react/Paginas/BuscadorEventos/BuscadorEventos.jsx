import React, { useState } from 'react';
import ModalEventos from '../../Components/ModalEventos';
import Select from "react-select";

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

    const [genrers, setGenrers] = useState([])

    return (
        <main className='min-h-[calc(100vh-436px)] bg-gray-100'>
            <button onClick={openModal}>Abrir Modal</button>
            <ModalEventos
                isOpen={modalIsOpen}
                closeModal={closeModal}
                applyFilters={applyFilters}
            />
            <Select
                options={genrers.map((genrer) => ({
                    value: genrer.id,
                    label: genrer.nombre,
                }))}
                onChange={(e) => {
                    cambiarCiudad(e.label);
                }}
                placeholder="Ciudad"
                isSearchable
                noOptionsMessage={() => "Sin resultados"}
                classNames={{
                    control: () => "!text-sm !bg-gray-50 !border !border-gray-300 !text-colorFuente !sm:text-sm !rounded-lg !focus:ring-blue-500 !focus:border-blue-500 !w-full !p-0.5",
                    input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                    menuList: () => '!bg-gray-50'
                }}
            />
        </main>
    );
};

export default BuscadorEventos;
