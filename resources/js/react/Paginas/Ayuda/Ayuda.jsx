import React from 'react';
import { Link } from 'react-router-dom';

const Ayuda = () => {
    return (
        <div className="bg-gray-100 rounded shadow p-3">
            <div className="card flex-col items-center justify-center">
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
                        Si estás buscando una empresa de eventos confiable y creativa, no busques más. Permítenos hacer realidad tus sueños y crear momentos inolvidables juntos. Contáctanos hoy mismo para comenzar a planificar tu próximo evento o <Link to="/register" className='hover:text-blue-700 text-blue-500'>regístrate</Link> y empieza a crear eventos desde ya¡.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
                    <p className="text-colorFuente mb-4">Para cualquier consulta o asistencia, no dudes en contactarnos:</p>
                    <ul className="list-disc pl-6">
                        <li>Email: eventia@gmail.com</li>
                        <li>Teléfono: +34 646-456-789</li>
                        <li>Dirección: 8 Calle Felipe II, Córdoba, España</li>
                    </ul>
                </div>
                   
                
            </div>
        </div>
    );
};

export default Ayuda;