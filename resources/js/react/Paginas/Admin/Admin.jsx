import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { comprobarAcceso, comprobarSolicitud, recogerPeticiones, descargarArchivo } from '../../api/requests';
import { FaDownload } from "react-icons/fa";

const Admin = () => {
    const [autorizacion, setAutorizacion] = useState(false);
    const [permisos, setPermisos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        comprobarAcceso()
            .then(respuesta => comprobarRespuesta(respuesta))
            .catch(error => {
                toast.error('No autorizado');
                setTimeout(() => navigate('/'), 3000);
            });

        recogerPeticiones()
            .then(respuesta => setPermisos(respuesta.peticiones))
            .catch(error => toast.error(error.message));
    }, []);

    const comprobarRespuesta = (respuesta) => {
        if (!respuesta.status) {
            toast.error('No autorizado');
            setTimeout(() => navigate('/'), 3000);
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
            .then(respuesta => toast.success('Solicitud aceptada'))
            .catch(error => toast.error('Error al aceptar la solicitud'));
    };

    const rechazarSolicitud = (permiso) => {
        comprobarSolicitud({ ...permiso, "decision": false })
            .then(respuesta => toast.success('Solicitud rechazada'))
            .catch(error => toast.error('Error al rechazar la solicitud'));
    };

    return (
        <div>
            {!autorizacion ? (
                <div>
                    Cargando...
                </div>
            ) : (
                <main className='min-h-[calc(100vh-436px)] bg-gray-100 text-center'>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-colorFuente uppercase text-center">
                        Peticiones para
                        <span className='text-blue-500'> organizador</span>
                    </h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Empresa</th>
                                <th className="px-4 py-2">DNI</th>
                                <th className="px-4 py-2">Comentario</th>
                                <th className="px-4 py-2">Estado</th>
                                <th className="px-4 py-2">Fichero</th>
                                <th className="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permisos.map((permiso, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{permiso.empresa}</td>
                                    <td className="border px-4 py-2">{permiso.dni}</td>
                                    <td className="border px-4 py-2">{permiso.comentario ?? 'No hay comentarios'}</td>
                                    <td className="border px-4 py-2">{permiso.estado}</td>
                                    <td className="border px-4 py-2">
                                        <FaDownload onClick={() => descargar(permiso.documento)} className="cursor-pointer text-blue-500" />
                                    </td>
                                    <td className="border px-4 py-2">
                                        {(permiso.estado === "Aceptada" || permiso.estado === "Rechazada") ? null : (
                                            <div>
                                                <button onClick={() => aceptarSolicitud(permiso)} className='m-2 border-2 border-black p-1'>Aceptar</button>
                                                <button onClick={() => rechazarSolicitud(permiso)} className='m-2 border-2 border-black p-1'>Rechazar</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            )}
            <ToastContainer />
        </div>
    );
};

export default Admin;
