import * as React from "react";
import './App.css';
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/Invoice_list";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InvoiceForm />} />
          <Route path='/invoice_list' element={<InvoiceList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;