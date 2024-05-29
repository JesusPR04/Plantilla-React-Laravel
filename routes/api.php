<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\EventoController;
use App\Http\Controllers\API\EntradaController;
use App\Http\Controllers\API\UsuarioController;
use App\Http\Controllers\API\OrganizadorController;
use App\Models\Entradas;

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
    return response()->json([
        'id' => $user->id,
        'nombre' => $user->nombre,
        'apellidos' => $user->apellidos,
        'email' => $user->email,
        'rol' => $user->rol,
        'ciudad' => $user->ciudad,
        'telefono' => $user->telefono,
        'puntos' => $user->puntos
    ]);
});
Route::middleware('auth:sanctum')->put('/user', [UsuarioController::class, 'updateUserData']);
Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);

// Evento
Route::post('/storeEvent', [EventoController::class, 'store']);
//TODO: Cambiar los post por la acción pertienente
Route::post('/updateEvent/{id}', [EventoController::class, 'update']);
Route::post('/deleteEvent/{id}', [EventoController::class, 'delete']);
Route::get('/getEventos', [EventoController::class, 'getEventos']);
Route::get('/evento/{id}', [EventoController::class, 'getEventoById']);

//Entrada
Route::post('/entradas/comprar', [EntradaController::class, 'comprar']);
Route::middleware('auth:sanctum')->get('/entradas', function (Request $request) {
    $user = $request->user();
    $entradas = Entradas::where('idUsuario', $user->id)->with('evento')->get();
    return response()->json($entradas);
});

// Organizador
Route::post('/organizador', [OrganizadorController::class, 'realizarPeticion'])->middleware('auth:sanctum'); //Realiza la petición para organizador
Route::get('/organizador', [OrganizadorController::class, 'index'])->middleware('auth:sanctum'); //Comprueba si ya hay una petición de organizador

// Admin
Route::post('/admin', [AdminController::class, 'index'])->middleware('auth:sanctum'); //Comprueba el rol para acceder a la página
Route::get('/peticiones', [AdminController::class, 'peticiones'])->middleware(('auth:sanctum')); //Recoge las peticiones para colaborador
Route::post('/descargarArchivo', [AdminController::class, 'descargarArchivo'])->middleware(('auth:sanctum')); //Recoge las peticiones para colaborador

Route::get('/prueba',function(){
    return response()->json([
        "mensaje"=>"TODO OK"
    ]);
});