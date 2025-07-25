import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import InvoiceList from './features/invoices/InvoiceList'
import Dashboard from './components/Dashboard'
import MainLayout from './layouts/MainLayout'
import Book from './features/books/Book'
import DepartmentTable from './features/departments/DepartmentTable';
import EmployeeList from './features/employees/EmployeeList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/' element={<MainLayout />} >
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Invoice" element={<InvoiceList />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Department" element={<DepartmentTable />} />
          <Route path="/Employees" element={<EmployeeList  />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
