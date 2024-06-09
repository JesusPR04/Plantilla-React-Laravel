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
            <h1>¡ Hola <span id="tituloEventia"><?php echo $nombre ?> </span>!</h1>
            <h3>Hemos decidido rechazar tu solicitud</h3>
        </div>
        <div class="content">
            <p>Agradecemos su interés en formar parte de nuestro equipo como organizador y el tiempo que ha dedicado a presentar su solicitud.</p>
            <p>Tras una revisión detallada de su perfil, lamentamos informarle que, en esta ocasión, no cumple con todos los requisitos necesarios para desempeñar el papel de organizador en nuestra página. Valoramos su esfuerzo y entusiasmo, y le animamos a seguir desarrollándose profesionalmente en este campo.</p>
            <p>No obstante, nos gustaría invitarle a que vuelva a intentarlo en el futuro. Si en algún momento considera que ha adquirido las competencias y experiencias necesarias, no dude en presentar una nueva solicitud a través de nuestro formulario en el siguiente <a href="https://proyecto2.medacarena.com.es/organizador">enlace</a>.</p>
            <p>Agradecemos nuevamente su interés en unirse a nuestro equipo y le deseamos mucho éxito en sus proyectos futuros.</p>
            <p>Saludos cordiales,</p>
            <p>El equipo de Eventia.</p>
        </div>
        <div class="footer">
            <p>Este es un mensaje generado automáticamente, por favor no respondas a este correo.</p>
            <p>&copy; <?php echo date('Y') ?> Eventia</p>
        </div>
    </div>
</body>
</html>