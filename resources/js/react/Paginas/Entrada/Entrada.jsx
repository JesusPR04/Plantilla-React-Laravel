// src/components/Entradas.jsx
import React, { useEffect, useState } from 'react';
import { getEntradas } from '../../api/requests';
import eventodefecto from '../../assets/eventodefecto.jpg';


const BASE_URL = 'http://localhost:';

const Entrada = () => {
    const [entradas, setEntradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntradas = async () => {
            const token = localStorage.getItem('user-token'); // Asegúrate de tener el token almacenado en localStorage
            if (token) {
                try {
                    const data = await getEntradas(token);
                    setEntradas(data);
                } catch (error) {
                    setError('Error fetching entradas');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Usuario no autenticado');
                setLoading(false);
            }
        };

        fetchEntradas();
    }, []);

    if (loading) {
        return <div className='min-h-[calc(100vh-436px)] text-center mt-10 text-colorFuente text-2xl font-bold'>Cargando...</div>;
    }

    if (error) {
        return <div className='min-h-[calc(100vh-436px)] text-center mt-10 text-red-500 text-2xl font-bold'>{error}</div>;
    }

    if (entradas.length === 0) {
        return <div className='min-h-[calc(100vh-436px)] text-center mt-10 text-colorFuente text-2xl font-bold'>No tienes entradas</div>;
    }

    return (
        <section className="bg-gray-100 py-12 md:py-16 lg:py-20 min-h-[calc(100vh-436px)]">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-colorFuente mb-6 text-center">Entradas</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {entradas.map((entrada) => (
                        <div key={entrada.id} className="border p-4 rounded shadow">
                            <div className="mb-4">
                                <img src={entrada.evento.ruta ? `${BASE_URL}${entrada.evento.ruta}` : eventodefecto} alt={entrada.evento.nombre} className="w-full h-48 object-cover rounded" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">{entrada.evento.nombre}</h2>
                            <p>Fecha: {entrada.evento.fecha}</p>
                            <p>Hora: {entrada.evento.hora}</p>
                            <p>Ubicación: {entrada.evento.localizacion}</p>
                            <p>Cantidad: {entrada.cantidad}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Entrada;
