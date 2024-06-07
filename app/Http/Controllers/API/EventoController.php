<?php

namespace App\Http\Controllers\API;

use App\Models\Eventos;
use App\Models\Imagenes;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class EventoController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->rol === 'Usuario') {
            return response()->json([
                'status' => false,
                'message' => 'No tienes permisos para acceder a este recurso'
            ], 403);
        } else {
            return response()->json([
                'status' => true,
                'message' => 'Acceso concedido a mis eventos'
            ], 200);
        }
    }
    public function getEventos(Request $request)
    {

        $query = Eventos::with(['imagenes', 'ciudad']);

        if (!is_null($request->input('fechaDesde'))) {
            $query->where('fecha', '>=', $request->input('fechaDesde'));
        }
        //$users->where('name', 'like', '%' . $name . '%');
        if (!is_null($request->input('fechaHasta'))) {
            $query->where('fecha', '<=', $request->input('fechaHasta'));
        }

        if (!is_null($request->input('aforoMin'))) {
            $query->where('aforoDisponible', '>=', $request->input('aforoMin'));
        }

        if (!is_null($request->input('aforoMax'))) {
            $query->where('aforoDisponible', '<=', $request->input('aforoMax'));
        }

        if (!is_null($request->input('agotado'))) {
            $agotado = $request->input('agotado') ? 0 : 1;
            $query->where('aforoDisponible', $agotado);
        }

        if (!is_null($request->input('categoria')) && $request->input('categoria') !== 'null') {
            $query->where('idCategoria', $request->input('categoria'));
        }

        if (!is_null($request->input('precioMin')) && $request->input('precioMin') != 0) {
            $query->where('precio', '>=', $request->input('precioMin'));
        }

        if (!is_null($request->input('precioMax'))) {
            $query->where('precio', '<=', $request->input('precioMax'));
        }

        if (!is_null($request->input('ciudad'))) {
            $query->where('idCiudad', $request->input('ciudad'));
        }

        if (!is_null($request->input('nombre'))) {
            $query->where('nombre', 'like', '%' . $request->input('nombre') . '%');
        }

        $query->orderBy('fecha', 'ASC');

        $eventos = $query->get();

        return response()->json($eventos);
    }

    public function getCountEvent()
    {
        $totalEvent = Eventos::count();
        return response()->json($totalEvent);
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
        $mensajes = [
            'required' => 'El campo :attribute es obligatorio',
            'regex' => 'El formato del campo :attribute no es correcto',
            'integer' => 'El campo :attribute debe ser numérico',
            'min' => 'El minimo del campo :attribute es 0',
            'mimes' => 'El formato de las imagenes debe ser jpeg, png, jpg o gif',
            'image' => 'El campo :attribute debe ser una imagen'
        ];
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'precio' => 'required|integer|min:0',
            'hora' => 'required|regex:/\d{2}\:\d{2}/',
            'fecha' => 'required|regex:/\d{4}\-\d{2}\-\d{2}/',
            'aforoTotal' => 'required|integer|min:0',
            'aforoDisponible' => 'required|integer|min:0',
            'descripcion' => 'required|string',
            'idOrganizador' => 'required|integer',
            'ciudad' => 'required|integer',
            'categoria' => 'required|integer',
            'localizacion' => 'required|string',
            'imagenes.*' => ['required', File::image()->types(['jpeg', 'jpg', 'png', 'gif'])->max(15 * 1024)] // Valida cada imagen individualmente
        ], $mensajes);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()
            ], 400);
        }

        $evento = new Eventos();
        $evento->nombre = $request->nombre;
        $evento->hora = $request->hora;
        $evento->fecha = $request->fecha;
        $evento->localizacion = $request->localizacion;
        $evento->aforoTotal = $request->aforoTotal;
        $evento->aforoDisponible = $request->aforoDisponible;
        $evento->idCategoria = $request->categoria;
        $evento->descripcion = $request->descripcion;
        $evento->precio = $request->precio;
        $evento->idOrganizador = $request->idOrganizador;
        $evento->idCiudad = $request->ciudad;

        $evento->save();

        // Comprueba si en la solicitud ($request) hay un archivo con el nombre imagenes.
        if ($request->hasFile('imagenes')) {
            // Iteración sobre cada imagen
            foreach ($request->file('imagenes') as $image) {
                $uuid = Str::uuid(); // Genera un UUID único
                // Nombre de la imagen idEvento más id único aleatorio más la extensión de la imagen
                $imageName = 'Event' . $evento->id . '_' . $uuid . '.' . $image->getClientOriginalExtension();
                // Guarda la imagen en la carpeta 
                $image->move(resource_path('js/react/assets/images'), $imageName);

                $imagen = new Imagenes();
                $imagen->ruta = 'images/' . $imageName; // Guarda la ruta de la imagen
                $imagen->idEvento = $evento->id; // Asocia la imagen con el evento
                $imagen->save();
            }
        }

        if ($evento) {
            return response()->json([
                'status' => true,
                'message' => 'Evento creado correctamente'
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Error al crear el evento'
            ], 500);
        }
    }

    //TODO: CAMBIAR EL DIRECTORIO DE ACTUALIZAR Y BORRAR IMAGENES
    public function update(Request $request, $id)
    {
        $mensajes = [
            'required' => 'El campo :attribute es obligatorio',
            'regex' => 'El formato del campo :attribute no es correcto',
            'integer' => 'El campo :attribute debe ser numérico',
            'min' => 'El minimo del campo :attribute es 0',
            'mimes' => 'El formato de las imagenes debe ser jpeg, png, jpg o gif',
            'image' => 'El campo :attribute debe ser una imagen'
        ];

        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'hora' => 'required|regex:/\d{2}\:\d{2}/',
            'fecha' => 'required|regex:/\d{4}\-\d{2}\-\d{2}/',
            'localizacion' => 'required|string',
            'ciudad' => 'required|integer',
            'categoria' => 'required|integer',
            'aforoTotal' => 'required|integer|min:0',
            'aforoDisponible' => 'required|integer|min:0',
            'precio' => 'required|integer|min:0',
            'idOrganizador' => 'required|integer',
            'descripcion' => 'required|string',
            'imagenes.*' => ['required', File::image()->types(['jpeg', 'jpg', 'png', 'gif'])->max(15 * 1024)] // Valida cada imagen individualmente
        ], $mensajes);

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

    public function delete(Request $request, $id)
    {
        // Verificar si el ID es válido
        if (!is_numeric($id) || $id <= 0) {
            return response()->json([
                'status' => false,
                "message" => "ID de evento no válido"
            ], 400);
        }
        // Buscar el evento a eliminar
        $evento = Eventos::where('id', $id)->where('idOrganizador', $request->user()->id)->first();

        if (is_null($evento)) {
            return response()->json([
                'status' => false,
                "message" => "Evento no encontrado"
            ], 404);
        }

        // Eliminar el evento
        if ($evento->delete()) {
            return response()->json([
                'status' => true,
                "message" => "Evento borrado correctamente"
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                "message" => "Error al borrar el evento"
            ], 400);
        }
    }
}
