import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventoById, fetchUserData, comprarEntrada } from '../../api/requests';
import eventodefecto from '../../assets/eventodefecto.jpg';

const BASE_URL = 'http://localhost:';

const Evento = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1); // Para manejar la cantidad de entradas a comprar

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

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('user-token'); // Asegúrate de tener el token almacenado en localStorage
            if (token) {
                try {
                    const userData = await fetchUserData(token);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user:', error.message);
                }
            }
        };

        fetchUser();
    }, []);

    const handleCompra = async () => {

        if (!user) {
            alert('Debes estar logueado para comprar entradas');
            return;
        }

        try {
            const data = await comprarEntrada({ idUsuario: user.id, idEvento: id, cantidad });
            alert('Compra realizada con éxito');
        } catch (error) {
            console.error('Error comprando entrada:', error);
            alert('Error comprando entrada');
        }
    };

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
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                min="1"
                                className="border px-2 py-1"
                            />
                            <button onClick={handleCompra} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Comprar Entradas
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
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
