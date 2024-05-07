<?php

namespace App\Models;

use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'descripcion',
        'precio',
        'idOrganizador',
        'idCiudad',
        'idCategoria'
    ];

    // Poder sacar el usuario que es el organizador del evento
    public function organizador()
    {
        return $this->belongsTo(User::class, 'idOrganizador');
    }
    
    // Sacar la ciudad en la que se va a hacer el evento
    public function ciudad()
    {
        return $this->belongsTo(Ciudades::class, 'idCiudad');
    }

    public function categoria()
    {
        return $this->belongsTo(Categorias::class, 'idCategoria');
    }
}
