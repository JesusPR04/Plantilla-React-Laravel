import React, { useState } from 'react'

const Peticion = () => {
    const [peticion, setPeticion] = useState({
        empresa: "",
        dni: "",
        documento: "",
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

    const cambiarComentarios = (e) =>{
        setPeticion({
           ...peticion,
            comentarios: e.target.value
        })
    }
    const documento = (e) => {
        if (e.target.files[0].type !== 'application/pdf') {
            setError(true)
            e.target.value = ''
        }else{
            setError(false)
        }
    }
    const enviarPeticion = () =>{
        console.log(peticion);
    }
  return (
    <div>
        <p className="text-4xl">¿Quieres ser organizador?</p>
        <p>¡Manda una solicitud mediante este formulario para poder publicitar tus propios eventos!</p>
        <p><span className='text-red-500 font-bold'>*</span>Nombre de tu empresa</p>
        <input type="text" name="" id="" placeholder='Nombre de tu empresa' onChange={(e) => cambiarEmpresa(e)} />
        <p><span className='text-red-500 font-bold'>*</span>DNI</p>
        <input type="text" name="" id="" placeholder='DNI' onChange={(e) => cambiarDni(e)}/>
        <p><span className='text-red-500 font-bold'>*</span>Documento que te acredite como miembro de la empresa</p>
        <input type="file" name="" id="" onChange={(e) => documento(e)}/>
        <p style={{ color: 'red', display: errorVisible ? 'block' : 'none' }}>El documento deberá ser en formato .pdf</p>
        <p>Comentarios</p>
        <textarea name="" id="" cols="50" rows="5" placeholder='Comentarios sobre su solicitud...' onChange={(e) => cambiarComentarios(e)}/>
        <p>Los campos con (<span className='text-red-500 font-bold'>*</span>) son obligatorios</p>
        <input type="submit" value="Enviar"
        className="w-40 text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={() => enviarPeticion()} />
    </div>
  )
}

export default Peticion