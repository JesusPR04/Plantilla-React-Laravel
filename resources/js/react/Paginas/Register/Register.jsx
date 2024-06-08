import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, getCiudades } from "../../api/requests";
import Select from "react-select";
import img from "../../assets/register.jpg";
import logo from "../../assets/Eventia-logo-removebg.png";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        telefono: "",
        ciudad: "",
    });

    if (localStorage.getItem('user-token') !== null) {
        toast.info('Ya está logueado con una cuenta')
        setTimeout(()=> {navigate('/')}, 2000)
    }

    const [error, setError] = useState({
        mensaje: "",
        estado: false,
    });
    const [nombre, setNombre] = useState({
        mensaje: "",
        estado: false,
    });
    const [apellidos, setApellidos] = useState({
        mensaje: "",
        estado: false,
    });
    const [telefono, setTelefono] = useState({
        mensaje: "",
        estado: false,
    });
    const [ciudad, setCiudad] = useState({
        mensaje: "",
        estado: false,
    });
    const [email, setEmail] = useState({
        mensaje: "",
        estado: false,
    });
    const [password, setPass] = useState({
        mensaje: "",
        estado: false,
    });
    const navigate = useNavigate()
    const [ciudades, setCiudades] = useState([]);

    const cambiarEmail = (e) => {
        setUsuario({
            ...usuario,
            email: e.target.value,
        });
    };
    const cambiarPassword = (e) => {
        setUsuario({
            ...usuario,
            password: e.target.value,
        });
    };
    const cambiarNombre = (e) => {
        setUsuario({
            ...usuario,
            nombre: e.target.value,
        });
    };
    const cambiarCiudad = (e) => {
        setUsuario({
            ...usuario,
            ciudad: e,
        });
    };
    const cambiarTelefono = (e) => {
        setUsuario({
            ...usuario,
            telefono: e.target.value,
        });
    };
    const cambiarApellidos = (e) => {
        setUsuario({
            ...usuario,
            apellidos: e.target.value,
        });
    };
    const crearUsuario = () => {
        register(
            usuario.nombre,
            usuario.apellidos,
            usuario.email,
            usuario.ciudad,
            usuario.telefono,
            usuario.password
        )
            .then((response) => comprobarEstado(response))
            .catch((error) => console.log(error));
    };
    const comprobarEstado = (data) => {
        if (!data.status) {
            setError({
                ...error,
                mensaje: data.message,
                estado: true,
            });
            if (data?.errors?.email) {
                setEmail({
                    ...email,
                    mensaje: data.errors.email[0],
                    estado: true,
                });
            } else {
                setEmail({
                    ...email,
                    mensaje: ''
                });
            }
            if (data?.errors?.apellidos) {
                setApellidos({
                    ...apellidos,
                    mensaje: data.errors.apellidos[0],
                    estado: true,
                });
            } else {
                setApellidos({
                    ...apellidos,
                    mensaje: ''
                });
            }
            if (data?.errors?.telefono) {
                setTelefono({
                    ...telefono,
                    mensaje: data.errors.telefono[0],
                    estado: true,
                });
            } else {
                setTelefono({
                    ...telefono,
                    mensaje: ''
                });
            }
            if (data?.errors?.password) {
                setPass({
                    ...password,
                    mensaje: data.errors.password[0],
                    estado: true,
                });
            } else {
                setPass({
                    ...password,
                    mensaje: ''
                });
            }
            if (data?.errors?.ciudad) {
                setCiudad({
                    ...ciudad,
                    mensaje: data.errors.ciudad[0],
                    estado: true,
                });
            } else {
                setCiudad({
                    ...ciudad,
                    mensaje: ''
                });
            }
            if (data?.errors?.nombre) {
                setNombre({
                    ...nombre,
                    mensaje: data.errors.nombre[0],
                    estado: true,
                });
            } else {
                setNombre({
                    ...nombre,
                    mensaje: ''
                });
            }
        } else {
            setError({
                ...error,
                mensaje: "",
                estado: false,
            });
            setNombre({
                ...nombre,
                mensaje: "",
                estado: false,
            });
            setApellidos({
                ...apellidos,
                mensaje: "",
                estado: false,
            });
            setEmail({
                ...error,
                mensaje: "",
                estado: false,
            });
            setPass({
                ...error,
                mensaje: "",
                estado: false,
            });
            setTelefono({
                ...telefono,
                mensaje: "",
                estado: false,
            });
            setCiudad({
                ...ciudad,
                mensaje: "",
                estado: false,
            });
            localStorage.setItem('user-token', data.token); // Guarda el token en localStorage
            navigate('/')
            navigate(0)
        }
    };

    useEffect(() => {
        let promesa = getCiudades();
        promesa.then((data) => setCiudades(data.ciudades));
    }, []);

    return (
        <section className="bg-gray-100 flex justify-center items-center min-h-[calc(100vh-436px)]">
            <ToastContainer/>
            <article className="flex justify-center">
                <div className="relative mt-14 mb-14 rounded-l-lg basis-1/2 hidden lg:block lg:w-1/2 overflow-hidden">
                    <img
                        src={img}
                        className="h-full w-full transform transition-transform 
                      duration-5000 ease-out transform-origin-center"
                        onLoad={() => {
                            setTimeout(() => {
                                document
                                    .getElementById("fadeInText")
                                    .classList.remove("opacity-0");
                            }, 1000); // Mostrar texto después de 7 segundos
                        }}
                        alt="Imagen de bienvenida"
                    />

                    <div
                        id="fadeInText"
                        className="top-20 absolute inset-0 flex flex-col items-center justify-start text-center
                     text-white p-4 rounded-l-lg transition-opacity duration-1000 opacity-0"
                    >
                        <h2 className="text-xl font-bold">
                            ¡ Comienza una <br /> nueva aventura con <br />
                            <span className="text-3xl text-blue-500 uppercase">
                                eventia
                            </span> !
                        </h2>
                        <img src={logo} width={90} height={90} alt="Logo" />
                    </div>
                </div>

                <div className="2xl:w-full xl:w-full lg:w-full sm:max-w-md lg:basis-1/2 bg-white rounded-lg lg:rounded-l-none lg:rounded-r-lg shadow border mt-14 mb-14 xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-colorFuente md:text-2xl">
                            Regístrate Gratis
                        </h1>
                        <p
                            style={{ display: error.estado ? "block" : "none" }}
                            className="text-red-500 text-sm"
                        >
                            {error.mensaje}
                        </p>
                        <div className="space-y-4 md:space-y-6 grid grid-cols-2 gap-x-8 justify-start items-end">
                            <div className="w-full col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="nombre"
                                    className="block mb-2 text-sm font-medium text-colorFuente"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    style={{borderColor: nombre.estado ? 'red' : '#D1D5DB'}}
                                    className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Tu nombre"
                                    onChange={(e) => cambiarNombre(e)}
                                    required
                                />
                            </div>
                            <div className="w-full col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="apellidos"
                                    className="block mb-2 text-sm font-medium text-colorFuente"
                                >
                                    Apellidos
                                </label>
                                <input
                                    type="text"
                                    name="apellidos"
                                    id="apellidos"
                                    style={{borderColor: apellidos.estado ? 'red' : '#D1D5DB'}}
                                    className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Tus apellidos"
                                    onChange={(e) => cambiarApellidos(e)}
                                    required
                                />
                            </div>
                            <div className="w-full col-span-2 sm:col-span-1">
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
                                    style={{borderColor: email.estado ? 'red' : '#D1D5DB'}}
                                    className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    onChange={(e) => cambiarEmail(e)}
                                    required
                                />
                            </div>
                            <div className="w-full col-span-2 sm:col-span-1">
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
                                    style={{borderColor: password.estado ? 'red' : '#D1D5DB'}}
                                    className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                  block w-full p-2.5"
                                    onChange={(e) => cambiarPassword(e)}
                                    required
                                />
                            </div>
                            <div className="w-full col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="telefono"
                                    className="block mb-2 text-sm font-medium text-colorFuente"
                                >
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    name="telefono"
                                    id="telefono"
                                    style={{borderColor: telefono.estado ? 'red' : '#D1D5DB'}}
                                    className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Tu teléfono"
                                    onChange={(e) => cambiarTelefono(e)}
                                    required
                                />
                            </div>
                            <div className="w-full col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="ciudad"
                                    className="block mb-2 text-sm font-medium text-colorFuente"
                                >
                                    Ciudad
                                </label>
                                <Select
                                    options={ciudades.map((ciudad) => ({
                                        value: ciudad.id,
                                        label: ciudad.nombre,
                                    }))}
                                    onChange={(e) => {
                                        cambiarCiudad(e.label);
                                    }}
                                    placeholder="Ciudad"
                                    isSearchable
                                    noOptionsMessage={() => "Sin resultados"}
                                    classNames={{
                                        control: () => `!text-sm !bg-gray-50 !border  !text-colorFuente 
                                        !sm:text-sm !rounded-lg !focus:ring-blue-500 
                                        !focus:border-blue-500 !w-full !p-0.5 ${ciudad.estado ? "!border-red-500" : "!border-gray-300"}`,
                                        input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                                        menuList: () => '!bg-gray-50'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full col-span-2 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none
                              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => crearUsuario()}
                            >
                                Registrarse
                            </button>
                            <p className="text-sm font-light text-colorFuente col-span-2">
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
            </article>
        </section>
    );
};

export default Register;
