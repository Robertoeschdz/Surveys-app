import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Survey from './components/Survey'
import Responses from './components/Responses'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/:id' element={<Survey />} />
      <Route path='/:id/responses' element={<Responses />} />
    </Routes>
  </BrowserRouter>
)
