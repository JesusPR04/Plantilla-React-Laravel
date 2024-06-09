<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Petición Aceptada</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #333;
        }
        .content {
            margin-bottom: 20px;
        }
        .content p {
            margin: 0 0 10px;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 0.8em;
        }

        #tituloEventia {
            text-transform: uppercase;
            color: #4299e1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡ Bienvenido a <span id="tituloEventia">Eventia</span> <?php echo $nombre ?></h1>
        </div>
        <div class="content">
            <p>¡Nos complace darte la bienvenida a la familia de Eventia! Estamos emocionados de tenerte como parte de nuestra comunidad de organizadores de eventos.</p>
            <p>Con Eventia, tienes la oportunidad de dar vida a tus eventos y conectar con una audiencia apasionada. Desde conferencias hasta grandes festivales, nuestro objetivo es proporcionarte las herramientas y el apoyo que necesitas para que tus eventos sean un éxito rotundo.</p>
            <p>Estamos aquí para ayudarte en cada paso del camino. Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte en cualquier momento.</p>
            <p>Gracias por unirte a nosotros en esta emocionante aventura. ¡Esperamos ver tus eventos brillar en Eventia!</p>
            <p>Saludos cordiales,</p>
            <p>El equipo de Eventia</p>
        </div>
        <div class="footer">
            <p>Este es un mensaje generado automáticamente, por favor no respondas a este correo.</p>
            <p>&copy; <?php echo date('Y') ?> Eventia</p>
        </div>
    </div>
</body>
</html>