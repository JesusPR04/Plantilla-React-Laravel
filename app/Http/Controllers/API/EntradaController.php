<?php
// app/Http/Controllers/EntradaController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Entradas;
use App\Models\User;
use App\Models\Eventos;

class EntradaController extends Controller
{
    public function comprar(Request $request)
    {
        $validated = $request->validate([
            'idUsuario' => 'required|exists:usuarios,id',
            'idEvento' => 'required|exists:eventos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        $evento = Eventos::findOrFail($validated['idEvento']);

        $entrada = Entradas::create([
            'idUsuario' => $validated['idUsuario'],
            'idEvento' => $validated['idEvento'],
            'cantidad' => $validated['cantidad'],
        ]);

        // Calcular puntos ganados
        $puntosGanados = $evento->precio * $validated['cantidad']; // Ejemplo: 10 puntos por cada entrada

        // Actualizar puntos del usuario
        $user = User::findOrFail($validated['idUsuario']);
        $user->puntos += $puntosGanados;
        $user->save();

        return response()->json($entrada, 201);
    }
}
