import React from 'react'
import { Link } from 'react-router-dom'
import instagram from '../assets/instagram.png'
import facebook from '../assets/facebook.png'
import twitter from '../assets/twitter.svg'
import discord from '../assets/discord.svg'

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-2xl">
                <div className="flex flex-col items-center text-center justify-evenly gap-8 px-4 py-6 
                lg:py-8 lg:flex-row lg:text-justify lg:items-baseline
                xl:flex-row xl:text-justify xl:items-baseline
                md:flex-row md:text-justify md:items-baseline">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Eventia</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <Link to="" className=" hover:underline">Sobre nosotros</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Desarrolladores</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Blog</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Ayuda</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Servidor de Discord</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Facebook</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Contacto</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Buscar eventos</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Que hacer en Córdoba</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Que hacer en Madrid</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Que hacer en Barcelona</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Que hacer en Sevilla</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Política de privacidad</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Licencias</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="" className="hover:underline">Términos &amp; Condiciones</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2024 <Link to="">Eventia™</Link>. Todos los derechos reservados.
                    </span>
                    <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                        <Link to="" className="text-gray-400 w-4 h-4">
                            <img src={discord} alt="Logo discord" />
                        </Link>
                        <Link to="" className="text-gray-400 w-4 h-4">
                            <img src={twitter} alt="Logo twitter" />
                        </Link>
                        <Link to="" className="text-gray-400">
                            <img src={facebook} alt="Logo facebook" />
                        </Link>
                        <Link to="" className="text-gray-400">
                            <img src={instagram} alt="Logo instagram" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer