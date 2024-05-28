import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { comprobarAcceso } from '../../api/requests'
import { recogerPeticiones } from '../../api/requests';
import { FaDownload } from "react-icons/fa";
import { descargarArchivo } from '../../api/requests';

const Admin = () => {
    const [autorizacion, setAutorizacion] = useState(false)
    const [permisos, setPermisos] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        comprobarAcceso()
            .then(respuesta => comprobarRespuesta(respuesta))
            .catch(error => navigate('/'))
        recogerPeticiones()
            .then(respuesta => setPermisos(respuesta.peticiones))
            .catch(error => alert(error.message));
    }, [])

    const comprobarRespuesta = (respuesta) => {
        if (!respuesta.status) {
            navigate('/')
        } else {
            setAutorizacion(true)
        }
    }

    const descargar = (documento) => {
        descargarArchivo({"documento": documento})
           .then(respuesta => console.log(respuesta))
           .catch(error => console.log(error))
    }
    return (
        <div>
            {!autorizacion ?
                (<div>
                    Cargando...
                </div>)
                :
                (
                    <main className='min-h-[calc(100vh-436px)] bg-gray-100 text-center'>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-colorFuente uppercase text-center">
                            Peticiones para
                            <span className='text-blue-500'> organizador</span>
                        </h2>
                        <table>
                            <tr>
                                <td>Empresa</td>
                                <td>DNI</td>
                                <td>Comentario</td>
                                <td>Estado</td>
                                <td>Fichero</td>
                            </tr>
                            {permisos.map(permiso => (
                                <tr>
                                    <td>{permiso.empresa}</td>
                                    <td>{permiso.dni}</td>
                                    <td>{permiso.comentario ?? 'No hay comentarios'}</td>
                                    <td>{permiso.estado}</td>
                                    <td>{<FaDownload onClick={() => descargar(permiso.documento)}/>}</td>
                                </tr>
                            ))}
                        </table>
                    </main>
                )
            }
        </div>
    )
}

export default Admin