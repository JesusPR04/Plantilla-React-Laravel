import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEventoById, fetchUserData, comprarEntrada, comprobarFavorito, marcarFavorito, getTarjetas } from "../../api/requests";
import ImageSlider from "../../Components/ImageSlider";
import imagenDefecto from '../../assets/eventodefecto.png'

const Evento = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [evento, setEvento] = useState(null);
    const [favorito, setFavorito] = useState(false);
    const [user, setUser] = useState(null);
    const [tarjetas, setTarjetas] = useState([]);
    const [selectedTarjeta, setSelectedTarjeta] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1); // Para manejar la cantidad de entradas a comprar
    const [metodoPago, setMetodoPago] = useState('dinero'); // Añadir estado para el método de pago

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const data = await getEventoById(id);
                setEvento(data);
            } catch (error) {
                setError("Error fetching evento");
            } finally {
                setLoading(false);
            }
        };
        const revisarFavorito = () => {
            comprobarFavorito({ 'id': id })
                .then(respuesta => setFavorito(respuesta.status))
                .catch(error => console.log(error))
        }

        fetchEvento();
        if (localStorage.getItem('user-token') !== null) {
            revisarFavorito()
        }
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("user-token"); // Asegúrate de tener el token almacenado en localStorage
            if (token) {
                try {
                    const userData = await fetchUserData(token);
                    setUser(userData);
                    if (evento.precio > 0) {
                        const userTarjetas = await getTarjetas()
                        if (userTarjetas.length > 0) {
                            setTarjetas(() => userTarjetas)
                            setSelectedTarjeta(userTarjetas[0].id)
                        } else {
                            setTarjetas(false)
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user:", error.message);
                }
            }
        };

        fetchUser();
    }, [evento]);

    const handleCompra = async () => {
        if (!user) {
            toast.error("Debes estar logueado para comprar entradas");
            setTimeout(() => navigate('/login'), 2000); // 2 segundos de demora
            return;
        }

        try {
            if (metodoPago === 'dinero') {
                if (tarjetas !== false || evento.precio === 0) {
                    if (evento.precio === 0) {
                        await comprarEntrada({
                            idEvento: id,
                            cantidad,
                            metodoPago, // Añadir el método de pago
                            idTarjeta: ''
                        });
                    } else {
                        await comprarEntrada({
                            idEvento: id,
                            cantidad,
                            metodoPago, // Añadir el método de pago
                            idTarjeta: selectedTarjeta
                        });
                    }
                    toast.success("Compra realizada con éxito");
                    setTimeout(() => navigate('/entradas'), 2000); // 3 segundos de demora
                } else {
                    toast.info('Necesitas una tarjeta de crédito para comprar entradas')
                    setTimeout(() => { navigate('/tarjetas') }, 2000)
                }
            } else if (metodoPago === 'puntos') {
                if (precioEnPuntos <= user.puntos) {
                    await comprarEntrada({
                        idEvento: id,
                        cantidad,
                        metodoPago, // Añadir el método de pago
                        idTarjeta: ''
                    });
                    toast.success("Compra realizada con éxito");
                    setTimeout(() => navigate('/entradas'), 3000);
                } else {
                    toast.error('No tiene los suficientes puntos')
                }
            }

        } catch (error) {
            console.error("Error comprando entrada:", error);
            toast.error("Error comprando entrada");
        }
    };

    const asignarFavorito = (id) => {
        marcarFavorito({ 'id': id })
            .then(() => {
                // Después de marcar/desmarcar favorito, actualiza el estado del favorito
                comprobarFavorito({ 'id': id })
                    .then(respuesta => {
                        setFavorito(respuesta.status)
                        toast.success(respuesta.status ? "Evento añadido a favoritos con éxito" : "Evento eliminado de favoritos con éxito");
                    })
                    .catch(error => {
                        console.log(error)
                        toast.error("Error");
                    });
            })
            .catch(error => navigate('/login'));
    }

    const importImage = (ruta) => {
        return new URL(`../../assets/${ruta}`, import.meta.url).href;
    };

    if (loading) {
        return <div className='min-h-[calc(100vh-436px)] text-xl sm:text-4xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>Cargando...</div>;
    }

    if (error) {
        return <div className='min-h-[calc(100vh-436px)] text-2xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>{error}</div>;
    }

    if (!evento) {
        return <div className='min-h-[calc(100vh-436px)] text-2xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>No se encontró el evento</div>;
    }

    const precioEnPuntos = evento.precio * 25 * cantidad;

    return (
        <section className="bg-gray-100 min-h-[calc(100vh-436px)] py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 md:px-6 max-h-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="w-full md:w-auto">
                        {evento.imagenes.length > 1 ? (
                            <ImageSlider eventoImagenes={evento.imagenes} />
                        ) : (
                            <img
                                src={evento.imagenes.length !== 0 ? importImage(evento.imagenes[0].ruta) : imagenDefecto}
                                alt="Imagen del evento"
                                className=" h-full w-full rounded"
                            />
                        )}
                    </div>
                    <div className="space-y-6 border p-4 rounded shadow bg-gray-100">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-colorFuente uppercase">
                                {evento.nombre}
                            </h1>
                            <p className="text-colorFuente mt-2">
                                {/* Descripcion Corta */}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-medium text-colorFuente">
                                    Fecha
                                </h3>
                                <p className="text-colorFuente">
                                    {evento.fecha}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-colorFuente">
                                    Hora
                                </h3>
                                <p className="text-colorFuente">
                                    {evento.hora}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-colorFuente">
                                    Ubicación
                                </h3>
                                <p className="text-colorFuente">
                                    {evento.localizacion},{" "}
                                    {evento.ciudad.nombre}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-colorFuente">
                                    Aforo
                                </h3>
                                <p className="text-colorFuente">
                                    {evento.aforoTotal}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-colorFuente">
                                Descripción
                            </h3>
                            <p className="text-colorFuente">
                                {evento.descripcion}
                            </p>
                        </div>
                        {user && user.id === evento.idOrganizador ?
                            (
                                <div className="w-full flex justify-end">
                                    <button onClick={() => navigate('/editarEvento', { state: { evento } })}
                                        className=" bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 
                                        lg:mt-36 w-1/2 md:w-1/4 rounded-lg hover:scale-105 duration-100">
                                        Editar Evento
                                    </button>
                                </div>
                            )
                            :
                            (
                                <>
                                    {evento.precio === 0 ?
                                        (
                                            <div>
                                                <h3 className="text-lg font-medium text-colorFuente">
                                                    Entradas <span className="text-red-500 font-bold">*</span>
                                                </h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        type="number"
                                                        value={cantidad}
                                                        onChange={(e) => setCantidad(e.target.value)}
                                                        min={1}
                                                        max={5}
                                                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block p-2.5 col-span-2"
                                                    />
                                                    <button
                                                        onClick={handleCompra}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2 lg:col-span-1"
                                                    >
                                                        Comprar Entradas
                                                    </button>
                                                    {favorito ? (
                                                        <button onClick={() => asignarFavorito(evento.id)}
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-2 flex justify-center gap-2
                                                shadow-lg transition duration-300 transform hover:scale-105 lg:col-span-1"
                                                        >Eliminar de favoritos</button>
                                                    ) : (
                                                        <button
                                                            onClick={() => asignarFavorito(evento.id)}
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2 flex justify-center gap-2
                                                shadow-lg transition duration-300 transform hover:scale-105 lg:col-span-1"
                                                        >
                                                            <span>Añadir a Favoritos</span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="yellow"
                                                                stroke="yellow"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="lucide lucide-star"
                                                            >
                                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-colorFuente">
                                                        Precio
                                                    </h3>
                                                    <p className="text-colorFuente">
                                                        {evento.precio === 0 ? 'Gratis' : <span>{evento.precio} € o {precioEnPuntos} puntos</span>}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div>
                                                
                                                <div className={`grid ${metodoPago === 'puntos' ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'} gap-4`}>
                                                    <input
                                                        type="number"
                                                        value={cantidad}
                                                        onChange={(e) => setCantidad(e.target.value)}
                                                        min="1"
                                                        max='5'
                                                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    />
                                                    <select
                                                        value={metodoPago}
                                                        onChange={(e) => setMetodoPago(e.target.value)}
                                                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    >
                                                        <option value="dinero">Tarjeta</option>
                                                        <option value="puntos">Puntos</option>
                                                    </select>
                                                    <select
                                                        value={selectedTarjeta}
                                                        onChange={(e) => setSelectedTarjeta(e.target.value)}
                                                        className={`bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${metodoPago === 'puntos' && 'hidden'} col-span-2 lg:col-span-1`}
                                                    >
                                                        {tarjetas.length > 0 ? (
                                                            tarjetas.map((tarjeta) => (
                                                                <option key={tarjeta.id} value={tarjeta.id}>
                                                                    {tarjeta.numero}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="sin-tarjetas">No tienes ninguna tarjeta de crédito</option>
                                                        )}
                                                    </select>
                                                    <button
                                                        onClick={handleCompra}
                                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2 lg:col-span-1 ${metodoPago === 'dinero' && ''}`}
                                                    >
                                                        Comprar Entradas
                                                    </button>
                                                    {favorito ? (
                                                        <button onClick={() => asignarFavorito(evento.id)}
                                                            className="bg-red-500 hover:bg-red-700 text-white 
                                 font-bold py-2 px-4 rounded"
                                                        >Eliminar de favoritos</button>
                                                    ) : (
                                                        <button
                                                            onClick={() => asignarFavorito(evento.id)}
                                                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2 flex justify-center gap-2
                                                shadow-lg transition duration-300 transform hover:scale-105 lg:col-span-1 ${metodoPago === 'dinero' && ''}`}
                                                        >
                                                            <span>Añadir a Favoritos</span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="yellow"
                                                                stroke="yellow"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="lucide lucide-star"
                                                            >
                                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-colorFuente">
                                                        Precio
                                                    </h3>
                                                    <p className="text-colorFuente">
                                                        {evento.precio === 0 ? 'Gratis' : <span>{evento.precio} € o {precioEnPuntos} puntos</span>}
                                                    </p>
                                                </div>
                                                <p> <span className="text-red-500 font-bold">*</span> Solo podrás comprar como máximo 5 entradas</p>
                                            </div>)
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Evento;
