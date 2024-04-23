import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../api/requests'

const Login = () => {

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
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
  const iniciarSesion = () => {
    login(usuario.email, usuario.password)
      .then(response => console.log(response))
      .catch(error => console.log(error))
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