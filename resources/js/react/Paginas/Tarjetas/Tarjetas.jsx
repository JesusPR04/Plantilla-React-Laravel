import React, { useState, useEffect } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { FiCreditCard } from "react-icons/fi";
import { añadirTarjeta, editarTarjeta, borrarTarjeta, getTarjetas } from '../../api/requests'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tarjetas = () => {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({
    numero: '',
    caducidad: '',
    cvv: ''
  });
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const tarjetas = await getTarjetas();
    setCards(tarjetas);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleAddCard = async () => {
    const response = await añadirTarjeta(form)
    if (response.status) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    loadCards();
    setForm({
      numero: '',
      caducidad: '',
      cvv: '',
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.id]: e.target.value });
  };

  const handleEditCard = async (id) => {
    const response = await editarTarjeta(id, editForm);
    if (response.status) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    loadCards();
    setEditForm(null);
  };

  const handleDeleteCard = async (id) => {
    const response = await borrarTarjeta(id);
    if (response.status) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    loadCards();
  };

  const maskCardNumber = (cardNumber) => {
    const firstFour = cardNumber.slice(0, 4)
    const lastFour = cardNumber.slice(-4)
    const middleHidden = 'X'.repeat(cardNumber.length - 8)
    const hiddenWithSpaces = middleHidden.replace(/(.{4})/g, '$1 ')
    return `${firstFour} ${hiddenWithSpaces} ${lastFour}`
  }

  return (
    <main className='min-h-[calc(100vh-436px)] bg-gray-100 p-10 text-colorFuente'>
      <ToastContainer />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-bold leading-none tracking-tight uppercase">Agregar 
              <span className='text-blue-500'> Tarjeta de Crédito</span></h3>
            <p className="text-sm text-colorFuente pt-2">
                ¡ <span className='text-blue-500 font-semibold'>Importante</span> todos los campos son <span
                    className="bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block"
                > Requeridos</span> !
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-colorFuente" htmlFor="numero">
                Número de Tarjeta
              </label>
              <input className="flex h-10 w-full rounded-md border border-input px-3 py-2 sm:text-sm bg-gray-50 border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="numero" placeholder="0000 0000 0000 0000" type="text" value={form.numero} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 col-span-1">
                <label className="text-sm font-medium text-colorFuente" htmlFor="caducidad">
                  Mes/Año
                </label>
                <input className="flex h-10 w-full rounded-md border border-input px-3 py-2 sm:text-sm bg-gray-50 border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="caducidad" placeholder="MM/YY" type="text" value={form.caducidad} onChange={handleChange} />
              </div>
              <div className="space-y-2 col-span-1">
                <label className="text-sm font-medium text-colorFuente" htmlFor="cvv">
                  CVC
                </label>
                <input className="flex h-10 w-full rounded-md border border-input px-3 py-2 sm:text-sm bg-gray-50 border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="cvv" placeholder="123" type="text" value={form.cvv} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="flex items-center p-6">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded text-white font-bold  h-10 px-4 py-2 ml-auto bg-blue-500 hover:bg-blue-700"
              onClick={()=>handleAddCard()}>
              Agregar Tarjeta
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-white text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-bold leading-none tracking-tight uppercase text-colorFuente">Tarjetas de Crédito</h3>
          </div>
          <div className="p-6 space-y-4">
            {cards.length == 0 ? (
              <p className="text-center text-colorFuente">No hay tarjetas disponibles</p>
            ) : (
              cards.map((card) => (
                <div key={card.id} className="grid gap-4">
                  <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-y-0 items-center justify-between">
                    <div className="flex items-start gap-4">
                      <FiCreditCard className="h-8 w-8" />
                      <div>
                        <div className="font-medium text-colorFuente">
                          {maskCardNumber(card.numero)}
                        </div>
                        <div className="text-sm text-gray-400">Expira {card.caducidad}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded text-white font-bold  h-10 px-4 py-2 ml-auto bg-blue-500 hover:bg-blue-700"
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
                    <div className={`space-y-4`}>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-colorFuente" htmlFor="numero">
                          Número de Tarjeta
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-input px-3 py-2 sm:text-sm bg-gray-50 border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          id="numero" placeholder="0000 0000 0000 0000" type="text" value={editForm.numero} onChange={handleEditChange} />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-1">
                          <label className="text-sm font-medium text-colorFuente" htmlFor="caducidad">
                            Mes/Año
                          </label>
                          <input className="flex h-10 w-full rounded-md border border-input px-3 py-2 sm:text-sm bg-gray-50 border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="caducidad" placeholder="MM/YY" type="text" value={editForm.caducidad} onChange={handleEditChange} />
                        </div>
                        <div className="space-y-2 col-span-1">
                          <label className="text-sm font-medium text-colorFuente" htmlFor="cvv">
                            CVC
                          </label>
                          <input className="flex h-10 w-full rounded-md border border-input px-3 py-2 sm:text-sm bg-gray-50 border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="cvv" placeholder="123" type="text" value={editForm.cvv} onChange={handleEditChange} />
                        </div>
                      </div>
                      <div className="flex items-center py-6 gap-x-2">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded text-white font-bold  h-10 px-4 py-2 ml-auto bg-blue-500 hover:bg-blue-700"
                          onClick={() => handleEditCard(card.id)}>
                          Guardar Cambios
                        </button>
                        <button
                            className='bg-red-500 hover hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                            onClick={() => setEditForm(null)}
                        >
                            Cancelar
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
