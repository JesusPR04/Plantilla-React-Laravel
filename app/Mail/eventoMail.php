<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class eventoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $empresa;
    public $nombreEvento;

    public $nombreOrganizador;
    public $apellidosOrganizador;
    public $nombreUsuario;
    public $apellidosUsuario;
    public $fecha;
    public $hora;
    public $precio;
    public $organizador;
    public $ciudad;
    public $direccion;
    public $cantidad;

    /**
     * Create a new message instance.
     */
    public function __construct($empresa, $nombreOrganizador,$apellidosOrganizador,$nombreUsuario,$apellidosUsuario,$nombreEvento, $fecha, $hora, $direccion, $precio, $ciudad, $organizador, $cantidad) //Constructor
    {
        $this->empresa = $empresa;
        $this->nombreEvento = $nombreEvento;
        $this->nombreOrganizador = $nombreOrganizador;
        $this->apellidosOrganizador = $apellidosOrganizador;
        $this->nombreUsuario = $nombreUsuario;
        $this->apellidosUsuario = $apellidosUsuario;
        $this->fecha = $fecha;
        $this->hora = $hora;
        $this->direccion = $direccion;
        $this->precio = $precio;
        $this->ciudad = $ciudad;
        $this->organizador = $organizador;
        $this->cantidad = $cantidad;
    }
    
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('eventia.eventos.spain@gmail.com', 'Eventia'),
            subject: 'Entrada reservada',
        );
    }
    public function build()
    {
        return $this->view('email.evento');
    }
    
}
