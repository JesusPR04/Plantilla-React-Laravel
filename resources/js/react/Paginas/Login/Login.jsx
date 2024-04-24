import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/requests";
import imagen from "../../assets/login.jpg";
import logo from "../../assets/Eventia-logo-removebg.png"

const Login = () => {
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });

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
    const iniciarSesion = () => {
        login(usuario.email, usuario.password)
            .then((response) => console.log(response))
            .catch((error) => console.log(error)) 
    };

    return (
        <section className="bg-gray-50 flex flex-wrap justify-center ">
            <div className="relative mt-14 mb-14 max-w-[500px] hidden lg:block lg:w-1/2 overflow-hidden">
                <img
                    src={imagen}
                    className="rounded-lg h-full w-full transform transition-transform 
                      duration-5000 ease-out transform-origin-center"
                    onLoad={(e) => {
                        setTimeout(() => {
                            e.target.classList.add("scale-125");
                        }, 2000); // Zoom a 125% después de 3 segundos

                        setTimeout(() => {
                            e.target.classList.add("scale-150");
                        }, 4000); // Zoom a 150% después de 5 segundos

                        setTimeout(() => {
                          document
                              .getElementById("fadeInText")
                              .classList.remove("opacity-0");
                      }, 6000); // Mostrar texto después de 7 segundos
                    }}
                    alt="Imagen de bienvenida"
                />
                
                <div
                    id="fadeInText"
                    className="mt-40 absolute inset-0 flex flex-col items-center justify-center text-center
                     text-white p-4 rounded-md transition-opacity duration-1000 opacity-0"
                >
                    <h2 className="text-xl font-bold">
                        Descubre, reserva y vive <br/> los mejores eventos con <br/>
                        <span className="text-3xl text-blue-500 uppercase">
                            eventia
                        </span>
                    </h2>
                    <img src={logo} width={90} height={90} alt="Logo" />
                </div>
            </div>

            <div className="2xl:w-full xl:w-full lg:w-full bg-white rounded-lg shadow border mt-14 mb-14 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-colorFuente md:text-2xl">
                        Inicia sesión en su cuenta
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-colorFuente"
                            >
                                Tu correo electrónico
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
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none
                              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              onClick={() => iniciarSesion()}
                        >
                            Iniciar sesión
                        </button>
                        <p className="text-sm font-light text-colorFuente">
                            ¿ Todavía no tienes una cuenta ?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-blue-500 hover:underline"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
