<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorias extends Model
{
    use HasFactory;

    protected $table = "categorias";

    protected $fillable = [
        'nombre'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
    // Sacar todos los eventos que haya en la categoria
    public function eventos(){
        return $this->hasMany(Eventos::class);
    }
}
