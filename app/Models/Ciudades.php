<?php

namespace App\Models;


use App\Models\Eventos;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ciudades extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = "ciudades";

    protected $fillable = [
        'nombre'
    ];

    // Sacar todos los eventos que haya en la ciudad
    public function eventos(){
        return $this->hasMany(Eventos::class);
    }

}
