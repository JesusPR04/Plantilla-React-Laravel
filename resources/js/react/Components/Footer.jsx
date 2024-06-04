import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-gray-900">
            <div className="mx-auto w-full">
                <div className="flex flex-col items-center text-center justify-evenly gap-8 px-4 py-6 
                lg:py-8 lg:flex-row lg:text-justify lg:items-baseline
                xl:flex-row xl:text-justify xl:items-baseline
                md:flex-row md:text-justify md:items-baseline">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Eventia</h2>
                        <ul className="text-gray-400 font-medium">
                            <li className="mb-4">
                                <Link to="/sobreNosotros" className="hover:underline">Sobre nosotros</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/ayuda" className="hover:underline">Contacto</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Buscar eventos</h2>
                        <ul className="text-gray-400 font-medium">
                            <li className="mb-4">
                                <Link to="/buscadoreventos/null/3" className="hover:underline">Que hacer en Córdoba</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/buscadoreventos/null/45" className="hover:underline">Que hacer en Madrid</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/buscadoreventos/null/31" className="hover:underline">Que hacer en Barcelona</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/buscadoreventos/null/8" className="hover:underline">Que hacer en Sevilla</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold  uppercase text-white">Legal</h2>
                        <ul className="text-gray-400 font-medium">
                            <li className="mb-4">
                                <Link to="/politicaPrivacidad" className="hover:underline">Política de privacidad</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/terminos&condiciones" className="hover:underline">Términos &amp; Condiciones</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="px-4 py-6 bg-gray-700 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-300 sm:text-center">© 2024 <Link to="">Eventia™</Link>. Todos los derechos reservados.
                    </span>
                    <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                        <a href="https://www.youtube.com/" target='_blank' className="text-white hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                        </a>
                        <a href="https://x.com/" target='_blank' className="text-white hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                        </a>
                        <a href="https://www.facebook.com/" target='_blank' className="text-white hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                        </a>
                        <a href="https://www.instagram.com/" target='_blank' className="text-white hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer