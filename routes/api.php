<?php

use App\Models\Eventos;
use App\Models\Ciudades;
use App\Models\Entradas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\EventoController;
use App\Http\Controllers\API\EntradaController;
use App\Http\Controllers\API\UsuarioController;
use App\Http\Controllers\API\TarjetasController;
use App\Http\Controllers\API\FavoritosController;
use App\Http\Controllers\API\OrganizadorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Usuario
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    $ciudad_id=Ciudades::where('nombre',$user->ciudad)->first()->id;
    return response()->json([
        'id' => $user->id,
        'nombre' => $user->nombre,
        'apellidos' => $user->apellidos,
        'email' => $user->email,
        'rol' => $user->rol,
        'ciudad' => $user->ciudad,
        'telefono' => $user->telefono,
        'puntos' => $user->puntos,
        'ciudad_id' => $ciudad_id
    ]);
});

Route::middleware('auth:sanctum')->put('/user', [UsuarioController::class, 'updateUserData']);
Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);

// Evento
Route::post('/eventos', [EventoController::class, 'index'])->middleware('auth:sanctum');
Route::post('/storeEvent', [EventoController::class, 'store'])->middleware('auth:sanctum');
Route::get('/totalEvent', [EventoController::class, 'getCountEvent']);
//TODO: Cambiar los post por la acción pertienente
Route::put('/updateEvent/{id}', [EventoController::class, 'update']);
Route::post('/deleteEvent/{id}', [EventoController::class, 'delete']);
Route::get('/getEventos', [EventoController::class, 'getEventos']);
Route::get('/evento/{id}', [EventoController::class, 'getEventoById']);

//Entrada
Route::post('/entradas/comprar', [EntradaController::class, 'comprar'])->middleware('auth:sanctum');
Route::get('/cancelarEntrada/{id}', [EntradaController::class, 'cancelarEntrada'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/entradas', function (Request $request) {
    $user = $request->user();
    $entradas = Entradas::where('idUsuario', $user->id)->with('evento')->get();
    foreach ($entradas as $entrada) {
        $evento = $entrada->evento;
        $imagenes = Eventos::with('imagenes')->find($evento->id);
        $entrada->evento->imagenes = $imagenes->imagenes;
    }  
    return response()->json($entradas);
});

// Organizador
Route::get('/totalOrganizers', [OrganizadorController::class, 'getCountOrganizers']);
Route::post('/organizador', [OrganizadorController::class, 'realizarPeticion'])->middleware('auth:sanctum'); //Realiza la petición para organizador
Route::get('/organizador', [OrganizadorController::class, 'index'])->middleware('auth:sanctum'); //Comprueba si ya hay una petición de organizador
Route::middleware('auth:sanctum')->get('/miseventos', function (Request $request) {
    $user = $request->user();
    $eventos = Eventos::with(['imagenes', 'ciudad', 'categoria'])->where('idOrganizador', $user->id)->get();
    return response()->json($eventos);
});

// Admin
Route::post('/admin', [AdminController::class, 'index'])->middleware('auth:sanctum'); //Comprueba el rol para acceder a la página
Route::get('/peticiones', [AdminController::class, 'peticiones'])->middleware(('auth:sanctum')); //Recoge las peticiones para colaborador
Route::post('/descargarArchivo', [AdminController::class, 'descargarArchivo'])->middleware(('auth:sanctum')); //Recoge las peticiones para colaborador
Route::post('/comprobarSolicitud', [AdminController::class, 'comprobarSolicitud'])->middleware('auth:sanctum'); //Comprueba el resultado de la solicitud

// Favoritos
Route::post('/favorito', [FavoritosController::class, 'index'])->middleware('auth:sanctum');
Route::post('/marcarFavorito', [FavoritosController::class, 'marcarFavorito'])->middleware('auth:sanctum');
Route::post('/misFavoritos', [FavoritosController::class, 'misFavoritos'])->middleware('auth:sanctum');

// Tarjetas
Route::get('/tarjetas', [TarjetasController::class, 'index'])->middleware('auth:sanctum');
Route::post('/tarjetas', [TarjetasController::class, 'store'])->middleware('auth:sanctum');
Route::get('/tarjetas/{id}', [TarjetasController::class, 'show'])->middleware('auth:sanctum');
Route::put('/tarjetas', [TarjetasController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/tarjetas/{id}', [TarjetasController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/prueba',function(){
    return response()->json([
        "mensaje"=>"TODO OK"
    ]);
});