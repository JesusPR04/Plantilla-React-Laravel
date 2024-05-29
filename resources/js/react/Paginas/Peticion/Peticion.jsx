import React, { useEffect, useState } from 'react'
import "../../Css/FileButton.css"
import logo from "../../assets/Eventia-logo-removebg.png";
import { organizador } from '../../api/requests';
import { permitirOrganizador } from '../../api/requests';
import { useNavigate } from 'react-router-dom';

const Peticion = () => {
    const navigate = useNavigate()

    const [autorizacion, setAutorizacion] = useState(false)

    useEffect(() => {
        permitirOrganizador()
            .then(respuesta => comprobarRespuesta(respuesta))
            .catch(error => navigate('/'))
    }, [])

    const comprobarRespuesta = (respuesta) => {
        if (respuesta.status) {
            setAutorizacion(true)
        }
    }

    const [peticion, setPeticion] = useState({
        empresa: "",
        dni: "",
        documento: null,
        comentarios: ""
    })
    const [errorVisible, setError] = useState(false)

    const cambiarEmpresa = (e) => {
        setPeticion({
            ...peticion,
            empresa: e.target.value
        })
    }

    const cambiarDni = (e) => {
        setPeticion({
            ...peticion,
            dni: e.target.value
        })
    }

    const cambiarComentarios = (e) => {
        setPeticion({
            ...peticion,
            comentarios: e.target.value
        })
    }
    const documento = (e) => {
        if (e.target.files[0].type !== 'application/pdf') {
            setError(true)
            e.target.value = ''
        } else {
            setError(false)
            setPeticion({
                ...peticion,
                documento: e.target.files[0]
            })
        }
    }

    const enviarPeticion = () => {
        const formData = new FormData();
        formData.append('empresa', peticion.empresa);
        formData.append('dni', peticion.dni);
        formData.append('documento', peticion.documento);
        formData.append('comentario', peticion.comentarios);

        organizador(formData)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }

    return (

        <section className='p-10 min-h-[calc(100vh-436px)] bg-gray-100 '>
            {autorizacion ?
                (
                    <article className='p-5'>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-colorFuente uppercase text-center">
                            ¿ Quieres ser
                            <span className='text-blue-500'> organizador</span> ?
                        </h2>
                        <h2 className='pb-2 pt-6 font-semibold text-colorFuente text-center'>
                            ¡ Manda una <span className='text-blue-500'>solicitud</span> mediante este formulario para poder
                            <span className='text-blue-500'> publicitar</span> tus propios
                            <span className='text-blue-500 uppercase'> eventos</span> !
                        </h2>

                        <article className='mt-6 mx-auto space-y-4 md:space-y-6 grid grid-cols-2 gap-x-8 items-end max-w-xl'>
                            <div className='col-span-2 sm:col-span-1'>
                                <div className='flex flex-row gap-2 mb-2 justify-between'>
                                    <label
                                        htmlFor="nombreEmpresa"
                                        className="block mb-2 text-sm font-medium text-colorFuente"
                                    >
                                        Nombre de tu Empresa
                                    </label>
                                    <span className="bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block">
                                        Requerido
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="nombreEmpresa"
                                    id="nombreEmpresa"
                                    className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Nombre"
                                    onChange={(e) => cambiarEmpresa(e)}
                                    required
                                />
                            </div>
                            <div className='col-span-2 sm:col-span-1'>
                                <div className='flex flex-row gap-2 mb-2 justify-between'>
                                    <label
                                        htmlFor="dni"
                                        className="block mb-2 text-sm font-medium text-colorFuente"
                                    >
                                        DNI
                                    </label>
                                    <span className="bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block">
                                        Requerido
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="dni"
                                    id="dni"
                                    className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="DNI"
                                    onChange={(e) => cambiarDni(e)}
                                    required
                                />
                            </div>
                            <div className='col-span-2'>
                                <div className='flex flex-row gap-2 mb-2 justify-between'>
                                    <label
                                        htmlFor="documento"
                                        className="block mb-2 text-sm font-medium text-colorFuente"
                                    >
                                        Acreditación Empresarial
                                    </label>
                                    <span className="bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block">
                                        Requerido
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    name="documento"
                                    id="documento"
                                    className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full"
                                    onChange={(e) => documento(e)}
                                    required
                                />
                                <p style={{ color: 'red', marginTop: '8px', display: errorVisible ? 'block' : 'none' }}>
                                    El documento deberá ser en formato .pdf
                                </p>
                            </div>
                            <div className='col-span-2'>
                                <div className='flex flex-row gap-2 mb-2 justify-between'>
                                    <label
                                        htmlFor="comentario"
                                        className="block mb-2 text-sm font-medium text-colorFuente"
                                    >
                                        Comentarios
                                    </label>
                                </div>
                                <textarea
                                    name='comentario' id='comentario' cols={50} rows={5}
                                    placeholder='Comentarios sobre su solicitud...'
                                    onChange={(e) => cambiarComentarios(e)}
                                    className='bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                />
                            </div>
                            <div className='col-span-1'></div>
                            <div className='col-span-1 flex justify-end'>
                                <input
                                    type="submit" value="Enviar Solicitud"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                    onClick={() => enviarPeticion()}
                                />
                            </div>
                        </article>
                    </article>
                ) :
                (
                    <div>
                        <p>SU PETICIÓN ESTÁ SIENDO REVISADA</p>
                        <p>Recibirá noticias de nosotros cuando procesemos su solicitud</p>
                        <p>La información acerca de su petición será enviada por correo electrónico</p>
                    </div>
                )
            }

        </section>
    )
}

export default Peticion