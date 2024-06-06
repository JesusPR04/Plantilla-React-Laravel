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

    </head>
    <body>
       <div id='root'></div>
    </body>
</html>
