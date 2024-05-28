<?php
// app/Http/Controllers/EntradaController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Entradas;

class EntradaController extends Controller
{
    public function comprar(Request $request)
    {
        $validated = $request->validate([
            'idUsuario' => 'required|exists:usuarios,id',
            'idEvento' => 'required|exists:eventos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        $entrada = Entradas::create([
            'idUsuario' => $validated['idUsuario'],
            'idEvento' => $validated['idEvento'],
            'cantidad' => $validated['cantidad'],
        ]);

        return response()->json($entrada, 201);
    }
}
