<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrada Reservada</title>
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Entrada Reservada</h1>
        </div>
        <div class="content">
            <p>Hola <?php echo  $nombreUsuario.' '.$apellidosUsuario ?> ,</p>
            <p>Gracias por reservar una entrada para el evento <strong> <?php echo $nombreEvento ?></strong>.</p>
            <p>Detalles del evento:</p>
            <ul>
                <li><strong>Organizador:</strong><?php echo $empresa ?></li>
                <li><strong>Fecha:</strong> <?php echo $fecha ?></li>
                <li><strong>Hora:</strong> <?php echo $hora ?></li>
                <li><strong>Dirección:</strong> <?php echo $direccion ?></li>
                <li><strong>Ciudad:</strong> <?php echo $ciudad ?></li>
                <li><strong>Precio:</strong> <?php echo $precio ?> €</li>
                <li><strong>Cantidad de entradas:</strong> <?php echo $cantidad ?></li>
            </ul>
            <p>Nos vemos en el evento!</p>
        </div>
        <div class="footer">
            <p>Este es un mensaje generado automáticamente, por favor no respondas a este correo.</p>
            <p>&copy; <?php echo date('Y') ?> Eventia</p>
        </div>
    </div>
</body>
</html>
