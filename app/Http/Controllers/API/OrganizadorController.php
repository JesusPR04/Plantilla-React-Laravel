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
        $documento = $request->file('documento');
        $nombreFichero = time() . '_' . $documento->getClientOriginalName();

        // Guarda el documento en el Storage (en la carpeta 'documentos')
        if($documento->storeAs('peticiones', $nombreFichero)){

            Peticiones::create([
                'empresa' => $request->empresa,
                'dni' => $request->dni,
                'documento' => 'peticiones/' . $nombreFichero,
                'comentario' => $request->comentario ?? null,
                'idUsuario' => 1
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Petición realizada correctamente'
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Error al mover el archivo'
            ], 401);
        }
    }
}