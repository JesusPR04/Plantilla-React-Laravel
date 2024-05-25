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
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>,
)