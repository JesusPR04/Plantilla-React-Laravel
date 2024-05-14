<?php

namespace App\Http\Controllers\API;

use App\Models\Peticiones;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class OrganizadorController extends Controller
{
    public function realizarPeticion(Request $request)
    {
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
        $documento = $_FILES['documento'];
        $nombreFichero = 'peticiones/' . time().'_'.$documento['name'];
        // Ruta de destino
        $rutaDestino = storage_path($nombreFichero);
        // Mover el archivo a la ubicación deseada
        if (move_uploaded_file($documento['tmp_name'], $rutaDestino)) {

            Peticiones::create([
                'empresa' => $request->empresa,
                'dni' => $request->dni,
                'documento' => $nombreFichero,
                'comentario' => $request->comentario ?? null,
                'idUsuario' => 1
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Petición realizada correctamente'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Error al mover el archivo'
            ], 401);
        }
        /* 
        return response()->json([
            'status' => true,
            'message' => $documento//'Petición recibida correctamente'
        ]); */
        /* try {
            $validarPeticion = Validator::make($request->all(), [
                'empresa' => 'required|max:100',
                'dni' => 'required|regex:/^\d{8}[a-z]$/i',
                'documento' => ['required', File::types(['pdf'])->max(12 * 1024)],
                'comentario' => 'nullable|max:500'
            ]);

            if ($validarPeticion->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validacion de la petición',
                    'errors' => $validarPeticion->errors()
                ], 401);
            }
            Peticiones::create([
                'empresa' => $request->empresa,
                'dni' => $request->dni,
                'documento' => $request->documento,
                'comentario' => $request->comentario,
                'idUsuario' => $request->user()->id
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Petición realizada correctamente'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ]);
        } */
    }
}