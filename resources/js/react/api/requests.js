export const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('user-token', data.token); // Guarda el token en localStorage
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
    if (data.status) {
      return data;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCiudades = async () => {
  const url = 'http://localhost/ciudades'
  try {
    const response = await fetch(url)
    const data = response.json()
    if (data.status) {
      return data;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGenrers = async () => {
  const url = 'http://localhost/categorias'
  try {
    const response = await fetch(url)
    const data = response.json()
    if (data.status) {
      return data;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error)
  }
}

export const organizador = async (formData) => {
  const url = 'http://localhost/api/organizador'
  const options = {
    method: "Post",
    body: formData
  };

  try {
    const response = await fetch(url, options)
    const data = response.json()
    if (data.status) {
      return data;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchUserData = async () => {
  const token = localStorage.getItem('user-token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch('http://localhost/api/user', { // Asegúrate de usar la URL correcta
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

