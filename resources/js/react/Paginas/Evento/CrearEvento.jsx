import React, { useState, useEffect } from 'react';
import { getCiudades, getGenrers, fetchUserData, crearEvento } from '../../api/requests';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CrearEvento() {
    const token = localStorage.getItem('user-token');
    const [idUser, setIdUser] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            fetchUserData().then(data => data.rol === 'Organizador' && setIdUser(data.id));
        }
    }, [token]);

    const [ciudades, setCiudades] = useState([]);
    const [genrers, setGenrers] = useState([]);

    useEffect(() => {
        getCiudades().then((data) => setCiudades(data.ciudades));
        getGenrers().then((data) => setGenrers(data.categorias));
    }, []);

    const [formData, setFormData] = useState({
        nombre: '',
        hora: '',
        fecha: '',
        localizacion: '',
        idOrganizador: '',
        idCiudad: '',
        aforoTotal: '',
        aforoDisponible: '',
        idCategoria: '',
        descripcion: '',
        precio: '',
        imagenes: [],
    });

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            idOrganizador: idUser
        }));
    }, [idUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData({
            ...formData,
            [name]: selectedOption.value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        let arrayFotos = Array.from(files)
        for (let i = 0; i < files.length; i++) {
            if (arrayFotos[i].type !== 'image/png' && arrayFotos[i].type !== 'image/jpeg' && arrayFotos[i].type !== 'image/jpg') {
                arrayFotos.splice(i, 1);
            }
        }
        //Para que se vea en la vista los archivos que han quedado despues de la validacion
        let dataTransfer = new DataTransfer();
        arrayFotos.forEach(file => dataTransfer.items.add(file));
        e.target.files = dataTransfer.files;
        setFormData({
            ...formData,
            [name]: arrayFotos
        });
    };

    function enviarEvento() {
        if (formData.imagenes.length === 0) {
            setImagenes({ ...imagenes, estado: true });
            toast.error('Debe subir al menos una imagen');
        }else{
            setImagenes({ ...imagenes, estado: false });
        }
        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('hora', formData.hora);
        data.append('fecha', formData.fecha);
        data.append('localizacion', formData.localizacion);
        data.append('idOrganizador', formData.idOrganizador);
        data.append('ciudad', formData.idCiudad);
        data.append('aforoTotal', formData.aforoTotal);
        data.append('aforoDisponible', formData.aforoDisponible);
        data.append('categoria', formData.idCategoria);
        data.append('descripcion', formData.descripcion);
        data.append('precio', formData.precio);
        for (let i = 0; i < formData.imagenes.length; i++) {
            data.append(`imagenes[${i}]`, formData.imagenes[i]);
        }

        crearEvento(data)
            .then(response => comprobarEstado(response))
            .catch(err => {
                toast.error('Error al crear el evento');
                console.error(err);
            });
    }
    const [nombre, setNombre] = useState({ estado: false })
    const [hora, setHora] = useState({ estado: false })
    const [fecha, setFecha] = useState({ estado: false })
    const [localizacion, setLocalizacion] = useState({ estado: false })
    const [ciudad1, setCiudad] = useState({ estado: false })
    const [categoria, setCategoria] = useState({ estado: false })
    const [aforoTotal, setAforoTotal] = useState({ estado: false })
    const [aforoDisponible, setAforoDisponible] = useState({ estado: false })
    const [precio, setPrecio] = useState({ estado: false })
    const [imagenes, setImagenes] = useState({ estado: false })
    const [descripcion, setDescripcion] = useState({ estado: false })

    const comprobarEstado = (respuesta) => {
        if (respuesta.status) {
            setFormData('')
            toast.success('Evento creado con éxito');
            setTimeout(() => { navigate('/misEventos') }, 2000)
        } else {
            if (respuesta?.message?.nombre) { setNombre({ ...nombre, estado: true }); toast.error(respuesta.message.nombre[0]); } else { setNombre({ ...nombre, estado: false }) }
            if (respuesta?.message?.hora) { setHora({ ...hora, estado: true }); toast.error(respuesta.message.hora[0]); } else { setHora({ ...hora, estado: false }) }
            if (respuesta?.message?.fecha) { setFecha({ ...fecha, estado: true }); toast.error(respuesta.message.fecha[0]); } else { setFecha({ ...fecha, estado: false }) }
            if (respuesta?.message?.localizacion) { setLocalizacion({ ...localizacion, estado: true }); toast.error(respuesta.message.localizacion[0]); } else { setLocalizacion({ ...localizacion, estado: false }) }
            if (respuesta?.message?.ciudad) { setCiudad({ ...ciudad1, estado: true }); toast.error(respuesta.message.ciudad[0]); } else { setCiudad({ ...ciudad1, estado: false }) }
            if (respuesta?.message?.categoria) { setCategoria({ ...categoria, estado: true }); toast.error(respuesta.message.categoria[0]); } else { setCategoria({ ...categoria, estado: false }) }
            if (respuesta?.message?.aforoTotal) { setAforoTotal({ ...aforoTotal, estado: true }); toast.error(respuesta.message.aforoTotal[0]); } else { setAforoTotal({ ...aforoTotal, estado: false }) }
            if (respuesta?.message?.aforoDisponible) { setAforoDisponible({ ...aforoDisponible, estado: true }); toast.error(respuesta.message.aforoDisponible[0]); } else { setAforoDisponible({ ...aforoDisponible, estado: false }) }
            if (respuesta?.message?.precio) { setPrecio({ ...precio, estado: true }); toast.error(respuesta.message.precio[0]); } else { setPrecio({ ...precio, estado: false }) }
            if (respuesta?.message?.imagenes) { setPrecio({ ...imagenes, estado: true }); toast.error(respuesta.message.imagenes[0]); }
            if (respuesta?.message?.descripcion) { setDescripcion({ ...descripcion, estado: true }); toast.error(respuesta.message.descripcion[0]); } else { setDescripcion({ ...descripcion, estado: false }) }
        }
    }

    return (
        <main className='min-h-[calc(100vh-436px)] bg-gray-100'>
            <ToastContainer />
            <h2 className="text-3xl sm:text-4xl pt-10 font-bold tracking-tight text-colorFuente uppercase text-center">
                Patrocina tu
                <span className='text-blue-500 uppercase'> evento</span>
            </h2>
            <h2 className='px-14 sm:px-0 pb-2 pt-6 font-semibold text-colorFuente text-center'>
                Aprovecha la <span className='text-blue-500'>oportunidad</span> para dar a conocer tu
                <span className='text-blue-500 uppercase'> evento</span>
            </h2>
            <h2 className='px-14 sm:px-0 pb-2 pt-6 font-semibold text-colorFuente text-center'>
                ¡ <span className='text-blue-500'>Importante</span> todos los campos son <span
                    className="bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block"
                > Requeridos</span> !
            </h2>
            <section className='pb-12 px-14 sm:px-0 space-y-4 md:space-y-6 mx-auto max-w-xl md:max-w-3xl grid grid-cols-2 gap-x-8 justify-start items-end'>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="nombre"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        style={{ borderColor: nombre.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Nombre del evento"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="hora"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Hora
                    </label>
                    <input
                        type="time"
                        name="hora"
                        id="hora"
                        style={{ borderColor: hora.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Hora del evento"
                        value={formData.hora}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="fecha"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Fecha
                    </label>
                    <input
                        style={{ borderColor: fecha.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="fecha"
                        name='fecha'
                        type="date"
                        value={formData.fecha}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="localizacion"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Localización
                    </label>
                    <input
                        type="text"
                        name="localizacion"
                        id="localizacion"
                        style={{ borderColor: localizacion.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Localización del evento"
                        value={formData.localizacion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="ciudad"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Ciudad
                    </label>
                    <Select
                        options={ciudades.map((ciudad) => ({
                            value: ciudad.id,
                            label: ciudad.nombre,
                        }))}
                        placeholder="Ciudad"
                        isSearchable
                        noOptionsMessage={() => "Sin resultados"}
                        onChange={(selectedOption) => handleSelectChange('idCiudad', selectedOption)}
                        classNames={{
                            control: () => `!text-sm !bg-gray-50 !border  !text-colorFuente 
                                        !sm:text-sm !rounded-lg !focus:ring-blue-500 
                                        !focus:border-blue-500 !w-full !p-0.5 ${ciudad1.estado ? "!border-red-500" : "!border-gray-300"}`,
                            input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                            menuList: () => '!bg-gray-50'
                        }}
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-colorFuente" htmlFor="genrer">
                        Categoría
                    </label>
                    <Select
                        options={genrers.map((genrer) => ({
                            value: genrer.id,
                            label: genrer.nombre,
                        }))}
                        placeholder="Categoría"
                        isSearchable
                        noOptionsMessage={() => "Sin resultados"}
                        onChange={(selectedOption) => handleSelectChange('idCategoria', selectedOption)}
                        classNames={{
                            control: () => `!text-sm !bg-gray-50 !border  !text-colorFuente 
                                        !sm:text-sm !rounded-lg !focus:ring-blue-500 
                                        !focus:border-blue-500 !w-full !p-0.5 ${categoria.estado ? "!border-red-500" : "!border-gray-300"}`,
                            input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                            menuList: () => '!bg-gray-50'
                        }}
                    />
                </div>
                <div className='w-full col-span-2 sm:col-span-1'>
                    <label className="block text-sm font-medium text-colorFuente" htmlFor="aforoTotal">
                        Aforo Total {formData.aforoTotal}
                    </label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.aforoTotal}
                        onChange={handleChange}
                        id="aforoTotal"
                        name='aforoTotal'
                        max="50000"
                        min="0"
                        step="10"
                        type="range"
                    />
                </div>
                <div className='w-full col-span-2 sm:col-span-1'>
                    <label className="block text-sm font-medium text-colorFuente" htmlFor="aforoDisponible">
                        Aforo Disponible {formData.aforoDisponible}
                    </label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.aforoDisponible}
                        onChange={handleChange}
                        id="aforoDisponible"
                        name='aforoDisponible'
                        max="50000"
                        min="0"
                        step="10"
                        type="range"
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="precio"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Precio
                    </label>
                    <input
                        type="number"
                        name="precio"
                        id="precio"
                        min={0}
                        style={{ borderColor: precio.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Precio del evento"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="imagenes"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Imágenes <span className='text-red-500 font-bold'>*</span>
                    </label>
                    <input
                        type="file"
                        name="imagenes"
                        id="imagenes"
                        accept="image/png, image/jpeg, image/jpg"
                        style={{ borderColor: imagenes.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full"
                        onChange={handleFileChange}
                        multiple
                        required
                    />
                </div>
                <div className="w-full col-span-2">
                    <label
                        htmlFor="descripcion"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Descripción
                    </label>
                    <textarea
                        name='descripcion' id='descripcion' cols={50} rows={5}
                        style={{ borderColor: descripcion.estado ? 'red' : '#D3D3D3' }}
                        placeholder='Aporte información esenciál para su evento...'
                        className='bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        value={formData.descripcion}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-span-2 sm:col-span-1'>
                    <p className='font-semibold'><span className='text-red-500 font-bold'>*</span> La primera foto será la elegida como portada</p>
                </div>
                <div className='col-span-2 sm:col-span-1 flex justify-end'>
                    <input
                        type="submit" value="Crear Evento"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={() => enviarEvento()}
                    />
                </div>
            </section>
        </main>
    )
}

export default CrearEvento
