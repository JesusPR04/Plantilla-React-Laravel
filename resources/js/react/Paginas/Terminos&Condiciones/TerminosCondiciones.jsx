import React from 'react'
import { Link } from 'react-router-dom'

function TerminosCondiciones() {
    return (
        <main className='bg-gray-100 min-h-[calc(100vh-436px)] p-10'>
            <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 class="text-3xl font-bold text-colorFuente mb-4">Términos y Condiciones de <span className='text-blue-500 uppercase font-bold'>Eventia</span></h1>
                <h2 className='font-semibold text-colorFuente text-2xl mb-6'>Última actualización: 27 de mayo de 2024</h2>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Introducción</h2>
                    <p class="text-colorFuente"><strong>Bienvenida</strong><br />
                        Bienvenido a <span className='text-blue-500 uppercase font-bold'>Evenetia</span>. Al acceder y utilizar nuestro sitio web, acepta cumplir y estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con estos términos, por favor, no utilice nuestro sitio web.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Uso del Sitio</h2>
                    <p class="text-colorFuente"><strong>Requisitos de Uso</strong><br />
                        Usted acepta utilizar nuestro sitio web solo con fines legales y de manera que no restrinja o inhiba el uso y disfrute del sitio por parte de cualquier tercero. Está prohibido el uso de nuestro sitio web para realizar actividades fraudulentas o ilegales.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Compra de Entradas</h2>
                    <p class="text-colorFuente"><strong>Proceso de Compra</strong><br />
                        Al comprar entradas a través de nuestro sitio, acepta proporcionar información válida y precisa. Nos reservamos el derecho de cancelar cualquier pedido si sospechamos que la información proporcionada es incorrecta o fraudulenta.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Promoción de Eventos</h2>
                    <p class="text-colorFuente"><strong>Responsabilidades del Promotor</strong><br />
                        Si utiliza nuestro sitio para promocionar eventos, acepta que toda la información proporcionada sobre los eventos es precisa y actualizada. Nos reservamos el derecho de eliminar cualquier evento que consideremos inapropiado o engañoso.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Propiedad Intelectual</h2>
                    <p class="text-colorFuente"><strong>Derechos de Autor</strong><br />
                        Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, íconos, imágenes y software, es propiedad de <span className='text-blue-500 uppercase font-bold'>Evenetia</span> o sus proveedores de contenido y está protegido por las leyes de propiedad intelectual. No puede reproducir, duplicar, copiar, vender, revender ni explotar de ninguna manera el contenido sin nuestro consentimiento expreso por escrito.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Limitación de Responsabilidad</h2>
                    <p class="text-colorFuente"><strong>Exclusión de Garantías</strong><br />
                        Nuestro sitio web se proporciona "tal cual" y "según disponibilidad". No garantizamos que el sitio web será ininterrumpido, libre de errores o libre de virus. En la medida máxima permitida por la ley, renunciamos a todas las garantías, expresas o implícitas.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Modificaciones de los Términos</h2>
                    <p class="text-colorFuente"><strong>Cambios en los Términos</strong><br />
                        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en nuestro sitio web. Le recomendamos revisar estos términos periódicamente para estar informado de cualquier cambio.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-colorFuente mb-2">Ley Aplicable</h2>
                    <p class="text-colorFuente"><strong>Jurisdicción</strong><br />
                        Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de España. Cualquier disputa que surja en relación con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de España.</p>
                </section>

                <section class="mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Contacto</h2>
                    <p class="text-gray-700"><strong>Información de Contacto</strong><br />
                        Si tiene alguna pregunta sobre estos términos y condiciones, 
                        puede contactarnos <Link to="/ayuda" className='text-blue-500 hover:underline font-bold'> aquí</Link>
                    </p>
                </section>
            </div>
        </main>
    )
}

export default TerminosCondiciones