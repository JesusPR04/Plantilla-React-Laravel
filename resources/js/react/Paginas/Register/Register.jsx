import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col gap-4'>
                <input type="text" placeholder='Nombre' />
                <input type="text" placeholder='Apellidos' />
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Ciudad' />
                <input type="text" placeholder='Teléfono' />
                <input type="password" placeholder='Contraseña' />
                <input type="password" placeholder='Confirmar Contraseña' />
                <p className='p-2 text-center lg:text-left'>¿Tienes ya una cuenta? 
                    <Link to='/register'>
                        <label className='text-blue-600 underline cursor-pointer ml-1'>Inicia sesión aquí</label>
                    </Link>
                </p>
                <button> Enviar </button>

            </div>
        </div>
    )
}

export default Register