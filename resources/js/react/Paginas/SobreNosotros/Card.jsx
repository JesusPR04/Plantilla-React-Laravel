import React from 'react'

function Card({avatar, nombre, email, especialidad, descripcion, habilidades}) {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <div className="flex items-center">
                    <div className="h-24 w-24 rounded-full border-2 border-gray-300 overflow-hidden">
                        <img src={avatar} alt={nombre} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-bold text-colorFuente">{nombre}</h2>
                        <p className="text-colorFuente">{email}</p>
                        <p className="text-colorFuente">{especialidad}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-colorFuente">Sobre</h3>
                    <p className="text-colorFuente mt-2 text-justify">{descripcion}</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-colorFuente">Habilidades</h3>
                    <div className="flex mt-2">
                        {habilidades && habilidades.length > 0 &&
                            (
                                habilidades.map((habilidad, i) => (
                                    <span key={i} className="bg-blue-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                        {habilidad}
                                    </span>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card