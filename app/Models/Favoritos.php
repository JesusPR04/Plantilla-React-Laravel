<?php

namespace App\Models;

use App\Models\User;
use App\Models\Eventos;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Favoritos extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "favoritos";
    protected $fillable = [
        'idUsuario',
        'idEvento'
    ];

    public function usuario(){
        return $this->belongsTo(User::class, 'idUsuario');
    }
    public function evento(){
        return $this->belongsTo(Eventos::class, 'idEvento');
    }
}
