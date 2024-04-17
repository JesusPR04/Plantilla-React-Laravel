<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Eventos extends Model
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = "eventos";

    protected $fillable = [
        'nombre',
        'hora',
        'fecha',
        'localizacion',
        'aforoTotal',
        'aforoDisponible',
        'categoria',
        'descripcion',
        'precio',
        'idOrganizador',
        'idCiudad'
    ];

    // Poder sacar el usuario que es el organizador del evento
    public function organizador()
    {
        return $this->belongsTo(Usuarios::class, 'idOrganizador');
    }
    
    // Sacar la ciudad en la que se va a hacer el evento
    public function ciudad()
    {
        return $this->belongsTo(Ciudades::class, 'idCiudad');
    }
}
