import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { register, getCiudades } from '../../api/requests'
import Select from 'react-select';

const Register = () => {

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        telefono: '',
        ciudad: ''
    })

    const [ciudades, setCiudades] = useState([])

    const cambiarEmail = (e) => {
        setUsuario({
            ...usuario,
            email: e.target.value
        })
    }
    const cambiarPassword = (e) => {
        setUsuario({
            ...usuario,
            password: e.target.value
        })
    }
    const cambiarNombre = (e) => {
        setUsuario({
            ...usuario,
            nombre: e.target.value
        })
    }
    const cambiarCiudad = (e) => {
        setUsuario({
            ...usuario,
            ciudad: e
        })
    }
    const cambiarTelefono = (e) => {
        setUsuario({
            ...usuario,
            telefono: e.target.value
        })
    }
    const cambiarApellidos = (e) => {
        setUsuario({
            ...usuario,
            apellidos: e.target.value
        })
    }
    const crearUsuario = () => {
        register(usuario.nombre, usuario.apellidos, usuario.email, usuario.ciudad, usuario.telefono, usuario.password)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        let promesa = getCiudades()
        promesa.then(data => setCiudades(data.ciudades))
    }, []);
    return (
        <section className="bg-gray-50 flex flex-wrap justify-center ">
            {/* <div className="relative mt-14 mb-14 rounded-l-lg max-w-[500px] hidden lg:block lg:w-1/2 overflow-hidden">
                <img
                    src={imagen}
                    className="h-full w-full transform transition-transform 
                      duration-5000 ease-out transform-origin-center"
                    onLoad={(e) => {
                        setTimeout(() => {
                            e.target.classList.add("scale-150");
                        }, 1000); // Zoom a 150% después de 5 segundos

                        setTimeout(() => {
                          document
                              .getElementById("fadeInText")
                              .classList.remove("opacity-0");
                      }, 2000); // Mostrar texto después de 7 segundos
                    }}
                    alt="Imagen de bienvenida"
                />
                
                <div
                    id="fadeInText"
                    className="mt-40 absolute inset-0 flex flex-col items-center justify-center text-center
                     text-white p-4 rounded-l-lg transition-opacity duration-1000 opacity-0"
                >
                    <h2 className="text-xl font-bold">
                        Descubre, reserva y vive <br/> los mejores eventos con <br/>
                        <span className="text-3xl text-blue-500 uppercase">
                            eventia
                        </span>
                    </h2>
                    <img src={logo} width={90} height={90} alt="Logo" />
                </div>
            </div> */}

            <div className="2xl:w-full xl:w-full lg:w-full bg-white rounded-lg lg:rounded-l-none lg:rounded-r-lg shadow border mt-14 mb-14 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-colorFuente md:text-2xl">
                        Regístrate gratis
                    </h1>
                    {/* <p style={{display: error.estado ? 'block' : 'none'}} className="text-red-500 text-sm">{error.mensaje}</p> */}
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-colorFuente"
                            >
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="name@company.com"
                                onChange={(e) => cambiarEmail(e)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-colorFuente"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                  block w-full p-2.5"
                                  onChange={(e) => cambiarPassword(e)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="ciudad"
                                className="block mb-2 text-sm font-medium text-colorFuente"
                            >
                                Ciudad
                            </label>
                            <Select options={ciudades.map(ciudad => ({ value: ciudad.id, label: ciudad.nombre }))}
                            className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                            block w-full"
                            onChange={(e) =>{cambiarCiudad(e.label)}}
                            placeholder="Ciudad"
                            isSearchable/>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none
                              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              onClick={() => crearUsuario()}
                        >
                            Registrarse
                        </button>
                        <p className="text-sm font-light text-colorFuente">
                            ¿ Tienes ya una cuenta ?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-blue-500 hover:underline"
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register