import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Eventia-logo-removebg.png'

function Header() {
    return (
        <>
            <nav className="border-b border-[#eeedf2] text-colorFuente">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link 
                    to="" 
                    className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-24 pt-3" alt="Eventia Logo" />
                        <span className="self-center text-2xl font-bold text-blue-500 whitespace-nowrap">EVENTIA</span>
                    </Link>

                    <div className="flex md:order-1">
                        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-colorFuente hover:bg-[#eeedf2] focus:outline-none focus:ring-4 focus:ring-gray-200  rounded-lg text-sm p-2.5 me-1">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>

                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-colorFuente dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-colorFuente border border-[#eeedf2] rounded-2xl bg-[#f8f7fa] focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400" placeholder="Buscar eventos" />
                        </div>

                        <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-colorFuente rounded-lg md:hidden hover:bg-[#eeedf2] focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-search">
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-colorFuente dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-colorFuente border border-[#eeedf2] rounded-2xl bg-[#f8f7fa] focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400" placeholder="Buscar eventos" />
                        </div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-whit">
                            <li>
                                <Link to="/" className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500">Encuentra eventos</Link>
                            </li>
                            <li>
                                <Link to="/" className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500">Crear eventos</Link>
                            </li>
                            <li>
                                <Link to="/" className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500">Ayuda</Link>
                            </li>
                            <li>
                                <Link to="/" className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500">Iniciar sesión</Link>
                            </li>
                            <li>
                                <Link to="/" className="block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500">Registrarse</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header