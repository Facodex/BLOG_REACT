import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Articulo } from "../components/pages/Articulo";
import { Articulos } from "../components/pages/Articulos";
import { Busqueda } from "../components/pages/Busqueda";
import { Crear } from "../components/pages/Crear";
import { Editar } from "../components/pages/Editar";
import { Inicio } from "../components/pages/Inicio";

export const Rutas = () => {

    return (
        <BrowserRouter>
            {/* LAYOUT  */}

            <Header></Header>
            <Nav></Nav>

            {/* Contenido central  */}
            <section id="content" className="content">
                <Routes>
                    <Route path='/' element={<Inicio />}></Route>
                    <Route path='/inicio' element={<Inicio />}></Route>
                    <Route path='/articulos' element={<Articulos />}></Route>
                    <Route path='/crear-articulos' element={<Crear/>}></Route>
                    <Route path='/buscar/:busqueda' element={<Busqueda/>}></Route>
                    <Route path='/articulo/:id' element={<Articulo/>}></Route>
                    <Route path='/editar/:id' element={<Editar/>}></Route>
                    <Route path='*' element={<h1>Pagina 404 no se encuentran coincidencias</h1>}></Route>
                </Routes>
            </section>

            <Sidebar></Sidebar>
            <Footer></Footer>

        </BrowserRouter>
    )

}