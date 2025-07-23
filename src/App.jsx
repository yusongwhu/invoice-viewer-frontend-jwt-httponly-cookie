import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import InvoiceList from './components/InvoiceList'
import Dashboard from './components/Dashboard'
import MainLayout from './layouts/MainLayout'
import Book from './components/Book'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/' element={<MainLayout />} >
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Invoice" element={<InvoiceList />} />
          <Route path="/Book" element={<Book />} />
        </Route>
      </Routes>
    </BrowserRouter>


  )
}

export default App
