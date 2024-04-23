import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const user = {
    email: '',
    password: ''
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
    const url = 'http://localhost/public/api/login'
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
  const iniciarSesion = () => {
    obtenerDatosFetch()
  }
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-4'>
        <input type="text" placeholder='Email' onChange={(e) => cambiarEmail(e)} />
        <input type="password" placeholder='Contraseña' onChange={(e) => cambiarPassword(e)} />
        <p className='p-2 text-center lg:text-left'>No tienes una cuenta?
          <Link to='/register'>
            <label className='text-blue-600 underline cursor-pointer ml-1'>Crea una aquí</label>
          </Link>
        </p>
        <button onClick={() => iniciarSesion()}> Enviar </button>
      </div>
    </div>
  )
}

export default Login