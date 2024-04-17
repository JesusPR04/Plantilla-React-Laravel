import React from 'react'
import { Link } from 'react-router-dom'

function EventList() {

    return (
        <div class="max-w-sm bg-white border border-[#eeedf2] rounded-lg shadow mt-14">
            <Link to="">
                <img class="rounded-t-lg" src="" alt={`Imagen del evento`} />
            </Link>
            <div class="p-5">
                <Link to="">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-colorFuente">Feria 2024</h5>
                </Link>
                <p class="mb-3 font-semibold text-colorFuente">Sábado a las 01:30</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">C. Manuel Fuentes "Bocanegra", 37</p>
                <p class="mb-3 font-semibold text-colorFuente">Desde 10,00 €</p>
                <div className="flex flex-wrap justify-between">
                    <Link to="" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700">
                        Comprar
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <Link to="" class="inline-flex font-medium items-center text-blue-500 hover:underline">
                        Compartir
                        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventList