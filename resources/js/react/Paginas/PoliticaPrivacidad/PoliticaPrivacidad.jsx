import React from 'react'
import { Link } from 'react-router-dom'

function PoliticaPrivacidad() {
    return (
        <main class="bg-gray-100 min-h-[calc(100vh-436px)] p-10">
            <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 class="text-3xl font-bold text-colorFuente mb-4">Política de Privacidad de <span className='text-blue-500 uppercase font-bold'>Eventia</span></h1>
                <h2 className='font-semibold text-colorFuente text-2xl mb-6'>Última actualización: 27 de mayo de 2024</h2>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Introducción y Propósito</h2>
                    <p class="text-colorFuente"><strong>Introducción</strong><br />
                        Bienvenido a <span className='text-blue-500 uppercase font-bold'>Evenetia</span>. Esta Política de Privacidad describe cómo recopilamos, utilizamos, y protegemos su información personal cuando visita nuestro sitio web y utiliza nuestros servicios para comprar y promocionar entradas de eventos.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Información Recopilada</h2>
                    <p class="text-colorFuente"><strong>Información que Recopilamos</strong><br />
                        Recopilamos varios tipos de información en relación con los servicios que ofrecemos, incluyendo:</p>
                    <ul class="list-disc list-inside text-colorFuente ml-4">
                        <li><strong>Información Personal:</strong> nombre, apellidos, dirección de correo electrónico, número de teléfono, ciudad, y detalles de pago cuando compras entradas o promocionas eventos.</li>
                        <li><strong>Información de Navegación:</strong> datos sobre su dispositivo, dirección IP, tipo de navegador, páginas visitadas, y la fecha y hora de su visita.</li>
                        <li><strong>Cookies y Tecnologías Similares:</strong> utilizamos cookies para mejorar su experiencia en nuestro sitio web, personalizar contenido, y analizar nuestro tráfico.</li>
                    </ul>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Uso de la Información</h2>
                    <p class="text-colorFuente"><strong>Cómo utilizamos su Información</strong><br />
                        Utilizamos la información que recopilamos para:</p>
                    <ul class="list-disc list-inside text-colorFuente ml-4">
                        <li>Procesar sus compras y gestionar sus pedidos.</li>
                        <li>Comunicarnos con usted sobre su cuenta, transacciones, y eventos.</li>
                        <li>Proporcionarle soporte al cliente.</li>
                        <li>Personalizar y mejorar su experiencia en nuestro sitio web.</li>
                        <li>Realizar análisis y estudios de mercado para mejorar nuestros servicios.</li>
                    </ul>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Protección de la Información</h2>
                    <p class="text-colorFuente"><strong>Cómo protegemos su Información</strong><br />
                        Implementamos diversas medidas de seguridad para mantener la seguridad de su información personal cuando realiza un pedido o ingresa, envía, o accede a su información personal. Estas medidas incluyen el uso de servidores seguros y el cifrado de datos sensibles.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Cookies y Tecnologías Similares</h2>
                    <p class="text-colorFuente"><strong>Uso de Cookies</strong><br />
                        Nuestro sitio web utiliza cookies para distinguirlo de otros usuarios y mejorar su experiencia. Las cookies nos permiten recordar sus preferencias y visitas anteriores.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Compartir Información con Terceros</h2>
                    <p class="text-colorFuente"><strong>Divulgación a Terceros</strong><br />
                        No vendemos, comercializamos, ni transferimos su información personal a terceros sin su consentimiento, excepto para los fines de procesar sus transacciones y proporcionar servicios relacionados con eventos. Esto incluye a proveedores de servicios de pago y empresas de entrega.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Derechos de Privacidad de los Usuarios</h2>
                    <p class="text-colorFuente"><strong>Sus Derechos de Privacidad</strong><br />
                        Tiene derecho a acceder, corregir, o eliminar su información personal. Puede ejercer estos derechos contactándonos directamente. Si reside en la UE, también tiene derecho a presentar una queja ante una autoridad de protección de datos.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Cambios en la Política de Privacidad</h2>
                    <p class="text-colorFuente"><strong>Actualizaciones de la Política de Privacidad</strong><br />
                        Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Publicaremos cualquier cambio en esta página y actualizaremos la fecha de modificación en la parte superior de la política. Le recomendamos revisar esta página periódicamente para mantenerse informado sobre cómo protegemos su información.
                    </p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Información de Contacto</h2>
                    <p class="text-colorFuente"><strong>Contacto</strong><br />
                        Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad, 
                        puede contactarnos <Link to="/ayuda" className='text-blue-500 hover:underline font-bold'> aquí</Link>
                    </p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Cumplimiento Legal</h2>
                    <p class="text-colorFuente"><strong>Cumplimiento con Leyes de Privacidad</strong><br />
                        Nos comprometemos a cumplir con todas las leyes y regulaciones aplicables en materia de privacidad de datos, incluyendo el Reglamento General de Protección de Datos (GDPR).
                    </p>
                </section>
            </div>
        </main>
    )
}

export default PoliticaPrivacidad