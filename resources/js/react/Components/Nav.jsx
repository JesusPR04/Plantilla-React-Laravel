import React, { useEffect, useState } from 'react'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/favicon.ico'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserData } from '../api/requests'

const Nav = () => {
    const [user, setUser] = useState({})
    const [name, setName] = useState('')
    const [nombre, setNombre] = useState('')
    const token = localStorage.getItem('user-token')
    const navigate = useNavigate()

    const navegacionSinToken = [
        { name: 'Encuentra eventos', href: '/buscadoreventos' },
        { name: 'Contacto', href: '/ayuda' },
        { name: 'Iniciar sesión', href: '/login' },
        { name: 'Registrarse', href: '/register' }
    ]

    const navegacionUsuario = [
        { name: 'Encuentra eventos', href: '/buscadoreventos' },
        { name: 'Contacto', href: '/ayuda' },
        { name: '¿ Quieres ser organizador ?', href: '/organizador' }
    ]

    const navegacionOrganizador = [
        { name: 'Encuentra eventos', href: '/buscadoreventos' },
        { name: 'Contacto', href: '/ayuda' },
        { name: 'Promociona tu evento', href: '/crearEvento' },
        { name: 'Mis eventos', href: '/misEventos' }
    ]

    const navegacionAdmin = [
        { name: 'Encuentra eventos', href: '/buscadoreventos' },
        { name: 'Contacto', href: '/ayuda' },
        { name: 'Revisar Peticiones', href: '/admin' }
    ]
    const [header, setHeader] = useState(navegacionSinToken)

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const cambiarNombreBusqueda = (e) => {
        setNombre(() => e.target.value)
    }

    useEffect(() => {
        if (token) {
            fetchUserData().then(data => { setUser(data); setName(data.nombre) })
        }
    }, [token])

    const buscarEventos = (e) => {
        if (e.key === 'Enter') {
            const nuevaRuta = '/buscadoreventos?nombre=' + nombre;
            if (!location.pathname.includes("buscadoreventos")) {
                navigate(nuevaRuta);
            } else {
                navigate(nuevaRuta);
                navigate(0);
            }
        }
    }

    return (
        <Disclosure as="nav">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-full px-2 lg:flex lg:justify-center ">
                        <div className="relative flex h-28 items-center justify-between ">
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-colorFuente hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex mx-auto items-center justify-center md:items-stretch md:justify-start xl:flex-row lg:mt-0 flex-col">
                                <div className='flex gap-4 m-auto pt-0 '>
                                    <Link className='flex flex-shrink-0 items-center ' to="/">
                                        <img
                                            className="h-8 w-auto flex justify-center"
                                            src={logo}
                                            alt="Eventia"
                                        />
                                        <span className="ml-3 self-center text-2xl font-bold text-blue-500 whitespace-nowrap">
                                            EVENTIA
                                        </span>
                                    </Link>


                                    <div className="relative md:block mx-2 hidden">
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
                                            className="block w-full md:w-[300px]
                            p-2 ps-10 text-sm text-colorFuente border border-[#eeedf2] 
                            rounded-2xl bg-[#f8f7fa] focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Buscar eventos"
                                            onChange={(e) => cambiarNombreBusqueda(e)}
                                            onKeyDown={(e) => buscarEventos(e)}
                                        />
                                    </div>
                                </div>
                                <div className="hidden md:ml-6 md:block pt-1">
                                    <div className="flex items-center justify-start gap-4">
                                        {/* HEADERS DINAMICOS */}
                                        {!token ? (
                                            navegacionSinToken.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={`block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] font-semibold hover:text-blue-500 ${item.name === 'Registrarse' && "block py-2 px-3 rounded-2xl md:rounded-md  md:text-white md:bg-blue-500 md:hover:bg-blue-700 md:hover:text-white text-colorFuente hover:bg-[#f8f7fa] hover:text-blue-500"}`}
                                                >
                                                    {item.name}
                                                </a>
                                            ))) : (
                                            <>
                                                {
                                                    user.rol === 'Usuario' ?
                                                        (
                                                            <>
                                                                {navegacionUsuario.map((item) => (
                                                                    <a
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        className={`block py-2 px-3 font-semibold text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500`}
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                ))}
                                                            </>
                                                        ) :
                                                        user.rol === 'Organizador' ?
                                                            (
                                                                <>
                                                                    {navegacionOrganizador.map((item) => (
                                                                        <a
                                                                            key={item.name}
                                                                            href={item.href}
                                                                            className={`block py-2 px-3 font-semibold text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500`}
                                                                        >
                                                                            {item.name}
                                                                        </a>
                                                                    ))}
                                                                </>
                                                            ) :
                                                            user.rol === 'Administrador' ?
                                                                (
                                                                    <>
                                                                        {navegacionAdmin.map((item) => (
                                                                            <a
                                                                                key={item.name}
                                                                                href={item.href}
                                                                                className={`block py-2 px-3 font-semibold text-colorFuente rounded-2xl hover:bg-[#f8f7fa] hover:text-blue-500`}
                                                                            >
                                                                                {item.name}
                                                                            </a>
                                                                        ))}
                                                                    </>
                                                                ) :
                                                                (<>Cargando...</>)
                                                }
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={`${!token && 'hidden'} absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}>
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3 mt-1">
                                    <div>
                                        <MenuButton className="relative flex text-xs sm:text-sm bg-blue-500 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Abrir menú de usuario</span>
                                            <p className='px-4 py-2 text-white capitalize font-semibold flex items-center'>
                                                {user.nombre}
                                                <svg
                                                    className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                </svg>
                                            </p>
                                        </MenuButton>
                                    </div>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem>
                                                {() => (
                                                    <p
                                                        className={classNames('flex justify-between items-center px-4 py-2 text-sm text-colorFuente font-semibold hover:bg-gray-100')}
                                                    >
                                                        Tus puntos
                                                        <div className="flex flex-row gap-2 items-center justify-center">
                                                            <span>{user.puntos}</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-cent text-blue-500"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="M12 7v10" /><path d="M15.4 10a4 4 0 1 0 0 4" /></svg>
                                                        </div>
                                                    </p>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {() => (
                                                    <Link
                                                        to='/favoritos'
                                                        className={classNames('flex justify-between items-center px-4 py-2 text-sm text-colorFuente font-semibold hover:bg-gray-100 hover:text-blue-500')}
                                                    >
                                                        Favoritos
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
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
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {() => (
                                                    <Link
                                                        to='/entradas'
                                                        className={classNames('flex justify-between items-center px-4 py-2 text-sm text-colorFuente font-semibold hover:text-blue-500 hover:bg-gray-100')}
                                                    >
                                                        Mis entradas
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            fill="currentColor"
                                                            className="bi bi-ticket-detailed-fill"
                                                            viewBox="0 0 16 16">
                                                            <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zm4 1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5m0 5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5M4 8a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1" />
                                                        </svg>
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {() => (
                                                    <Link
                                                        to='/tarjetas'
                                                        className={classNames('flex justify-between items-center px-4 py-2 text-sm text-colorFuente font-semibold hover:text-blue-500 hover:bg-gray-100')}
                                                    >
                                                        Mis Tarjetas
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            fill="currentColor"
                                                            className="bi bi-credit-card-2-front-fill"
                                                            viewBox="0 0 16 16">
                                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                                                        </svg>
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {() => (
                                                    <Link
                                                        to='/perfil'
                                                        className={classNames('flex justify-between items-center px-4 py-2 text-sm text-colorFuente font-semibold hover:text-blue-500 hover:bg-gray-100')}
                                                    >
                                                        Perfil
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            fill="currentColor"
                                                            className="bi bi-person-fill"
                                                            viewBox="0 0 16 16">
                                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                        </svg>
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <button
                                                        onClick={() => {
                                                            localStorage.removeItem('user-token')
                                                            navigate('/')
                                                            navigate(0)
                                                        }}
                                                        className="block text-start px-4 py-2 text-sm font-semibold hover:text-red-700 text-red-500 w-full hover:bg-gray-100"
                                                    >
                                                        Cerrar Sesión
                                                    </button>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="xs:hidden">
                        <div className="space-y-1 px-2 py-4">
                            <div className="relative md:block mx-2">
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
                                    className="block w-full md:w-[300px]
                            p-2 ps-10 text-sm text-colorFuente border border-[#eeedf2] 
                            rounded-2xl bg-[#f8f7fa] focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Buscar eventos"
                                    onChange={(e) => cambiarNombreBusqueda(e)}
                                    onKeyDown={(e) => buscarEventos(e)}
                                />
                            </div>
                            {!token ? (
                                navegacionSinToken.map((item) => (
                                    <a
                                        href={item.href}
                                        key={item.name}
                                        className={`block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] font-semibold hover:text-blue-500 ${item.name === 'Registrarse' && "block py-2 px-3 rounded-2xl md:rounded-md  md:text-white md:bg-blue-500 md:hover:bg-blue-700 md:hover:text-white text-colorFuente hover:bg-[#f8f7fa] hover:text-blue-500"}`}
                                    >
                                        {item.name}
                                    </a>
                                ))) : (
                                <>
                                    {
                                        user.rol === 'Usuario' ?
                                            (
                                                <>
                                                    {navegacionUsuario.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={`block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] font-semibold hover:text-blue-500`}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </>
                                            ) :
                                            user.rol === 'Organizador' ?
                                                (
                                                    <>
                                                        {navegacionOrganizador.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className={`block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] font-semibold hover:text-blue-500`}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        ))}
                                                    </>
                                                ) :
                                                user.rol === 'Administrador' ?
                                                    (
                                                        <>
                                                            {navegacionAdmin.map((item) => (
                                                                <a
                                                                    key={item.name}
                                                                    href={item.href}
                                                                    className={`block py-2 px-3 text-colorFuente rounded-2xl hover:bg-[#f8f7fa] font-semibold hover:text-blue-500`}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            ))}
                                                        </>
                                                    ) :
                                                    (<>Cargando...</>)
                                    }
                                </>
                            )}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}

export default Nav