<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Eventos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EventoController extends Controller
{
    public function getEventos(Request $request)
    {
        $query = "SELECT * FROM eventos";

        $filtros = [];

        if (!is_null($request->input('fecha_desde'))) {
            $filtros[] = "fecha >= '" . $request->input('fecha_desde') . "'";
        }

        if (!is_null($request->input('fecha_hasta'))) {
            $filtros[] = "fecha <= '" . $request->input('fecha_hasta') . "'";
        }

        if (!is_null($request->input('aforo_min'))) {
            $filtros[] = "aforoDisponible >= " . $request->input('aforo_min');
        }

        if (!is_null($request->input('aforo_max'))) {
            $filtros[] = "aforoDisponible <= " . $request->input('aforo_max');
        }

        if (!is_null($request->input('agotado'))) {
            $agotado = $request->input('agotado') ? 0 : 1;
            $filtros[] = "aforoDisponible = " . $agotado;
        }

        if (!is_null($request->input('categoria'))) {
            $filtros[] = "categoria = '" . $request->input('categoria') . "'";
        }

        if (!is_null($request->input('precio_min'))) {
            $filtros[] = "precio >= " . $request->input('precio_min');
        }

        if (!is_null($request->input('precio_max'))) {
            $filtros[] = "precio <= " . $request->input('precio_max');
        }

        if (!is_null($request->input('ciudad'))) {
            $filtros[] = "idCiudad = " . $request->input('ciudad');
        }

        if (!empty($filtros)) {
            $query .= " WHERE " . implode(" AND ", $filtros);
        }

        $query .= " ORDER BY fecha ASC";

        $eventos = DB::select($query);

        return response()->json($eventos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fecha' => 'required',
            'aforoTotal' => 'required',
            'descripcion' => 'required',
            'idOrganizador' => 'required',
            'idCiudad' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $evento = new Eventos();
        $evento->nombre = $request->nombre;
        $evento->hora = $request->hora;
        $evento->fecha = $request->fecha;
        $evento->localizacion = $request->localizacion;
        $evento->aforoTotal = $request->aforoTotal;
        $evento->aforoDisponible = $request->aforoDisponible;
        $evento->categoria = $request->categoria;
        $evento->descripcion = $request->descripcion;
        $evento->precio = $request->precio;
        $evento->idOrganizador = $request->idOrganizador;
        $evento->idCiudad = $request->idCiudad;

        $evento->save();

        return response()->json($evento, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'fecha' => 'required',
            'aforoTotal' => 'required',
            'descripcion' => 'required',
            'idOrganizador' => 'required',
            'idCiudad' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $evento = Eventos::find($id);

        if (is_null($evento)) {
            return response()->json(["message" => "Evento no encontrado"]);
        }
        $evento->nombre = $request->nombre;
        $evento->hora = $request->hora;
        $evento->fecha = $request->fecha;
        $evento->localizacion = $request->localizacion;
        $evento->aforoTotal = $request->aforoTotal;
        $evento->aforoDisponible = $request->aforoDisponible;
        $evento->categoria = $request->categoria;
        $evento->descripcion = $request->descripcion;
        $evento->precio = $request->precio;
        $evento->idOrganizador = $request->idOrganizador;
        $evento->idCiudad = $request->idCiudad;

        $evento->save();

        return response()->json($evento);
    }

    public function delete($id)
    {
        // Verificar si el ID es válido
        if (!is_numeric($id) || $id <= 0) {
            return response()->json(["message" => "ID de evento no válido"], 400);
        }

        // Buscar el evento a eliminar
        $evento = Eventos::find($id);

        if (is_null($evento)) {
            return response()->json(["message" => "Evento no encontrado"], 404);
        }

        // Eliminar el evento
        $evento->delete();

        return response()->json(["message" => "Evento eliminado correctamente"], 200);
    }
}
