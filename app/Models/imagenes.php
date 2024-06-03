<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagenes extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'imagenes';
    
    protected $fillable = [
        'ruta',
        'idEvento'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    // Relación con Evento
    public function evento()
    {
        return $this->belongsTo(Eventos::class, 'idEvento');
    }
}
