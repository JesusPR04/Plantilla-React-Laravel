import { PATH_API } from './env.js'

export const login = async (email, password) => {
  try {
    const response = await fetch(`${PATH_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (name, surname, email, city, telephone, password) => {
  const url = `${PATH_API}/register`
  const options = {
    method: 'Post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nombre: name,
      apellidos: surname,
      email: email,
      ciudad: city,
      telefono: telephone,
      password: password,
    })
  }

  try {
    const response = await fetch(url, options)
    const data = response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getCiudades = async () => {
  const url = `${PATH_API}/ciudades`
  try {
    const response = await fetch(url)
    const data = response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getGenrers = async () => {
  const url = `${PATH_API}/categorias`
  try {
    
    const response = await fetch(url)
    const data = response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getTotalEvents = async () => {
  const url = `${PATH_API}/totalEvent`
  try {
    const response = await fetch(url)
    const data = response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getTotalOrganizers = async () => {
  const url = `${PATH_API}/totalOrganizers`
  try {
    const response = await fetch(url)
    const data = response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const organizador = async (formData) => {
  const token = localStorage.getItem('user-token');
  const url = `${PATH_API}/organizador`
  const options = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: "Post",
    body: formData
  };

  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const crearEvento = async (formData) => {
  const token = localStorage.getItem('user-token');

  if (!token) {
    throw new Error('No token found');
  }

  const url = `${PATH_API}/storeEvent`
  const options = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: "POST",
    body: formData
  }
  try {
    const response = await fetch(url, options)
    const data = response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const comprarEntrada = async ({ idUsuario, idEvento, cantidad, metodoPago, idTarjeta }) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${PATH_API}/entradas/comprar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idUsuario, idEvento, cantidad, metodoPago, idTarjeta })
  });
  if (!response.ok) {
    throw new Error('Error purchasing ticket');
  }
  const data = await response.json();
  return data;
};


export const getEntradas = async (token) => {
  const response = await fetch(`${PATH_API}/entradas`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error: ${errorMessage}`);
  }

  return await response.json();
};

export const fetchUserData = async () => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${PATH_API}/user`, { // Asegúrate de usar la URL correcta
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserData = async (userData) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage
  const response = await fetch(`${PATH_API}/user`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('No se pudo actualizar los datos del usuario.');
  }
};

export const getEventos = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const url = `${PATH_API}/getEventos?${queryString}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 

export const getEventoById = async (id) => {
  const url = `${PATH_API}/evento/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const comprobarAccesoAdmin = async () => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `${PATH_API}/admin`
    const headers = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, headers);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const recogerPeticiones = async () => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }
  try {
    const url = `${PATH_API}/peticiones`
    const headers = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, headers);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching user data: ', error);
    throw error;
  }
}

export const descargarArchivo = async (archivo) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }
  try {
    const url = `${PATH_API}/descargarArchivo`
    const headers = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(archivo)
    }
    const response = await fetch(url, headers);
    if (!response.ok) {
      throw new Error('No se pudo descargar el archivo');
    }
    const blob = await response.blob();
    const enlace = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = enlace;
    link.setAttribute('download', archivo.documento.split('/').pop());

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    return true;
  } catch (error) {
    console.log('Error fetching user data: ', error);
    throw error;
  }
}

export const permitirOrganizador = async () => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `${PATH_API}/organizador`
    const headers = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, headers);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const comprobarSolicitud = async (request) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }
  try {
    const url = `${PATH_API}/comprobarSolicitud`
    const headers = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }
    const response = await fetch(url, headers)
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }

}

export const comprobarFavorito = async (evento) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `${PATH_API}/favorito`
    const headers = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(evento)
    }
    const response = await fetch(url, headers)
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}

export const marcarFavorito = async (evento) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `${PATH_API}/marcarFavorito`
    const headers = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(evento)
    }
    const response = await fetch(url, headers)
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}

export const getMisEventos = async () => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${PATH_API}/miseventos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error: ${errorMessage}`);
  }

  return await response.json();
};

export const getMisFavoritos = async (evento) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `${PATH_API}/misFavoritos`
    const headers = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(evento)
    }
    const response = await fetch(url, headers)
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}

export const cancelarEntrada = async (id) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `${PATH_API}/cancelarEntrada/${id}`
    const headers = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, headers)
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}

export const getTarjetas = async () => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }
  try {
    const url = `${PATH_API}/tarjetas`
    const headers = {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url,headers);
    const data = await response.json();
    return data.tarjetas;
  } catch (error) {
    console.error('Error fetching tarjetas:', error);
    return [];
  }
}

export const añadirTarjeta = async (formData) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }
  const url = `${PATH_API}/tarjetas`
  const options = {
    method: "Post",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }
  try {
    const response = await fetch(url, options)
    const data = response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const editarTarjeta = async (id, formData) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage
  const url = `${PATH_API}/tarjetas/${id}`
  const options = {
    method: "Put",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }
  try {
    const response = await fetch(url, options)
    const data = response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const borrarTarjeta = async (id) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const url = `${PATH_API}/tarjetas/${id}`
    const headers = {
      method: 'Delete',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, headers)
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}

export const eliminarEvento = async (id) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `${PATH_API}/deleteEvent/${id}`
    const headers = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, headers)
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}

export const comprobarAccesoEventos = async () => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `${PATH_API}/eventos`
    const headers = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(url, headers);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const editarEvento = async (id, formData) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  const url = `${PATH_API}/updateEvent/${id}`
  const options = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  }
  try {
    const response = await fetch(url, options)
    const data = response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
