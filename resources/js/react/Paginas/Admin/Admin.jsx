import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { comprobarAcceso } from '../../api/requests'

const Admin = () => {
    const [permiso, setPermiso] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        comprobarAcceso()
        .then(respuesta => comprobarRespuesta(respuesta))
        .catch(error => navigate('/'))
    }, [])

    const comprobarRespuesta = (respuesta) => {
        if (!respuesta.status) {
            navigate('/')
        }else{
            setPermiso(true)
        }
    }

    return (
        <div>
            {!permiso ?
            (<div>
                Cargando...
            </div>) 
            : 
            (<div>
                
            </div>)
            }
        </div>
    )
}

export default Admin