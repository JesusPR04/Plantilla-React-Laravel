<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Peticiones;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;

class OrganizadorController extends Controller
{

    public function index(Request $request)
    {
        if ($request->user()->rol === "Usuario") {
            $user = $request->user()->id;
            $peticion = Peticiones::where('idUsuario', $user)->first();
            if (!isset($peticion)) {
                return response()->json([
                    'status' => true,
                ], 200);
            } else {
                if ($peticion->estado === 'En revisión') {
                    return response()->json([
                        'status' => false,
                    ], 200);
                } else {
                    return response()->json([
                        'status' => true,
                    ], 200);
                }
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Ya eres un organizador'
            ], 200);
        }
    }

    public function getCountOrganizers()
    {
        $totalOrganizers = User::where('rol', 'Organizador')->count();
        return response()->json($totalOrganizers);
    }

    public function realizarPeticion(Request $request)
    {
        $permiso = $this->index($request);
        if ($permiso->original['status']) {
            $validarPeticion = Validator::make($request->all(), [
                'empresa' => 'required|max:100',
                'dni' => 'required|regex:/^\d{8}[a-z]$/i',
                'documento' => ['required', File::types(['pdf'])->max(15 * 1024)],
                'comentario' => 'nullable|max:500'
            ]);

            if ($validarPeticion->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validacion de la petición',
                    'errors' => $validarPeticion->errors()
                ], 401);
            }

            $documento = $request->file('documento');
            $nombreFichero = time() . '_' . $documento->getClientOriginalName();

            // Guarda el documento en el Storage en la carpeta peticiones
            if ($documento->storeAs('peticiones', $nombreFichero)) {

                Peticiones::create([
                    'empresa' => $request->empresa,
                    'dni' => $request->dni,
                    'documento' => 'peticiones/' . $nombreFichero,
                    'comentario' => $request->comentario ?? null,
                    'idUsuario' => $request->user()->id
                ]);

                return response()->json([
                    'status' => true,
                    'message' => 'Petición realizada correctamente'
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Error al mover el archivo'
                ], 401);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Ya tiene una petición a su nombre'
            ], 401);
        }
    }
}
