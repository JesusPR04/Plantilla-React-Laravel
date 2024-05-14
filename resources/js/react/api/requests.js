export const login = async (email, password) => {
    const url = "http://localhost/api/login";
    const options = {
        method: "Post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
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