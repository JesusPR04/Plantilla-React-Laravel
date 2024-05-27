<?php

namespace App\Http\Controllers\API;

use App\Models\Eventos;
use App\Models\Imagenes;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EventoController extends Controller
{
    public function getEventos(Request $request)
    {
        $query = "SELECT e.* , i.ruta FROM eventos e
        LEFT JOIN  imagenes i on i.idEvento=e.id";

        $filtros = [];

        if (!is_null($request->input('fechaDesde'))) {
            $filtros[] = "fecha >= '" . $request->input('fechaDesde') . "'";
        }

        if (!is_null($request->input('fechaHasta'))) {
            $filtros[] = "fecha <= '" . $request->input('fechaHasta') . "'";
        }

        if (!is_null($request->input('aforoMin'))) {
            $filtros[] = "aforoDisponible >= " . $request->input('aforoMin');
        }

        if (!is_null($request->input('aforoMax'))) {
            $filtros[] = "aforoDisponible <= " . $request->input('aforoMax');
        }

        if (!is_null($request->input('agotado'))) {
            $agotado = $request->input('agotado') ? 0 : 1;
            $filtros[] = "aforoDisponible = " . $agotado;
        }

        if (!is_null($request->input('categoria'))) {
            $filtros[] = "idCategoria = '" . $request->input('categoria') . "'";
        }

        if (!is_null($request->input('precioMin'))) {
            $filtros[] = "precio >= " . $request->input('precioMin');
        }

        if (!is_null($request->input('precioMax'))) {
            $filtros[] = "precio <= " . $request->input('precioMax');
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


    public function getEventoById(Request $request, $id)
    {
        try {
            $evento = Eventos::with(['organizador', 'ciudad', 'categoria', 'imagenes'])->findOrFail($id);
            return response()->json($evento);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Evento no encontrado'], 404);
        }
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'precio' => 'required',
            'hora' => 'required',
            'fecha' => 'required',
            'aforoTotal' => 'required',
            'descripcion' => 'required',
            'idOrganizador' => 'required',
            'idCiudad' => 'required',
            'imagenes.*' => 'required|image|mimes:jpeg,png,jpg,gif' // Valida cada imagen individualmente
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
        $evento->idCategoria = $request->idCategoria;
        $evento->descripcion = $request->descripcion;
        $evento->precio = $request->precio;
        $evento->idOrganizador = $request->idOrganizador;
        $evento->idCiudad = $request->idCiudad;

        $evento->save();

        // Comprueba si en la solicitud ($request) hay un archivo con el nombre imagenes.
        if ($request->hasFile('imagenes')) {
            // Iteración sobre cada imagen
            foreach ($request->file('imagenes') as $image) {
                $uuid = Str::uuid(); // Genera un UUID único
                // Nombre de la imagen idEvento más id único aleatorio más la extensión de la imagen
                $imageName = 'Event' . $evento->id . '_' . $uuid . '.' . $image->getClientOriginalExtension();
                // Guarda la imagen en la carpeta 'public/images'
                $image->move(public_path('images'), $imageName);

                $imagen = new Imagenes();
                $imagen->ruta = 'images/' . $imageName; // Guarda la ruta de la imagen
                $imagen->idEvento = $evento->id; // Asocia la imagen con el evento
                $imagen->save();
            }
        }

        return response()->json($evento, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'precio' => 'required',
            'hora' => 'required',
            'fecha' => 'required',
            'aforoTotal' => 'required',
            'descripcion' => 'required',
            'idOrganizador' => 'required',
            'idCiudad' => 'required',
            'imagenes.*' => 'image|mimes:jpeg,png,jpg,gif' // Valida cada imagen individualmente, al actualizar evento no es obligatorio
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
        $evento->idCategoria = $request->idCategoria;
        $evento->descripcion = $request->descripcion;
        $evento->precio = $request->precio;
        $evento->idOrganizador = $request->idOrganizador;
        $evento->idCiudad = $request->idCiudad;

        $evento->save();

        // Maneja la eliminación de imágenes existentes
        // Imagenes a eliminar contendrá el id de la imagen o un array en caso de ser más de una
        if ($request->has('imagenes_a_eliminar')) {
            foreach ($request->imagenes_a_eliminar as $imagenId) {
                // Encuentra la imagen por su ID
                $imagen = Imagenes::find($imagenId);
                if (!is_null($imagen)) {
                    // Elimina el archivo de imagen del servidor
                    if (file_exists(public_path($imagen->ruta))) {
                        unlink(public_path($imagen->ruta));
                    }
                    // Elimina la entrada de la imagen de la base de datos
                    $imagen->delete();
                }
            }
        }

        // Comprueba si en la solicitud ($request) hay un archivo con el nombre imagenes.
        if ($request->hasFile('imagenes')) {
            // Iteración sobre cada imagen
            foreach ($request->file('imagenes') as $image) {
                $uuid = Str::uuid(); // Genera un UUID único
                // Nombre de la imagen idEvento más id único aleatorio más la extensión de la imagen
                $imageName = 'Event' . $evento->id . '_' . $uuid . '.' . $image->getClientOriginalExtension();
                // Guarda la imagen en la carpeta 'public/images'
                $image->move(public_path('images'), $imageName);

                $imagen = new Imagenes();
                $imagen->ruta = 'images/' . $imageName; // Guarda la ruta de la imagen
                $imagen->idEvento = $evento->id; // Asocia la imagen con el evento
                $imagen->save();
            }
        }

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
