<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Eventia</title>
        @viteReactRefresh
        @vite('resources/js/app.js')
        <!-- Favicon -->
        <link rel="shortcut icon" href="{{ asset('Images/Event10_45014af6-9c0d-4cd3-b423-08a3be763672.jpg') }}" type="image/x-icon">  
    </head>
    <body>
       <div id='root'></div>
    </body>
</html>