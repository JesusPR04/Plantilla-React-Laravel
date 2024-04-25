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

    public $nombre;
    public $fecha;
    public $hora;
    public $nPersonas;

    /**
     * Create a new message instance.
     */
    public function __construct($nombre, $fecha, $hora, $nPersonas) //Constructor
    {
        $this->nombre = $nombre;
        $this->fecha = $fecha;
        $this->hora = $hora;
        $this->nPersonas = $nPersonas;
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
        return $this->view('correo');
    }
}
