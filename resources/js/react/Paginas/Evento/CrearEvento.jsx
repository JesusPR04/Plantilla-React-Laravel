import React, { useState, useEffect } from 'react';
import { getCiudades, getGenrers, fetchUserData, crearEvento } from '../../api/requests';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CrearEvento() {
    const token = localStorage.getItem('user-token');
    const [idUser, setIdUser] = useState(0);
    
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
        idOrganizador: 0,
        idCiudad: 0,
        aforoTotal: 0,
        aforoDisponible: 0,
        idCategoria: 0,
        descripcion: '',
        precio: 0,
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
        setFormData({
            ...formData,
            [name]: Array.from(files)
        });
    };

    function enviarEvento() {
        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('hora', formData.hora);
        data.append('fecha', formData.fecha);
        data.append('localizacion', formData.localizacion);
        data.append('idOrganizador', formData.idOrganizador);
        data.append('idCiudad', formData.idCiudad);
        data.append('aforoTotal', formData.aforoTotal);
        data.append('aforoDisponible', formData.aforoDisponible);
        data.append('idCategoria', formData.idCategoria);
        data.append('descripcion', formData.descripcion);
        data.append('precio', formData.precio);
        for (let i = 0; i < formData.imagenes.length; i++) {
            data.append(`imagenes[${i}]`, formData.imagenes[i]);
        }
        
        crearEvento(data)
            .then(response => {
                toast.success('Evento creado con éxito');
            })
            .catch(err => {
                toast.error('Error al crear el evento');
                console.error(err);
            });
    }

    return (
        <main className='min-h-[calc(100vh-436px)] bg-gray-100'>
            <ToastContainer />
            {/* Resto del código aquí */}
        </main>
    )
}

export default CrearEvento
