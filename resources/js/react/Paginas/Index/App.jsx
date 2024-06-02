import { useEffect, useState } from "react";
import HeaderSection from "../../Components/HeaderSection";
import PrincipalFilter from "../../Components/PrincipalFilter";
import { fetchUserData } from "../../api/requests";
import { Link } from "react-router-dom";
import BuscadorEventos from "../BuscadorEventos/BuscadorEventos";
import { getEventos } from "../../api/requests";
import eventodefecto from "../../assets/eventodefecto.png";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";

function App() {
    const [eventos, setEventos] = useState([]);

    const musicIco = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
            />
        </svg>
    );

    const partyIco = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-party-popper"
        >
            <path d="M5.8 11.3 2 22l10.7-3.79" />
            <path d="M4 3h.01" />
            <path d="M22 8h.01" />
            <path d="M15 2h.01" />
            <path d="M22 20h.01" />
            <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
            <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
            <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
            <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
        </svg>
    );

    const performingArtsIco = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-drama"
        >
            <path d="M10 11h.01" />
            <path d="M14 6h.01" />
            <path d="M18 6h.01" />
            <path d="M6.5 13.1h.01" />
            <path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3" />
            <path d="M17.4 9.9c-.8.8-2 .8-2.8 0" />
            <path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7" />
            <path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4" />
        </svg>
    );

    const holidaysIco = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-tree-palm"
        >
            <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" />
            <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" />
            <path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35" />
            <path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" />
        </svg>
    );

    const healthIco = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-stethoscope"
        >
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
            <circle cx="20" cy="10" r="2" />
        </svg>
    );

    const gameIco = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-gamepad-2"
        >
            <line x1="6" x2="10" y1="11" y2="11" />
            <line x1="8" x2="8" y1="9" y2="13" />
            <line x1="15" x2="15.01" y1="12" y2="12" />
            <line x1="18" x2="18.01" y1="10" y2="10" />
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
        </svg>
    );

    const businessIco = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-handshake"
        >
            <path d="m11 17 2 2a1 1 0 1 0 3-3" />
            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
            <path d="m21 3 1 11h-2" />
            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
            <path d="M3 4h8" />
        </svg>
    );

    const foodIco = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chef-hat"
        >
            <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
            <path d="M6 17h12" />
        </svg>
    );

    const token = localStorage.getItem("user-token");
    const [user, setUser] = useState({});
    useEffect(() => {
        if (token) {
            fetchUserData().then((data) => setUser(data));
        }
    }, [token]);

    if (token) {
        useEffect(() => {
            const fetchEventos = async () => {
                console.log({ user });
                try {
                    const response = await fetch(
                        `http://localhost/api/getEventos?ciudad=` +
                            user.ciudad_id +
                            ""
                    );
                    const data = await response.json();
                    setEventos(data);
                } catch (error) {
                    setError("Error fetching eventos");
                }
            };

            fetchEventos();
        }, [user]);
    } else {
        useEffect(() => {
            const fetchEventos = async () => {
                try {
                    const response = await fetch(
                        `http://localhost/api/getEventos?ciudad=3`
                    );
                    const data = await response.json();
                    setEventos(data);
                } catch (error) {
                    setError("Error fetching eventos");
                }
            };

            fetchEventos();
        }, []);
    }

    return (
        <main className="min-h-[calc(100vh-436px)] bg-gray-100">
            <header>
                <HeaderSection user={user} />
            </header>
            <section className="mt-14">
                <article>
                    <h2 className="text-center text-blue-500 text-5xl xl:text-6xl 2xl:text-6xl lg:text-6xl md:text-6xl font-bold tracking-tight uppercase">
                        Géneros
                    </h2>
                    <div className="flex flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row justify-center gap-14 mt-6 mb-6">
                        <PrincipalFilter
                            icono={musicIco}
                            titulo={"Música"}
                            ruta={"buscadoreventos/1"}
                        />
                        <PrincipalFilter
                            icono={partyIco}
                            titulo={"Vida nocturna"}
                            ruta={"buscadoreventos/2"}
                        />
                        <PrincipalFilter
                            icono={performingArtsIco}
                            titulo={"Artes escénicas y visuales"}
                            ruta={"buscadoreventos/3"}
                        />
                        <PrincipalFilter
                            icono={holidaysIco}
                            titulo={"Vacaciones"}
                            ruta={"buscadoreventos/4"}
                        />
                        <PrincipalFilter
                            icono={healthIco}
                            titulo={"Salud"}
                            ruta={"buscadoreventos/5"}
                        />
                        <PrincipalFilter
                            icono={gameIco}
                            titulo={"Aficiones"}
                            ruta={"buscadoreventos/6"}
                        />
                        <PrincipalFilter
                            icono={businessIco}
                            titulo={"Negocios"}
                            ruta={"buscadoreventos/7"}
                        />
                        <PrincipalFilter
                            icono={foodIco}
                            titulo={"Gastronomía"}
                            ruta={"buscadoreventos/8"}
                        />
                    </div>
                </article>
                <hr className="w-full h-[2px] bg-[#eeedf2]" />
                <article className="pb-14" id="eventosTuCiudad">
                    <h2
                        className="text-center text-colorFuente text-5xl xl:text-6xl 2xl:text-6xl
            lg:text-6xl md:text-6xl font-bold tracking-tight uppercase mt-6"
                    >
                        Eventos en{" "}
                        <span className="text-blue-500">
                            {user.ciudad ? user.ciudad : "Córdoba"}
                        </span>
                    </h2>

                    <div
                        className={`grid grid-cols-1 px-4 pt-6 sm:px-20 md:grid-cols-2 lg:grid-cols-3 gap-6`}
                    >
                        {eventos.map((evento) => (
                            <div
                                key={evento.id}
                                className="relative group overflow-hidden rounded-lg"
                            >
                                <Link
                                    className="absolute inset-0 z-10"
                                    to={`/evento/${evento.id}`}
                                >
                                    <span className="sr-only">Ver evento</span>
                                </Link>
                                <div className="relative">
                                    <img
                                        alt={evento.nombre}
                                        className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                                        height={400}
                                        src={eventodefecto}
                                        style={{
                                            aspectRatio: "600/400",
                                            objectFit: "cover",
                                        }}
                                        width={600}
                                    />
                                    {user.id === evento.idOrganizador && (
                                        <span className="absolute top-2 left-2 bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block z-20">
                                            Tu evento
                                        </span>
                                    )}
                                </div>
                                <div className="border p-4 rounded shadow bg-gray-100">
                                    <h3
                                        className="font-bold text-lg md:text-xl text-colorFuente 
                        uppercase transition-colors group-hover:text-blue-500 md:group-hover:text-2xl group-hover:text-xl"
                                    >
                                        {evento.nombre}
                                    </h3>
                                    <p className="text-sm text-colorFuente line-clamp-2">
                                        {evento.descripcion}
                                    </p>
                                    <div className="grid gap-2 pt-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaCalendarAlt className="w-4 h-4 text-blue-500" />
                                            <span className="text-colorFuente font-semibold">
                                                {evento.fecha}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaClock className="w-4 h-4 text-blue-500" />
                                            <span className="text-colorFuente font-semibold">
                                                {evento.hora}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CiLocationOn className="w-4 h-4 text-blue-500" />
                                            <span className="text-colorFuente font-semibold">
                                                {evento.localizacion},{" "}
                                                {evento.ciudad.nombre}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <BsPeople className="w-4 h-4 text-blue-500" />
                                            <span className="text-colorFuente font-semibold">
                                                Total: {evento.aforoTotal} |
                                                Disponible:{" "}
                                                {evento.aforoDisponible}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <RiPriceTag3Line className="w-4 h-4 text-blue-500" />
                                            <span className="text-colorFuente font-semibold">
                                                {evento.precio} €
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center pt-10">
                        <Link
                            to="/buscadoreventos"
                            className="bg-blue-500 font-bold hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Más eventos ...
                        </Link>
                    </div>
                </article>
            </section>
        </main>
    );
}

export default App;
