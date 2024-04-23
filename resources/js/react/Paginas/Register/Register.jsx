import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../api/requests'

const Register = () => {

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        telefono: '',
        ciudad: ''
    })

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
    const cambiarCiuad = (e) => {
        setUsuario({
            ...usuario,
            ciudad: e.target.value
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