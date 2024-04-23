import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const user = {
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        telefono: '',
        ciudad: ''
    }

    const [usuario, setUsuario] = useState(user)

    const obtenerDatosFetch = () => {
        const options = {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }
        const url = 'http://localhost/public/api/register'
        fetch(url, options)
            .then(respuesta => respuesta.json())
            .then(respuesta => comprobarRegistro(respuesta))
            .catch(error => console.log(error))
    }
    const comprobarRegistro = (respuesta) => {
        if (respuesta.status) {
            console.log(respuesta.token);
        } else {
            console.log(respuesta)
        }
    }

    const cambiarEmail = (e) => {
        user.email = e.target.value
        setUsuario(user)
    }
    const cambiarPassword = (e) => {
        user.password = e.target.value
        setUsuario(user)
    }
    const cambiarNombre = (e) => {
        user.nombre = e.target.value
        setUsuario(user)
    }
    const cambiarCiuad = (e) => {
        user.ciudad = e.target.value
        setUsuario(user)
    }
    const cambiarTelefono = (e) => {
        user.telefono = e.target.value
        setUsuario(user)
    }
    const cambiarApellidos = (e) => {
        user.apellidos = e.target.value
        setUsuario(user)
    }
    const crearUsuario = () => {
        obtenerDatosFetch()
    }

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col gap-4'>
                <input type="text" placeholder='Nombre' onChange={(e) => cambiarNombre(e)} />
                <input type="text" placeholder='Apellidos' onChange={(e) => cambiarApellidos(e)} />
                <input type="text" placeholder='Email' onChange={(e) => cambiarEmail(e)} />
                <input type="text" placeholder='Ciudad' onChange={(e) => cambiarCiuad(e)} />
                <input type="text" placeholder='Teléfono' onChange={(e) => cambiarTelefono(e)} />
                <input type="password" placeholder='Contraseña' onChange={(e) => cambiarPassword(e)} />
                <p className='p-2 text-center lg:text-left'>¿Tienes ya una cuenta?
                    <Link to='/login'>
                        <label className='text-blue-600 underline cursor-pointer ml-1'>Inicia sesión aquí</label>
                    </Link>
                </p>
                <button onClick={() => crearUsuario()}> Enviar </button>
            </div>
        </div>
    )
}

export default Register