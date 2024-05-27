import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventoById } from '../../api/requests';
import eventodefecto from '../../assets/eventodefecto.jpg';

const BASE_URL = 'http://localhost:';

const Evento = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const data = await getEventoById(id);
                setEvento(data);
            } catch (error) {
                setError('Error fetching evento');
            } finally {
                setLoading(false);
            }
        };

        fetchEvento();
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!evento) {
        return <div>No se encontró el evento</div>;
    }

    return (
        <section className="bg-white dark:bg-gray-950 py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                    <img src={evento.ruta ? `${BASE_URL}${evento.ruta}` : eventodefecto} alt={evento.nombre} className="w-full h-64 object-cover mb-4" />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-950 dark:text-white">
                                {evento.nombre}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                {/* Descripcion Corta */}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-950 dark:text-white">Fecha</h3>
                                <p className="text-gray-500 dark:text-gray-400">{evento.fecha}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-950 dark:text-white">Hora</h3>
                                <p className="text-gray-500 dark:text-gray-400">{evento.hora}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-950 dark:text-white">Ubicación</h3>
                                <p className="text-gray-500 dark:text-gray-400">{evento.localizacion}, {evento.ciudad.nombre}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-950 dark:text-white">Aforo</h3>
                                <p className="text-gray-500 dark:text-gray-400">{evento.aforoTotal}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-950 dark:text-white">Descripción</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {evento.descripcion}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button>Comprar Entradas</button>
                            <button variant="outline">
                                Añadir a Favoritos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Evento;
