import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { comprobarSolicitud, recogerPeticiones, descargarArchivo, comprobarAccesoAdmin } from '../../api/requests';
import { FaDownload } from "react-icons/fa";

const Admin = () => {
    const [autorizacion, setAutorizacion] = useState(false);
    const [permisos, setPermisos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        comprobarAccesoAdmin()
            .then(respuesta => comprobarRespuesta(respuesta))
            .catch(error => {
                toast.error('No autorizado');
                setTimeout(() => navigate('/'), 2000);
            });

        recogerPeticiones()
            .then(respuesta => setPermisos(respuesta.peticiones))
            .catch(error => toast.error(error.message));
    }, []);

    const comprobarRespuesta = (respuesta) => {
        if (!respuesta.status) {
            toast.error('No autorizado');
        } else {
            setAutorizacion(true);
        }
    };

    const descargar = (documento) => {
        descargarArchivo({ "documento": documento })
            .then(respuesta => toast.success('Descarga exitosa'))
            .catch(error => toast.error('Error en la descarga'));
    };

    const aceptarSolicitud = (permiso) => {
        comprobarSolicitud({ ...permiso, "decision": true })
            .then(respuesta => {
                toast.success('Solicitud aceptada')
                navigate(0)
            })
            .catch(error => toast.error('Error al aceptar la solicitud'));
    };

    const rechazarSolicitud = (permiso) => {
        comprobarSolicitud({ ...permiso, "decision": false })
            .then(respuesta => {
                toast.success('Solicitud rechazada')
                navigate(0)
            })
            .catch(error => toast.error('Error al rechazar la solicitud'));
    };

    return (
        <div>
            {!autorizacion ? (
                <div className="min-h-[calc(100vh-436px)] text-center mt-10 text-colorFuente text-xl sm:text-4xl font-bold uppercase">
                    Cargando...
                </div>
            ) : (
                <main className='min-h-[calc(100vh-436px)] bg-gray-100 text-center py-10'>
                    <div className='max-w-screen-lg mx-auto bg-white p-8 rounded-lg shadow-lg'>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 uppercase mb-8">
                            Peticiones para
                            <span className='text-blue-500'> organizador</span>
                        </h2>
                        <div className='overflow-x-auto'>
                            <table className="min-w-full bg-white border-collapse hidden md:table">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="px-6 py-3 border-b-2 border-gray-200">Empresa</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200">DNI</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200">Comentario</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200">Estado</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200">Fichero</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-200">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permisos.length > 0 ?
                                        (
                                            <>
                                                {permisos.map((permiso, index) => (
                                                    <tr key={index} className="hover:bg-gray-100">
                                                        <td className="border px-6 py-4 font-semibold capitalize">{permiso.empresa}</td>
                                                        <td className="border px-6 py-4 font-semibold">{permiso.dni}</td>
                                                        <td className="border px-6 py-4 font-semibold">{permiso.comentario ?? 'No hay comentarios'}</td>
                                                        <td className={`border px-6 py-4 font-semibold ${permiso.estado === 'Aceptada' ? 'text-green-500' : permiso.estado === 'Rechazada' ? 'text-red-500' : 'text-black'}`}>{permiso.estado}</td>
                                                        <td className="border px-6 py-4">
                                                            <FaDownload onClick={() => descargar(permiso.documento)} className="cursor-pointer text-blue-500 m-auto text-2xl hover:scale-110 duration-100" />
                                                        </td>
                                                        <td className="border px-6 py-4">
                                                            {(permiso.estado === "Aceptada" || permiso.estado === "Rechazada") ? null : (
                                                                <div className='flex gap-2 justify-center font-semibold'>
                                                                    <button onClick={() => aceptarSolicitud(permiso)} className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>Aceptar</button>
                                                                    <button onClick={() => rechazarSolicitud(permiso)} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Rechazar</button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <tr>
                                                    <td colSpan={6}
                                                        className='text-center py-4 text-colorFuente font-semibold text-2xl'>
                                                        No hay permisos
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                </tbody>
                            </table>
                            <div className="grid gap-4 md:hidden">
                                {permisos.length > 0 ?
                                    (
                                        <>
                                            {permisos.map((permiso, index) => (
                                                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                                    <div className="flex justify-between border-b pb-2 mb-2">
                                                        <span className="font-semibold">Empresa:</span>
                                                        <span className='capitalize'>{permiso.empresa}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b pb-2 mb-2">
                                                        <span className="font-semibold">DNI:</span>
                                                        <span>{permiso.dni}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b pb-2 mb-2">
                                                        <span className="font-semibold">Comentario:</span>
                                                        <span>{permiso.comentario ?? 'No hay comentarios'}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b pb-2 mb-2">
                                                        <span className="font-semibold">Estado:</span>
                                                        <span className={`${permiso.estado === 'Aceptada' ? 'text-green-500' : permiso.estado === 'Rechazada' ? 'text-red-500' : 'text-yellow-500'} font-bold`}>{permiso.estado}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b pb-2 mb-2">
                                                        <span className="font-semibold">Fichero:</span>
                                                        <FaDownload onClick={() => descargar(permiso.documento)} className="cursor-pointer text-blue-500 text-2xl hover:scale-110 duration-100" />
                                                    </div>
                                                    <div className="mt-4">
                                                        {(permiso.estado === "Aceptada" || permiso.estado === "Rechazada") ? null : (
                                                            <div className='flex gap-2 justify-center'>
                                                                <button onClick={() => aceptarSolicitud(permiso)} className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>Aceptar</button>
                                                                <button onClick={() => rechazarSolicitud(permiso)} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Rechazar</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <tr>
                                                <td colSpan={6}
                                                    className='py-4 text-colorFuente font-semibold text-2xl flex justify-center'>
                                                    No hay permisos
                                                </td>
                                            </tr>
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                </main>
            )}
            <ToastContainer />
        </div>
    );
};

export default Admin;
