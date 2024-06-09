import React from 'react'
import Card from './Card'
import avatarJesus from '../../assets/Avatar_Jesus.jpg'
import avatarJose from '../../assets/Avatar_Jose.jpeg'
import avatarPablo from '../../assets/pablofoto.png'

function SobreNosotros() {
    return (
        <main className='bg-gray-100 min-h-[calc(100vh-436px)]'>
            <section className="about-us-intro bg-gray-100 py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-blue-500 uppercase">Sobre Nosotros</h2>
                    <p className="mt-4 text-lg text-colorFuente">
                        En <span className='text-blue-500 font-bold'>EVENTIA</span>, estamos dedicados a conectar a las personas con experiencias únicas a través de la compra y promoción de entradas para eventos.
                        Nuestro objetivo es hacer que cada evento sea accesible y memorable, ya sea un concierto, una obra de teatro, una conferencia o una fiesta.
                    </p>
                    <p className="mt-4 text-lg text-gray-700">
                        Creemos en la importancia de la comunidad y trabajamos incansablemente para apoyar tanto a los asistentes como a los organizadores de eventos.
                        Nuestro equipo combina tecnología innovadora con una profunda comprensión de la industria para ofrecer una plataforma que facilite la gestión y la promoción de eventos, garantizando una experiencia fluida y emocionante para todos.
                    </p>
                </div>
            </section>

            <section className="team py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h3 className="text-3xl font-bold text-blue-500 uppercase">Nuestro Equipo</h3>
                    <p className="mt-4 text-lg text-colorFuente">
                        Conozca a los expertos que hacen posible estas soluciones. Cada miembro del equipo aporta una combinación única de habilidades, experiencia y pasión por los eventos y la tecnología.
                        Estamos comprometidos a brindar el mejor servicio y a crear experiencias inolvidables para nuestros usuarios.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <Card 
                            avatar={avatarJesus}
                            nombre={"Jesús Pastor Robles"} 
                            email={"jpr0014@alu.medac.es"}
                            especialidad={"Desarrollador Web"}
                            descripcion={"Jesús es un desarrollador frontend apasionado por crear interfaces de usuario atractivas e interactivas. Con experiencia en React, JavaScript y TailwindCSS, transforma diseños en experiencias digitales fluidas y responsivas."}
                            habilidades={['React', 'JavaScript', 'TailwindCSS']}
                        />
                        <Card 
                            avatar={''}
                            nombre={"Diego Mendigorri Pérez"} 
                            email={"dmp0005@alu.medac.es"}
                            especialidad={"Desarrollador Web"}
                            descripcion={"Diego es un desarrollador backend apasionado por construir y optimizar sistemas robustos y escalables. Con experiencia en Laravel, PHP y bases de datos MySQL, se encarga de la lógica del servidor y la gestión de bases de datos."}
                            habilidades={['Laravel', 'PHP', 'Base de datos MySQL']}
                        />
                        <Card 
                            avatar={avatarPablo}
                            nombre={"Pablo Rino Flores"} 
                            email={"prf0005@alu.medac.es"}
                            especialidad={"Desarrollador Web"}
                            descripcion={"Pablo es un desarrollador backend apasionado por la creación de soluciones escalables y eficientes. Con experiencia en Laravel, PHP y bases de datos MySQL, se asegura entre otras cosas que la aplicación funcione de manera óptima y segura."}
                            habilidades={['Laravel', 'PHP', 'Base de datos MySQL']}
                        />
                        <Card 
                            avatar={avatarJose}
                            nombre={"José Ignacio Palma Carrillo"} 
                            email={"jpc0016@alu.medac.es"}
                            especialidad={"Desarrollador Web"}
                            descripcion={"José es un desarrollador backend con una pasión por la creación de sistemas robustos y escalables. Con experiencia en Laravel, PHP y bases de datos MySQL, se especializa en el diseño y desarrollo de la lógica del servidor y la implementación de APIs eficientes."}
                            habilidades={['Laravel', 'PHP', 'Base de datos MySQL']}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SobreNosotros