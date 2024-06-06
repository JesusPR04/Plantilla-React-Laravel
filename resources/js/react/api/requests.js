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
  const url = 'http://localhost/api/register'
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
  const url = 'http://localhost/ciudades'
  try {
    const response = await fetch(url)
    const data = response.json()
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const getGenrers = async () => {
  const url = 'http://localhost/categorias'
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
  const url = 'http://localhost/api/totalOrganizers'
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
  const url = 'http://localhost/api/organizador'
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
  const url = 'http://localhost/api/storeEvent'
  const options = {
    method: "Post",
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

export const comprarEntrada = async ({ idUsuario, idEvento, cantidad, metodoPago }) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch('http://localhost/api/entradas/comprar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idUsuario, idEvento, cantidad, metodoPago })
  });
  if (!response.ok) {
    throw new Error('Error purchasing ticket');
  }
  const data = await response.json();
  return data;
};


export const getEntradas = async (token) => {
  const response = await fetch('http://localhost/api/entradas', {
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
  const response = await fetch('http://localhost/api/user', {
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
  const url = `http://localhost/api/getEventos?${queryString}`;
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
  const url = `http://localhost/api/evento/${id}`;
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
    const url = 'http://localhost/api/admin'
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
    const url = 'http://localhost/api/peticiones'
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
    const url = 'http://localhost/api/descargarArchivo'
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
    const url = 'http://localhost/api/organizador'
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
    const url = 'http://localhost/api/comprobarSolicitud'
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
    const url = 'http://localhost/api/favorito'
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
    const url = 'http://localhost/api/marcarFavorito'
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

  const response = await fetch('http://localhost/api/miseventos', {
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
    const url = 'http://localhost/api/misFavoritos'
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
    const url = `http://localhost/api/cancelarEntrada/${id}`
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
    const url = `http://localhost/api/tarjetas`
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
export const eliminarEvento = async (id) => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const url = `http://localhost/api/deleteEvent/${id}`
    const headers = {
      method: 'POST',
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
    const url = 'http://localhost/api/eventos'
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