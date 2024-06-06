import React, { useState, useEffect } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { FiCreditCard } from "react-icons/fi";
import { añadirTarjeta, editarTarjeta, borrarTarjeta, getTarjetas } from '../../api/requests'

const Tarjetas = () => {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({
    numero: '',
    caducidad: '',
    cvv: '',
    nombre: ''
  });
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    console.log(getTarjetas());
    const tarjetas = await getTarjetas();
    setCards(tarjetas);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleAddCard = async () => {
    await añadirTarjeta(form);
    loadCards();
    setForm({
      numero: '',
      caducidad: '',
      cvv: '',
      nombre: ''
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.id]: e.target.value });
  };

  const handleEditCard = async (id) => {
    await editarTarjeta(id, editForm);
    loadCards();
    setEditForm(null);
  };

  const handleDeleteCard = async (id) => {
    await borrarTarjeta(id);
    loadCards();
  };

  return (
    <main className='min-h-[calc(100vh-436px)] bg-gray-100 flex flex-col'>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Agregar Tarjeta de Crédito</h3>
            <p className="text-sm text-muted-foreground">Introduce tu información de pago.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="numero">
                Número de Tarjeta
              </label>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="numero" placeholder="0000 0000 0000 0000" type="text" value={form.numero} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 col-span-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="caducidad">
                  Mes/Año de Expiración
                </label>
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="caducidad" placeholder="MM/YY" type="text" value={form.caducidad} onChange={handleChange} />
              </div>
              <div className="space-y-2 col-span-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="cvv">
                  CVC
                </label>
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="cvv" placeholder="123" type="text" value={form.cvv} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="nombre">
                Nombre del Titular
              </label>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="nombre" placeholder="Nombre Apellidos..." type="text" value={form.nombre} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center p-6">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto"
              onClick={handleAddCard}>
              Agregar Tarjeta
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Tarjetas de Crédito</h3>
          </div>
          <div className="p-6 space-y-4">
            {cards.length == 0 ? (
              <p className="text-center text-gray-500">No hay tarjetas disponibles</p>
            ) : (
              cards.map((card) => (
                <div key={card.id} className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FiCreditCard className="h-8 w-8" />
                      <div>
                        <div className="font-medium">{card.nombre} - {card.numero.slice(-4)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Expira {card.caducidad}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        onClick={() => setEditForm(card)}>
                        Editar
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2"
                        onClick={() => handleDeleteCard(card.id)}>
                        <FaRegTrashCan />
                      </button>
                    </div>
                  </div>
                  {editForm && editForm.id === card.id && (
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="numero">
                          Número de Tarjeta
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="numero" placeholder="0000 0000 0000 0000" type="text" value={editForm.numero} onChange={handleEditChange} />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-1">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="caducidad">
                            Mes/Año de Expiración
                          </label>
                          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="caducidad" placeholder="MM/YY" type="text" value={editForm.caducidad} onChange={handleEditChange} />
                        </div>
                        <div className="space-y-2 col-span-1">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="cvv">
                            CVC
                          </label>
                          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="cvv" placeholder="123" type="text" value={editForm.cvv} onChange={handleEditChange} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="nombre">
                          Nombre del Titular
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="nombre" placeholder="Nombre Apellidos..." type="text" value={editForm.nombre} onChange={handleEditChange} />
                      </div>
                      <div className="flex items-center p-6">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto"
                          onClick={() => handleEditCard(card.id)}>
                          Guardar Cambios
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tarjetas;
