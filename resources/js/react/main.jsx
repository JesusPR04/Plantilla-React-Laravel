import React from 'react'
import { RouterProvider, Outlet, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './Paginas/Index/App.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Login from './Paginas/Login/Login.jsx'
import Register from './Paginas/Register/Register.jsx'
import Peticion from './Paginas/Peticion/Peticion.jsx'
import PagError from './Paginas/Error/Error.jsx'
import Ayuda from './Paginas/Ayuda/Ayuda.jsx'
import BuscadorEventos from './Paginas/BuscadorEventos/BuscadorEventos.jsx'
import Perfil from './Paginas/Perfil/Perfil.jsx'
import Editar from './Paginas/Perfil/Editar.jsx'
import SobreNosotros from './Paginas/SobreNosotros/SobreNosotros.jsx'
import PoliticaPrivacidad from './Paginas/PoliticaPrivacidad/PoliticaPrivacidad.jsx'
import TerminosCondiciones from './Paginas/Terminos&Condiciones/TerminosCondiciones.jsx'
import Evento from './Paginas/Evento/Evento.jsx'
import Admin from './Paginas/Admin/Admin.jsx'
import Entrada from './Paginas/Entrada/Entrada.jsx'
import CrearEvento from './Paginas/Evento/CrearEvento.jsx'


function AppLayout() {
  return <>
    <Header />
    <Outlet />
    <Footer />
  </>
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PagError/>,
    children: [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/ayuda",
      element: <Ayuda />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/organizador",
      element: <Peticion />,
    },
    {
      path: "/buscadoreventos",
      element: <BuscadorEventos />,
    },
    {
      path: "/perfil",
      element: <Perfil />,
    },
    {
      path: "/editar-perfil",
      element: <Editar />,
    },
    {
      path: "/sobreNosotros",
      element: <SobreNosotros />,
    },
    {
      path: "/politicaPrivacidad",
      element: <PoliticaPrivacidad />,
    },
    {
      path: "/terminos&condiciones",
      element: <TerminosCondiciones />,
    },
    {
      path: "/evento/:id",
      element: <Evento />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/entradas",
      element: <Entrada />,
    },
    {
      path: "/crearEvento",
      element: <CrearEvento />,
    }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>,
)