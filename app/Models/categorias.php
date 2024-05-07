<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categorias extends Model
{
    use HasFactory;

    protected $table = "categorias";

    protected $fillable = [
        'nombre'
    ];

    // Sacar todos los eventos que haya en la categoria
    public function eventos(){
        return $this->hasMany(Eventos::class);
    }
}
