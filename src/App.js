import * as React from "react";
import './App.css';
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/Invoice_list";
import ProductForm from "./components/product";
import ProductList from "./components/product_list";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InvoiceForm />} />
          <Route path='/invoice_list' element={<InvoiceList />} />
          <Route path='/product' element={<ProductForm />} />
          <Route path='/product_list' element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;