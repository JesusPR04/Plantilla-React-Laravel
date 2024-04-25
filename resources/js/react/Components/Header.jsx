import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Eventia-logo-removebg.png";

function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <nav className="border-b border-[#eeedf2] text-colorFuente">
                <div className="flex flex-wrap items-center justify-between md:justify-center w-5/6 m-auto">
                    <Link
                        to=""
                        className="flex items-center rtl:space-x-reverse"
                    >
                        <img
                            src={logo}
                            className="h-24 pt-3 ml-[-22px] md:ml-0"
                            alt="Eventia Logo"
                        />
                        <span className="self-center text-2xl font-bold text-blue-500 whitespace-nowrap">
                            EVENTIA
                        </span>
                    </Link>

                    <div className="flex md:order-1">
                        <div className="relative hidden md:block ml-24">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-colorFuente "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                className="block w-full md:w-[600px]
                                p-2 ps-10 text-sm text-colorFuente border border-[#eeedf2] 
                                rounded-2xl bg-[#f8f7fa] focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Buscar eventos"
                            />
                        </div>

                        {!openMenu ? (
                            <button
                                onClick={() => setOpenMenu(true)}
                                data-collapse-toggle="navbar-search"
                                type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-colorFuente rounded-lg md:hidden hover:bg-[#eeedf2] focus:outline-none focus:ring-2 focus:ring-gray-200"
                                aria-controls="navbar-search"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="none"
                                        stroke="#333333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M3 6h18M3 12h18M3 18h18"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <button
                                onClick={() => setOpenMenu(false)}
                                data-collapse-toggle="navbar-search"
                                type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-colorFuente rounded-lg md:hidden hover:bg-[#eeedf2] focus:outline-none focus:ring-2 focus:ring-gray-200"
                                aria-controls="navbar-search"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Close main menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 256 256"
                                >
                                    <path
                                        fill="#333333"
                                        d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2"
                        id="navbar-search"
                    >
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-colorFuente "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                className="block w-full p-2 ps-10 text-sm text-colorFuente border border-[#eeedf2] rounded-2xl bg-[#f8f7fa] focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Buscar eventos"
                            />
                        </div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:justify-center md:mt-4 mb-4 md:border-0">
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500"
                                >
                                    Encuentra eventos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500"
                                >
                                    Crear eventos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500"
                                >
                                    Ayuda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500"
                                >
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500"
                                >
                                    Registrarse
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/organizador"
                                    className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500"
                                >
                                    ¿Quieres ser organizador?
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
