<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Eventia</title>
        @viteReactRefresh
        @vite('resources/js/app.js')

        <!-- Favicon -->
        {{-- <link rel="shortcut icon" href="{{ Vite::asset('../resources/js/react/assets/favicon.ico') }}" type="image/x-icon"> --}}

        <!-- CDN Flowvite -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
    </head>
    <body>
       <div id='root'></div>
       
       <!-- Script for Flowvite -->
       <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
    </body>
</html>
