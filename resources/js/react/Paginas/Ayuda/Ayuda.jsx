import React from 'react';
import { Link } from 'react-router-dom';

const Ayuda = () => {

    const token = localStorage.getItem('user-token')
    console.log(token);
    return (
        <div className="bg-gray-100 text-colorFuente rounded shadow p-3">
            <div className="card flex-col items-center justify-center max-w-5xl mx-auto py-10">
                <div className="card-body bg-blue-100 border border-blue-500 p-4 mb-4">
                    <p className="text-colorFuente mb-4">
                        Somos una empresa líder en la organización de eventos, especializada en crear experiencias inolvidables para nuestros clientes. Con un equipo de profesionales altamente capacitados y creativos, nos esforzamos por superar las expectativas en cada proyecto que emprendemos.
                    </p>
                    <p className="text-colorFuente mb-4">
                        Nuestro enfoque se basa en la atención al detalle y la personalización de cada evento. Nos aseguramos de entender las necesidades y deseos de nuestros clientes para diseñar y ejecutar eventos únicos y memorables. Ya sea una boda, una conferencia o una fiesta corporativa, nos encargamos de cada aspecto, desde la planificación hasta la implementación.
                    </p>
                    <p className="text-colorFuente mb-4">
                        En nuestra empresa, la calidad y la excelencia son nuestros pilares fundamentales. Trabajamos con los mejores proveedores y utilizamos las últimas tecnologías para garantizar que cada evento sea un éxito. Además, nos enorgullece ofrecer un servicio al cliente excepcional, brindando atención personalizada y soluciones rápidas a cualquier consulta o solicitud.
                    </p>
                    <p className="text-colorFuente mb-4">
                        Si estás buscando una empresa de eventos confiable y creativa, no busques más. Permítenos hacer realidad tus sueños y crear momentos inolvidables juntos. ¡Contáctanos hoy mismo para comenzar a planificar tu próximo evento <Link className={`${token && 'hidden'} text-blue-500 hover:text-blue-700 font-semibold`}><span className='text-colorFuente font-normal'>o</span> registrate</Link> y empieza a crear eventos desde ya!
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-blue-500 uppercase mb-4">Contáctanos</h2>
                    <p className="text-colorFuente mb-4">Para cualquier consulta o asistencia, no dudes en contactarnos:</p>
                    <ul className="list-disc pl-6">
                        <li>
                            <span className='font-bold text-blue-500'>Email</span> 
                            <span className='font-semibold'>: eventia@gmail.com</span>
                        </li>
                        <li>
                            <span className='font-bold text-blue-500'>Teléfono</span> 
                            <span className='font-semibold'>: +34 646-456-789</span>
                        </li>
                        <li>
                            <span className='font-bold text-blue-500'>Dirección</span> 
                            <span className='font-semibold'>: Calle Felipe II, 8 14006 Córdoba, España</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Ayuda;